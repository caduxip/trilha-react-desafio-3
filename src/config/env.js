// Resolve e valida as variáveis de ambiente do frontend.
const DEFAULT_API_URL = 'http://127.0.0.1:8001';

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
  nodeEnv: process.env.NODE_ENV ?? 'development',
});

export { DEFAULT_API_URL, ENV_CONFIG };
