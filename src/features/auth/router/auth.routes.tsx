import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginScreen = lazy(() => import("../pages/LoginScreen").then(m => ({ default: m.LoginScreen })));
const RegisterScreen = lazy(() => import("../pages/RegisterScreen").then(m => ({ default: m.RegisterScreen })));
const ForgotPassword = lazy(() => import("../pages/ForgottenPassword").then(m => ({ default: m.ForgotPassword })));

export const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];
