import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Statistics = lazy(() =>
  import('../pages/statistics').then((m) => ({ default: m.default }))
);

export const StatisticsRoutes: RouteObject[] = [
  {
    path: '/statistics',
    element: <Statistics />,
  },
];
