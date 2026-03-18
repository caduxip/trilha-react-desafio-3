const APP_ERROR_CODES = {
  emailInUse: 'EMAIL_IN_USE',
  network: 'NETWORK_ERROR',
  requestFailed: 'REQUEST_FAILED',
  unknown: 'UNKNOWN_ERROR',
};

const createAppError = ({ cause, code, message }) => {
  const error = new Error(message);

  error.code = code;
  error.cause = cause;

  return error;
};

const normalizeRequestError = (error, fallbackMessage) => {
  if (error?.code && Object.values(APP_ERROR_CODES).includes(error.code)) {
    return error;
  }

  if (error?.response || error?.request) {
    return createAppError({
      cause: error,
      code: APP_ERROR_CODES.requestFailed,
      message: fallbackMessage,
    });
  }

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
