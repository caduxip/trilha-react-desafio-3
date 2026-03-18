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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
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
        <Route
          path={ROUTES.feed}
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </Suspense>
  );
};

export { AppRoutes };
