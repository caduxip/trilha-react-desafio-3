import { act, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { STORAGE_KEYS } from '../../../constants/storage';
import { ROUTER_FUTURE_FLAGS } from '../../../routes/future';
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
  // A suíte usa as mesmas future flags da aplicação para reduzir diferença
  // entre o comportamento testado e o comportamento em runtime.
  <MemoryRouter future={ROUTER_FUTURE_FLAGS}>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});

const createDeferred = () => {
  let resolve;
  let reject;

  const promise = new Promise((resolver, rejecter) => {
    resolve = resolver;
    reject = rejecter;
  });

  return { promise, reject, resolve };
};

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

test('ignora resposta antiga de cadastro quando uma tentativa mais nova falha', async () => {
  const firstRegister = createDeferred();
  const secondRegister = createDeferred();

  authService.register
    .mockReturnValueOnce(firstRegister.promise)
    .mockReturnValueOnce(secondRegister.promise);

  const { result } = renderHook(() => useRegister(), { wrapper });

  let firstPromise;
  let secondPromise;

  await act(async () => {
    firstPromise = result.current.submitRegister({
      name: 'Primeira tentativa',
      email: 'primeiro@email.com',
      senha: '123456',
    });
    secondPromise = result.current.submitRegister({
      name: 'Segunda tentativa',
      email: 'segundo@email.com',
      senha: '123456',
    });
  });

  await act(async () => {
    const duplicatedEmailError = new Error('EMAIL_IN_USE');

    duplicatedEmailError.code = 'EMAIL_IN_USE';
    secondRegister.reject(duplicatedEmailError);
    await secondPromise;
  });

  await act(async () => {
    firstRegister.resolve({
      id: 8,
      name: 'Primeira tentativa',
      email: 'primeiro@email.com',
      avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
      percentual: 0,
    });
    await firstPromise;
  });

  expect(result.current.apiError).toBe('Este e-mail já está em uso.');
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).toBeNull();
});
