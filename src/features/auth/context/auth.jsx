import { createContext, useContext, useState } from 'react';
import { authSession } from '../../../lib/storage/session';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authSession.get());

  const signIn = (nextUser) => {
    setUser(nextUser);
    authSession.set(nextUser);
  };

  const signOut = () => {
    setUser(null);
    authSession.clear();
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
