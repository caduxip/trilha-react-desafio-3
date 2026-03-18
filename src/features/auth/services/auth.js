// Serviço de autenticação.
// Ele concentra login/cadastro e esconde detalhes HTTP das páginas.
import { api } from '../../../services/api';
import { APP_ERROR_CODES, createAppError, normalizeRequestError } from '../../../lib/http/errors';
import { toAuthUser, toRegisterPayload } from './auth.mapper';

const USERS_RESOURCE = '/users';
const EMAIL_IN_USE = APP_ERROR_CODES.emailInUse;

const authService = {
  async login({ email, senha }) {
    try {
      // O json-server permite buscar usuários via query string.
      const { data } = await api.get(USERS_RESOURCE, {
        params: {
          email,
          senha,
        },
      });

      // Sem usuário encontrado, devolvemos `null` para a página decidir a mensagem.
      if (!data.length) {
        return null;
      }

      // Antes de devolver para a UI, normalizamos o formato do usuário.
      return toAuthUser(data[0]);
    } catch (error) {
      throw normalizeRequestError(error, 'Falha ao buscar o usuário de autenticação.');
    }
  },

  async register({ email, name, senha }) {
    try {
      // Primeiro verificamos se o e-mail já existe na base mock.
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

      // Se o e-mail estiver livre, criamos o usuário e normalizamos a resposta.
      const { data } = await api.post(USERS_RESOURCE, toRegisterPayload({ email, name, senha }));

      return toAuthUser(data);
    } catch (error) {
      throw normalizeRequestError(error, 'Falha ao registrar o usuário.');
    }
  },
};

export { authService, EMAIL_IN_USE };
