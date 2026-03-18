// Infraestrutura de erro compartilhada pela camada de serviços.
const APP_ERROR_CODES = {
  emailInUse: 'EMAIL_IN_USE',
  network: 'NETWORK_ERROR',
  requestFailed: 'REQUEST_FAILED',
  unknown: 'UNKNOWN_ERROR',
};

const createAppError = ({ cause, code, message }) => {
  const error = new Error(message);

  // O código estável permite que a UI trate o erro sem depender do texto.
  error.code = code;
  error.cause = cause;

  return error;
};

const normalizeRequestError = (error, fallbackMessage) => {
  // Se já for um erro de domínio, devolvemos sem alterar.
  if (error?.code && Object.values(APP_ERROR_CODES).includes(error.code)) {
    return error;
  }

  // Axios costuma preencher `request` ou `response` quando a falha veio da camada HTTP.
  if (error?.response || error?.request) {
    return createAppError({
      cause: error,
      code: APP_ERROR_CODES.requestFailed,
      message: fallbackMessage,
    });
  }

  // Último fallback para qualquer erro não previsto.
  return createAppError({
    cause: error,
    code: APP_ERROR_CODES.unknown,
    message: fallbackMessage,
  });
};

export {
  APP_ERROR_CODES,
  createAppError,
  normalizeRequestError,
};
