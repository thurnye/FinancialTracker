import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';


const Donations = lazy(() => import('../pages/Donations'));
const DonationsList = lazy(() => import('../pages/DonationList'));
const DonationDetail = lazy(() => import('../pages/DonationDetail'));

export const donationsRoutes: RouteObject[] = [
  {
    path: '/donations',
    element: <Donations />, 
    children: [
      { index: true, element: <DonationsList /> },
      { path: 'donationDetail', element: <DonationDetail /> },
    ],
  },
];
