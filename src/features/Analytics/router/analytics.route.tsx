import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Analytics = lazy(() =>
  import('../pages/Analytics').then((m) => ({ default: m.default }))
);

export const AnalyticsRoutes: RouteObject[] = [
  {
    path: '/analytics',
    element: <Analytics />,
  },
];
