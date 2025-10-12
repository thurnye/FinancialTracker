import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Wallet = lazy(() =>
  import('../pages/Wallet').then((m) => ({ default: m.default }))
);

export const walletRoutes: RouteObject[] = [
  {
    path: '/wallets',
    element: <Wallet />,
  },
];
