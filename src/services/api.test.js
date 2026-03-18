// O teste do cliente HTTP precisa mockar o axios.
// Assim validamos apenas nossa configuração de interceptors, sem depender
// do formato interno do pacote ou do entry ESM que o Jest do CRA não transpila.
jest.mock('axios', () => {
  const requestHandlers = [];
  const responseHandlers = [];

  return {
    create: jest.fn(() => ({
      interceptors: {
        request: {
          handlers: requestHandlers,
          use: jest.fn((fulfilled, rejected) => {
            requestHandlers.push({ fulfilled, rejected });
          }),
        },
        response: {
          handlers: responseHandlers,
          use: jest.fn((fulfilled, rejected) => {
            responseHandlers.push({ fulfilled, rejected });
          }),
        },
      },
    })),
  };
});

jest.mock('../lib/observability/logger', () => ({
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('api interceptors', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('logs request start and stores request metadata', async () => {
    const { api } = require('./api');
    const { logger } = require('../lib/observability/logger');

    const requestConfig = await api.interceptors.request.handlers[0].fulfilled({
      method: 'get',
      url: '/users',
    });

    expect(requestConfig.metadata.requestId).toMatch(/^req-/);
    expect(logger.debug).toHaveBeenCalledWith(
      'HTTP request started.',
      expect.objectContaining({
        method: 'GET',
        url: '/users',
      }),
    );
  });

  test('logs response completion with duration and status', async () => {
    const { api } = require('./api');
    const { logger } = require('../lib/observability/logger');

    await api.interceptors.response.handlers[0].fulfilled({
      status: 200,
      config: {
        method: 'get',
        url: '/users',
        metadata: {
          requestId: 'req-1',
          startedAt: Date.now() - 10,
        },
      },
    });

    expect(logger.debug).toHaveBeenCalledWith(
      'HTTP request finished.',
      expect.objectContaining({
        requestId: 'req-1',
        status: 200,
        url: '/users',
      }),
    );
  });

  test('logs failed responses and rethrows the original error', async () => {
    const { api } = require('./api');
    const { logger } = require('../lib/observability/logger');

    const requestError = {
      config: {
        method: 'get',
        url: '/users',
        metadata: {
          requestId: 'req-1',
          startedAt: Date.now() - 10,
        },
      },
      response: {
        status: 500,
      },
    };

    await expect(api.interceptors.response.handlers[0].rejected(requestError)).rejects.toBe(
      requestError,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'HTTP request failed.',
      expect.objectContaining({
        requestId: 'req-1',
        status: 500,
        url: '/users',
      }),
    );
  });
});
