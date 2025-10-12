import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Goals = lazy(() =>
  import('../pages/Goals').then((m) => ({ default: m.default }))
);

export const goalsRoutes: RouteObject[] = [
  {
    path: '/goals',
    element: <Goals />,
  },
];
