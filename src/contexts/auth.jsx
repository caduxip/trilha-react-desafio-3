import { createContext, useContext, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storage';

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser = localStorage.getItem(STORAGE_KEYS.authUser);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.authUser);
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const signIn = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(nextUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.authUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
