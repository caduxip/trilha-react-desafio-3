jest.mock('./monitor', () => ({
  monitoring: {
    captureError: jest.fn(),
    captureMessage: jest.fn(),
    initMonitoring: jest.fn(),
  },
}));

const ORIGINAL_ENV = process.env;

describe('logger', () => {
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('logs info messages when the configured level allows it', () => {
    process.env = {
      ...ORIGINAL_ENV,
      NODE_ENV: 'development',
      REACT_APP_LOG_LEVEL: 'info',
    };

    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const { logger } = require('./logger');

    logger.info('Mensagem observavel', { feature: 'feed' });

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith(
      'Mensagem observavel',
      expect.objectContaining({
        metadata: {
          feature: 'feed',
        },
      }),
    );
  });

  test('does not log info messages when the level is warn', () => {
    process.env = {
      ...ORIGINAL_ENV,
      NODE_ENV: 'production',
      REACT_APP_LOG_LEVEL: 'warn',
    };

    const infoConsoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const { logger } = require('./logger');

    logger.info('Nao deve aparecer');

    expect(infoConsoleSpy).not.toHaveBeenCalled();
  });

  test('forwards runtime errors to the external monitoring adapter', () => {
    process.env = {
      ...ORIGINAL_ENV,
      NODE_ENV: 'production',
      REACT_APP_ENABLE_SENTRY: 'true',
      REACT_APP_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
      REACT_APP_LOG_LEVEL: 'error',
    };

    const { monitoring } = require('./monitor');
    const { logger } = require('./logger');
    const runtimeError = new Error('Falha observavel');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    logger.reportRuntimeError(runtimeError, { source: 'AppErrorBoundary' });

    expect(monitoring.captureError).toHaveBeenCalledWith(
      runtimeError,
      expect.objectContaining({
        source: 'AppErrorBoundary',
      }),
    );

    consoleErrorSpy.mockRestore();
  });
});
