import { act, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { STORAGE_KEYS } from '../../../constants/storage';
import { AuthProvider } from '../context/auth';
import { authService } from '../services/auth';
import { useLogin } from './useLogin';

const mockNavigate = jest.fn();

jest.mock('../services/auth', () => ({
  authService: {
    login: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const wrapper = ({ children }) => (
  // O hook precisa do router para navegar e do provider para persistir sessão.
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});

test('persiste a sessao e navega para o feed ao logar com sucesso', async () => {
  authService.login.mockResolvedValue({
    id: 1,
    name: 'Pablo Henrique',
    email: 'pablo@email.com',
    avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
    percentual: 92,
  });

  const { result } = renderHook(() => useLogin(), { wrapper });

  await act(async () => {
    await result.current.submitLogin({
      email: 'pablo@email.com',
      senha: '123456',
    });
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/feed', { replace: true });
  });
  expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).not.toBeNull();
  expect(result.current.apiError).toBe('');
});

test('expõe mensagem amigável quando as credenciais sao invalidas', async () => {
  authService.login.mockResolvedValue(null);

  const { result } = renderHook(() => useLogin(), { wrapper });

  await act(async () => {
    await result.current.submitLogin({
      email: 'invalido@email.com',
      senha: '123456',
    });
  });

  await waitFor(() => {
    expect(result.current.apiError).toBe('Usuário ou senha inválidos.');
  });
  expect(mockNavigate).not.toHaveBeenCalled();
});
