jest.mock('@sentry/react', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  init: jest.fn(),
}));

const ORIGINAL_ENV = process.env;

describe('monitoring', () => {
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('initializes Sentry when monitoring is enabled and dsn is configured', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_ENABLE_SENTRY: 'true',
      REACT_APP_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
      REACT_APP_SENTRY_ENVIRONMENT: 'staging',
    };

    const { init } = require('@sentry/react');
    const { monitoring } = require('./monitor');

    monitoring.initMonitoring();

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://public@example.ingest.sentry.io/1',
        enabled: true,
        environment: 'staging',
      }),
    );
  });

  test('captures runtime exceptions when monitoring is enabled', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_ENABLE_SENTRY: 'true',
      REACT_APP_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
    };

    const { captureException } = require('@sentry/react');
    const { monitoring } = require('./monitor');
    const runtimeError = new Error('Erro de runtime');

    monitoring.captureError(runtimeError, { feature: 'feed' });

    expect(captureException).toHaveBeenCalledWith(
      runtimeError,
      expect.objectContaining({
        extra: { feature: 'feed' },
      }),
    );
  });

  test('does not capture messages when monitoring is disabled', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_ENABLE_SENTRY: 'false',
      REACT_APP_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
    };

    const { captureMessage } = require('@sentry/react');
    const { monitoring } = require('./monitor');

    monitoring.captureMessage('Mensagem ignorada');

    expect(captureMessage).not.toHaveBeenCalled();
  });
});
