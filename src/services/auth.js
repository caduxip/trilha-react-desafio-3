import { api } from './api';

const USERS_RESOURCE = '/users';
const EMAIL_IN_USE = 'EMAIL_IN_USE';
const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/45184516?v=4';

const sanitizeUser = ({ senha, ...user }) => user;

const authService = {
  async login({ email, senha }) {
    const { data } = await api.get(USERS_RESOURCE, {
      params: {
        email,
        senha,
      },
    });

    if (!data.length) {
      return null;
    }

    return sanitizeUser(data[0]);
  },

  async register({ email, name, senha }) {
    const { data: existingUsers } = await api.get(USERS_RESOURCE, {
      params: {
        email,
      },
    });

    if (existingUsers.length) {
      const error = new Error(EMAIL_IN_USE);
      error.code = EMAIL_IN_USE;
      throw error;
    }

    const { data } = await api.post(USERS_RESOURCE, {
      email,
      name,
      avatar: DEFAULT_AVATAR,
      percentual: 0,
      senha,
    });

    return sanitizeUser(data);
  },
};

export { authService, EMAIL_IN_USE };
