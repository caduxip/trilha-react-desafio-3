// Guardas de rota separam páginas públicas e privadas.
import { Navigate } from 'react-router-dom';

import { useAuth } from '../features/auth';
import { ROUTES } from './paths';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Usuário sem sessão válida volta para login.
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Usuário autenticado não precisa ver login/cadastro novamente.
  if (isAuthenticated) {
    return <Navigate to={ROUTES.feed} replace />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute };
