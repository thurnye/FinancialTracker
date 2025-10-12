import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Budgets = lazy(() =>
  import('../pages/Budgets').then((m) => ({ default: m.default }))
);

export const BudgetsRoutes: RouteObject[] = [
  {
    path: '/budgets',
    element: <Budgets />,
  },
];
