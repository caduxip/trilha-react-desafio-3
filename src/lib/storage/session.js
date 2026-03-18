// Encapsula a leitura e escrita da sessão autenticada no localStorage.
import { STORAGE_KEYS } from '../../constants/storage';

const getStorage = () => {
  // Em ambientes sem `window`, apenas evita acessar o navegador diretamente.
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

const authSession = {
  get() {
    const storage = getStorage();

    if (!storage) {
      return null;
    }

    const storedUser = storage.getItem(STORAGE_KEYS.authUser);

    if (!storedUser) {
      return null;
    }

    // Se o JSON estiver inválido, limpamos o valor persistido para não travar o app.
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      storage.removeItem(STORAGE_KEYS.authUser);
      return null;
    }
  },

  set(user) {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  },

  clear() {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.removeItem(STORAGE_KEYS.authUser);
  },
};

export { authSession };
