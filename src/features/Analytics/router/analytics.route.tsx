import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import Analytics from '../pages/Analytics';


const Overview = lazy(() => import('../components/Overview'));
const AnalyticsExpenses = lazy(() => import('../components/AnalyticsExpenses'));
const AnalyticsTransactions = lazy(() => import('../components/AnalyticsTransactions'));

export const AnalyticsRoutes: RouteObject[] = [
  {
    path: '/analytics',
    element: <Analytics />, 
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <Overview /> },
      { path: 'expenses', element: <AnalyticsExpenses /> },
      { path: 'transactions', element: <AnalyticsTransactions /> },
    ],
  },
];
