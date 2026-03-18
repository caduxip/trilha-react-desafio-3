// Guardas de rota separam páginas públicas e privadas.
import { Navigate } from 'react-router-dom';

import { useAuth } from '../features/auth';
import { ROUTES } from './paths';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // A guarda privada deixa a regra de acesso concentrada em um único lugar.
  // Assim, cada página não precisa repetir a verificação de sessão.
  // Usuário sem sessão válida volta para login.
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // A guarda pública evita que quem já entrou volte manualmente para login/cadastro.
  // Isso simplifica a experiência e reduz estados estranhos na navegação.
  if (isAuthenticated) {
    return <Navigate to={ROUTES.feed} replace />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute };
