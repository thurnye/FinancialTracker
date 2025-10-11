import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomeDashboard = lazy(() =>
  import('../pages/HomeDashboard').then((m) => ({ default: m.HomeDashboard }))
);

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeDashboard />,
  },
];
