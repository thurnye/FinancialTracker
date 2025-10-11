// routes/AppRoutes.tsx
import { useRoutes } from 'react-router-dom';
import { authRoutes } from '../../features/auth/router/auth.routes';
import PublicRoute from './wrappers/PublicRoutes';
import ProtectedRoute from './wrappers/ProtectedRoutes';
import PageNotFound from '../pages/PageNotFound';
import { homeRoutes } from '../../features/home/router/home.router';
import { userRoutes } from '../../features/user/router/user.router';
import { StatisticsRoutes } from '../../features/statistics/router/statistics.router';
import { donationsRoutes } from '../../features/donation/router/donation.router';

export default function AppRoutes() {
  const routes = useRoutes([
    ...authRoutes.map((route) => ({
      ...route,
      element: <PublicRoute>{route.element}</PublicRoute>,
    })),

    // Protected routes
    ...homeRoutes.map((route) => ({
      ...route,
      element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    })),
    ...userRoutes.map((route) => ({
      ...route,
      element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    })),
    ...donationsRoutes.map((route) => ({
      ...route,
      element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    })),
    ...StatisticsRoutes.map((route) => ({
      ...route,
      element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    })),

    { path: '*', element: <PageNotFound /> },
  ]);

  return routes;
}
