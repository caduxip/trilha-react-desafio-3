// Garante que a resolução de ambiente do frontend seja previsível.
const ORIGINAL_ENV = process.env;

describe('ENV_CONFIG', () => {
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.resetModules();
  });

  test('uses the default API URL when REACT_APP_API_URL is not defined', () => {
    process.env = {
      ...ORIGINAL_ENV,
    };
    delete process.env.REACT_APP_API_URL;

    const { ENV_CONFIG, DEFAULT_API_URL } = require('./env');

    expect(ENV_CONFIG.apiUrl).toBe(DEFAULT_API_URL);
  });

  test('normalizes the configured API URL', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_API_URL: 'http://127.0.0.1:8001/',
    };

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.apiUrl).toBe('http://127.0.0.1:8001');
  });

  test('throws when REACT_APP_API_URL is not a valid absolute URL', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_API_URL: 'api-invalida',
    };

    expect(() => require('./env')).toThrow('REACT_APP_API_URL deve ser uma URL absoluta válida.');
  });

  test('uses false as the default for web vitals flag', () => {
    process.env = {
      ...ORIGINAL_ENV,
    };
    delete process.env.REACT_APP_ENABLE_WEB_VITALS;

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.enableWebVitals).toBe(false);
  });

  test('normalizes and validates the configured log level', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_LOG_LEVEL: 'INFO',
    };

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.logLevel).toBe('info');
  });

  test('uses false as the default for sentry flag', () => {
    process.env = {
      ...ORIGINAL_ENV,
    };
    delete process.env.REACT_APP_ENABLE_SENTRY;

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.enableSentry).toBe(false);
  });

  test('normalizes the configured sentry dsn', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_SENTRY_DSN: 'https://public@example.ingest.sentry.io/1',
    };

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.sentryDsn).toBe('https://public@example.ingest.sentry.io/1');
  });

  test('throws when REACT_APP_SENTRY_DSN is not a valid absolute URL', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_SENTRY_DSN: 'dsn-invalida',
    };

    expect(() => require('./env')).toThrow(
      'REACT_APP_SENTRY_DSN deve ser uma URL absoluta válida.',
    );
  });

  test('throws when REACT_APP_LOG_LEVEL is invalid', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_LOG_LEVEL: 'verbose',
    };

    expect(() => require('./env')).toThrow(
      'REACT_APP_LOG_LEVEL deve ser um destes valores: debug, info, warn, error, silent.',
    );
  });
});
