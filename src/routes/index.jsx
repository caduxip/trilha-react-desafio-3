// Carregamento lazy das páginas para reduzir o bundle inicial.
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader } from '../components/PageLoader';
import { ProtectedRoute, PublicRoute } from './guards';
import { ROUTES } from './paths';

const Home = lazy(() =>
  import('../pages/home').then((module) => ({
    default: module.Home,
  })),
);

const UiCatalog = lazy(() =>
  import('../pages/ui-catalog').then((module) => ({
    default: module.UiCatalog,
  })),
);

const Login = lazy(() =>
  import('../features/auth/pages/login').then((module) => ({
    default: module.Login,
  })),
);

const Register = lazy(() =>
  import('../features/auth/pages/register').then((module) => ({
    default: module.Register,
  })),
);

const Feed = lazy(() =>
  import('../features/feed/pages/feed').then((module) => ({
    default: module.Feed,
  })),
);

const AppRoutes = () => {
  return (
    // Enquanto um chunk lazy carrega, mostramos um fallback simples.
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        {/* O catálogo é público porque serve como vitrine interna da UI base. */}
        <Route path={ROUTES.uiCatalog} element={<UiCatalog />} />
        {/* Login e cadastro usam guarda pública: quem já tem sessão volta para o feed. */}
        <Route
          path={ROUTES.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.register}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* Feed usa guarda privada: acesso só com sessão restaurada no AuthContext. */}
        <Route
          path={ROUTES.feed}
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        {/* Qualquer rota inválida volta para a home. */}
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </Suspense>
  );
};

export { AppRoutes };
