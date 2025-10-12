import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// ✅ Lazy load all three pages
const Donations = lazy(() => import('../pages/Donations'));
const DonationsList = lazy(() => import('../pages/DonationList'));
const DonationDetail = lazy(() => import('../pages/DonationDetail'));

export const donationsRoutes: RouteObject[] = [
  {
    path: '/donations',
    element: <Donations />, // parent layout containing <Outlet />
    children: [
      { index: true, element: <DonationsList /> },
      { path: 'donationDetail', element: <DonationDetail /> },
    ],
  },
];
