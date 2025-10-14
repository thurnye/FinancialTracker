import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Budgets = lazy(() =>
  import('../pages/Budgets').then((m) => ({ default: m.default }))
);
const BudgetOverview = lazy(() =>
  import('../pages/BudgetOverview').then((m) => ({ default: m.default }))
);
const AddEditBudget = lazy(() =>
  import('../components/AddEditBudget').then((m) => ({ default: m.default }))
);

export const BudgetsRoutes: RouteObject[] = [
  {
    path: '/budgets',
    element: <Budgets />,
    children: [
      { index: true, element: <Navigate to='overview' replace /> },
      { path: 'overview', element: <BudgetOverview /> },
      { path: 'add-budget', element: <AddEditBudget /> },
      { path: 'edit-budget/:id', element: <AddEditBudget /> },
    ],
  },
];
