import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Donations = lazy(() =>
  import('../pages/DonationList').then((m) => ({ default: m.default }))
);

export const donationsRoutes: RouteObject[] = [
  {
    path: '/donations',
    element: <Donations />,
  },
];
