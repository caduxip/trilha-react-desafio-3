const DEFAULT_API_URL = 'http://localhost:8001';

const resolveApiUrl = () => {
  const customApiUrl = process.env.REACT_APP_API_URL?.trim();

  if (!customApiUrl) {
    return DEFAULT_API_URL;
  }

  try {
    return new URL(customApiUrl).toString().replace(/\/$/, '');
  } catch (error) {
    throw new Error('REACT_APP_API_URL deve ser uma URL absoluta válida.');
  }
};

const ENV_CONFIG = Object.freeze({
  apiUrl: resolveApiUrl(),
  nodeEnv: process.env.NODE_ENV ?? 'development',
});

export { DEFAULT_API_URL, ENV_CONFIG };
