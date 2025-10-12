import { RouteObject } from "react-router-dom";
import { lazy } from "react";


const UserProfilePage = lazy(() => import("../pages/UserProfilePage").then(m => ({ default: m.UserProfilePage })));



export const userRoutes: RouteObject[] = [
  { path: "/my-account", element: <UserProfilePage /> },
  { path: "/profile/:userId", element: <UserProfilePage /> },
];
