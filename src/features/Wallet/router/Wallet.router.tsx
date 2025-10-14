import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Wallet = lazy(() =>
  import('../pages/Wallet').then((m) => ({ default: m.default }))
);
const WalletOverview = lazy(() =>
  import('../pages/WalletOverview').then((m) => ({ default: m.default }))
);
const AddEditWallet = lazy(() =>
  import('../components/AddEditWallet').then((m) => ({ default: m.default }))
);

export const walletRoutes: RouteObject[] = [
  {
    path: '/wallets',
    element: <Wallet />,
    children: [
      { index: true, element: <Navigate to='overview' replace /> },
      { path: 'overview', element: <WalletOverview /> },
      { path: 'add-wallet', element: <AddEditWallet isEdit={false} /> },
      { path: 'edit-wallet', element: <AddEditWallet isEdit={true} /> },
    ],
  },
];
