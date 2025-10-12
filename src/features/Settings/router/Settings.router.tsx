import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Settings = lazy(() =>
  import('../pages/Settings').then((m) => ({ default: m.default }))
);

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <Settings />,
  },
];
