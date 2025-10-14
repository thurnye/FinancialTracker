import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import Settings from '../pages/Settings';


const Profile = lazy(() => import('../pages/SettingsProfile'));
const AddBankAccount = lazy(() => import('../pages/AddBankAccount'));
const Category = lazy(() => import('../pages/SettingsCategory'));

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <Settings />, 
    children: [
      { index: true, element: <Navigate to="profile" replace /> },
      { path: 'profile', element: <Profile /> },
      { path: 'bank-account', element: <AddBankAccount /> },
      { path: 'category', element: <Category /> },
    ],
  },
];
