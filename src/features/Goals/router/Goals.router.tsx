import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Goals = lazy(() =>
  import('../pages/Goals').then((m) => ({ default: m.default }))
);
const GoalsOverview = lazy(() =>
  import('../pages/GoalsOverview').then((m) => ({ default: m.default }))
);
const AddEditGoal = lazy(() =>
  import('../components/AddEditGoal').then((m) => ({ default: m.default }))
);

export const goalsRoutes: RouteObject[] = [
  {
    path: '/goals',
    element: <Goals />,
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <GoalsOverview /> },
      { path: 'add-goal', element: <AddEditGoal /> },
      { path: 'edit-goal/:id', element: <AddEditGoal /> },
    ]
  },
];
