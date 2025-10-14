import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Dashboard = lazy(() =>
  import('../pages/Dashboard').then((m) => ({ default: m.default }))
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];
