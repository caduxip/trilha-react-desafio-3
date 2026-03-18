// Contexto responsável por expor a sessão autenticada para o restante da aplicação.
import { createContext, useContext, useState } from 'react';
import { authSession } from '../../../lib/storage/session';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Ao iniciar, tentamos restaurar o usuário salvo no navegador.
  // Enquanto o backend segue mockado, esta é a fonte prática da sessão do app.
  const [user, setUser] = useState(() => authSession.get());

  const signIn = (nextUser) => {
    // Atualiza o estado em memória e persiste a sessão local.
    setUser(nextUser);
    authSession.set(nextUser);
  };

  const signOut = () => {
    // Remove a sessão do estado e do localStorage.
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

  // Garante que o hook só seja usado dentro do provider.
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
