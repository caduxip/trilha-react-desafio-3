// Resolve e valida as variáveis de ambiente do frontend.
const DEFAULT_API_URL = 'http://127.0.0.1:8001';
const LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'silent'];

const resolveBooleanFlag = (value, defaultValue = false) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  throw new Error('Flags booleanas do frontend devem usar apenas "true" ou "false".');
};

const resolveLogLevel = () => {
  const customLogLevel = process.env.REACT_APP_LOG_LEVEL?.trim().toLowerCase();

  if (!customLogLevel) {
    if (process.env.NODE_ENV === 'production') {
      return 'warn';
    }

    // Em teste preferimos silêncio por padrão para não poluir a saída do Jest.
    if (process.env.NODE_ENV === 'test') {
      return 'silent';
    }

    return 'debug';
  }

  if (!LOG_LEVELS.includes(customLogLevel)) {
    throw new Error(`REACT_APP_LOG_LEVEL deve ser um destes valores: ${LOG_LEVELS.join(', ')}.`);
  }

  return customLogLevel;
};

const resolveApiUrl = () => {
  const customApiUrl = process.env.REACT_APP_API_URL?.trim();

  // Sem valor customizado, usamos a API mock local.
  // Isso deixa o setup local simples, mas ainda permite apontar para outros ambientes.
  if (!customApiUrl) {
    return DEFAULT_API_URL;
  }

  try {
    // `URL` valida se a string é uma URL absoluta e bem formada.
    return new URL(customApiUrl).toString().replace(/\/$/, '');
  } catch (error) {
    throw new Error('REACT_APP_API_URL deve ser uma URL absoluta válida.');
  }
};

// Objeto congelado para evitar mutações acidentais em runtime.
const ENV_CONFIG = Object.freeze({
  apiUrl: resolveApiUrl(),
  enableWebVitals: resolveBooleanFlag(process.env.REACT_APP_ENABLE_WEB_VITALS, false),
  logLevel: resolveLogLevel(),
  nodeEnv: process.env.NODE_ENV ?? 'development',
});

export { DEFAULT_API_URL, ENV_CONFIG, LOG_LEVELS };
