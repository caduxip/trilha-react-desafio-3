import { act, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { STORAGE_KEYS } from '../../../constants/storage';
import { AuthProvider } from '../context/auth';
import { authService } from '../services/auth';
import { useRegister } from './useRegister';

const mockNavigate = jest.fn();

jest.mock('../services/auth', () => ({
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  authService: {
    register: jest.fn(),
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
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});

test('entra automaticamente na sessao ao cadastrar com sucesso', async () => {
  authService.register.mockResolvedValue({
    id: 8,
    name: 'Novo Usuario',
    email: 'novo@email.com',
    avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
    percentual: 0,
  });

  const { result } = renderHook(() => useRegister(), { wrapper });

  await act(async () => {
    await result.current.submitRegister({
      name: 'Novo Usuario',
      email: 'novo@email.com',
      senha: '123456',
    });
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/feed', { replace: true });
  });
  expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).not.toBeNull();
});

test('expõe erro específico quando o email ja esta em uso', async () => {
  const duplicatedEmailError = new Error('EMAIL_IN_USE');
  duplicatedEmailError.code = 'EMAIL_IN_USE';
  authService.register.mockRejectedValue(duplicatedEmailError);

  const { result } = renderHook(() => useRegister(), { wrapper });

  await act(async () => {
    await result.current.submitRegister({
      name: 'Novo Usuario',
      email: 'novo@email.com',
      senha: '123456',
    });
  });

  await waitFor(() => {
    expect(result.current.apiError).toBe('Este e-mail já está em uso.');
  });
  expect(mockNavigate).not.toHaveBeenCalled();
});
