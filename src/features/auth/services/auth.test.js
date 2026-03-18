// Testa o contrato do serviço de autenticação sem depender da UI.
import { APP_ERROR_CODES } from '../../../lib/http/errors';
import { api } from '../../../services/api';
import { authService, EMAIL_IN_USE } from './auth';

jest.mock('../../../services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedApi = api;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('normalizes the authenticated user returned by the API', async () => {
    mockedApi.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Pablo Henrique',
          email: 'pablo@email.com',
          senha: '123456',
        },
      ],
    });

    await expect(authService.login({ email: 'pablo@email.com', senha: '123456' })).resolves.toEqual({
      id: 1,
      name: 'Pablo Henrique',
      email: 'pablo@email.com',
      avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
      percentual: 0,
    });
  });

  test('throws a domain error when the e-mail is already in use', async () => {
    mockedApi.get.mockResolvedValue({
      data: [{ id: 1, email: 'pablo@email.com' }],
    });

    await expect(
      authService.register({
        email: 'pablo@email.com',
        name: 'Pablo Henrique',
        senha: '123456',
      }),
    ).rejects.toMatchObject({
      code: EMAIL_IN_USE,
    });
  });

  test('normalizes transport failures during login', async () => {
    mockedApi.get.mockRejectedValue({
      request: {},
    });

    await expect(authService.login({ email: 'pablo@email.com', senha: '123456' })).rejects.toMatchObject({
      code: APP_ERROR_CODES.requestFailed,
      message: 'Falha ao buscar o usuário de autenticação.',
    });
  });
});
