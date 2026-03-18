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
      REACT_APP_API_URL: 'http://localhost:8001/',
    };

    const { ENV_CONFIG } = require('./env');

    expect(ENV_CONFIG.apiUrl).toBe('http://localhost:8001');
  });

  test('throws when REACT_APP_API_URL is not a valid absolute URL', () => {
    process.env = {
      ...ORIGINAL_ENV,
      REACT_APP_API_URL: 'api-invalida',
    };

    expect(() => require('./env')).toThrow('REACT_APP_API_URL deve ser uma URL absoluta válida.');
  });
});
