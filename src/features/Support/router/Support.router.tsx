import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Support = lazy(() =>
  import('../pages/Support').then((m) => ({ default: m.default }))
);

export const supportRoutes: RouteObject[] = [
  {
    path: '/support',
    element: <Support />,
  },
];
