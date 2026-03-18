// Infraestrutura de erro compartilhada pela camada de serviços.
const APP_ERROR_CODES = {
  emailInUse: 'EMAIL_IN_USE',
  httpTimeout: 'HTTP_TIMEOUT',
  network: 'NETWORK_ERROR',
  requestFailed: 'REQUEST_FAILED',
  unknown: 'UNKNOWN_ERROR',
};

const createAppError = ({ cause, code, message, metadata = {} }) => {
  const error = new Error(message);

  // O código estável permite que a UI trate o erro sem depender do texto.
  error.code = code;
  error.cause = cause;
  error.metadata = metadata;

  return error;
};

const isAppError = (error) =>
  Boolean(error?.code) && Object.values(APP_ERROR_CODES).includes(error.code);

const extractRequestErrorContext = (error) => ({
  method: error?.config?.method?.toUpperCase(),
  status: error?.response?.status,
  url: error?.config?.url,
});

const normalizeRequestError = (error, fallbackMessage) => {
  // Se já for um erro de domínio, devolvemos sem alterar.
  if (isAppError(error)) {
    return error;
  }

  if (error?.code === 'ECONNABORTED') {
    return createAppError({
      cause: error,
      code: APP_ERROR_CODES.httpTimeout,
      message: fallbackMessage,
      metadata: extractRequestErrorContext(error),
    });
  }

  if (error?.request && !error?.response) {
    return createAppError({
      cause: error,
      code: APP_ERROR_CODES.network,
      message: fallbackMessage,
      metadata: extractRequestErrorContext(error),
    });
  }

  // Axios costuma preencher `request` ou `response` quando a falha veio da camada HTTP.
  if (error?.response || error?.request) {
    return createAppError({
      cause: error,
      code: APP_ERROR_CODES.requestFailed,
      message: fallbackMessage,
      metadata: extractRequestErrorContext(error),
    });
  }

  // Último fallback para qualquer erro não previsto.
  return createAppError({
    cause: error,
    code: APP_ERROR_CODES.unknown,
    message: fallbackMessage,
    metadata: extractRequestErrorContext(error),
  });
};

export {
  APP_ERROR_CODES,
  createAppError,
  extractRequestErrorContext,
  isAppError,
  normalizeRequestError,
};
