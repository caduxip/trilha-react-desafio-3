// Garante que a sessão local seja persistida e lida com segurança.
import { STORAGE_KEYS } from '../../constants/storage';
import { authSession } from './session';

const createUser = () => ({
  id: 1,
  name: 'Pablo Henrique',
  email: 'pablo@email.com',
});

describe('authSession', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('persists and restores the authenticated user', () => {
    const user = createUser();

    authSession.set(user);

    expect(authSession.get()).toEqual(user);
  });

  test('clears invalid persisted session data', () => {
    window.localStorage.setItem(STORAGE_KEYS.authUser, '{invalid-json');

    expect(authSession.get()).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).toBeNull();
  });

  test('removes the stored session on clear', () => {
    authSession.set(createUser());

    authSession.clear();

    expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).toBeNull();
  });
});
