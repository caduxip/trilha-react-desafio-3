import { STORAGE_KEYS } from '../../constants/storage';

const getStorage = () => {
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
