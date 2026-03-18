import { api } from '../../../services/api';
import { APP_ERROR_CODES, createAppError, normalizeRequestError } from '../../../lib/http/errors';
import { toAuthUser, toRegisterPayload } from './auth.mapper';

const USERS_RESOURCE = '/users';
const EMAIL_IN_USE = APP_ERROR_CODES.emailInUse;

const authService = {
  async login({ email, senha }) {
    try {
      const { data } = await api.get(USERS_RESOURCE, {
        params: {
          email,
          senha,
        },
      });

      if (!data.length) {
        return null;
      }

      return toAuthUser(data[0]);
    } catch (error) {
      throw normalizeRequestError(error, 'Falha ao buscar o usuário de autenticação.');
    }
  },

  async register({ email, name, senha }) {
    try {
      const { data: existingUsers } = await api.get(USERS_RESOURCE, {
        params: {
          email,
        },
      });

      if (existingUsers.length) {
        throw createAppError({
          code: EMAIL_IN_USE,
          message: EMAIL_IN_USE,
        });
      }

      const { data } = await api.post(USERS_RESOURCE, toRegisterPayload({ email, name, senha }));

      return toAuthUser(data);
    } catch (error) {
      throw normalizeRequestError(error, 'Falha ao registrar o usuário.');
    }
  },
};

export { authService, EMAIL_IN_USE };
