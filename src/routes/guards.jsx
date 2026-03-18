import { Navigate } from 'react-router-dom';

import { useAuth } from '../features/auth';
import { ROUTES } from './paths';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.feed} replace />;
  }

  return children;
};

export { ProtectedRoute, PublicRoute };
