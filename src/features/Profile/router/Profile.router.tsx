import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Profile = lazy(() =>
  import('../pages/Profile').then((m) => ({ default: m.default }))
);

export const profileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <Profile />,
  },
];
