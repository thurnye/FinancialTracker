import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Affiliates = lazy(() =>
  import('../pages/Affiliates').then((m) => ({ default: m.default }))
);

export const AffiliatesRoutes: RouteObject[] = [
  {
    path: '/affiliates',
    element: <Affiliates />,
  },
];
