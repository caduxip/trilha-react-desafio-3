import {
  APP_ERROR_CODES,
  createAppError,
  extractRequestErrorContext,
  isAppError,
  normalizeRequestError,
} from './errors';

test('keeps domain errors unchanged', () => {
  const appError = createAppError({
    code: APP_ERROR_CODES.emailInUse,
    message: 'EMAIL_IN_USE',
  });

  expect(normalizeRequestError(appError, 'fallback')).toBe(appError);
});

test('maps timeout errors to the dedicated timeout code', () => {
  const timeoutError = {
    code: 'ECONNABORTED',
    config: {
      method: 'get',
      url: '/users',
    },
  };

  const normalizedError = normalizeRequestError(timeoutError, 'Tempo esgotado');

  expect(normalizedError.code).toBe(APP_ERROR_CODES.httpTimeout);
  expect(normalizedError.metadata).toEqual({
    method: 'GET',
    status: undefined,
    url: '/users',
  });
});

test('maps network-only failures to the network code', () => {
  const networkError = {
    request: {},
    config: {
      method: 'post',
      url: '/users',
    },
  };

  const normalizedError = normalizeRequestError(networkError, 'Sem rede');

  expect(normalizedError.code).toBe(APP_ERROR_CODES.network);
});

test('extracts request context from axios-like errors', () => {
  expect(
    extractRequestErrorContext({
      config: {
        method: 'get',
        url: '/posts',
      },
      response: {
        status: 500,
      },
    }),
  ).toEqual({
    method: 'GET',
    status: 500,
    url: '/posts',
  });
});

test('identifies domain errors by stable code', () => {
  expect(
    isAppError({
      code: APP_ERROR_CODES.requestFailed,
    }),
  ).toBe(true);
});
