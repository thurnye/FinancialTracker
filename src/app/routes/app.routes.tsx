import { Navigate, useRoutes } from "react-router-dom";
import PublicRoute from "./wrappers/PublicRoutes";
import ProtectedRoute from "./wrappers/ProtectedRoutes";
import PageNotFound from "../pages/PageNotFound";
import Layout from "../../components/Layout/Layout";
import { authRoutes } from "../../features/auth/router/auth.routes";
import { homeRoutes } from "../../features/home/router/home.router";
import { userRoutes } from "../../features/user/router/user.router";
import { StatisticsRoutes } from "../../features/statistics/router/statistics.router";
import { donationsRoutes } from "../../features/donation/router/donation.router";
import { dashboardRoutes } from "../../features/Dashboard/router/Dashboard.router";
import { AffiliatesRoutes } from "../../features/Affliates/router/affiliates.routes";
import { AnalyticsRoutes } from "../../features/Analytics/router/analytics.route";
import { BudgetsRoutes } from "../../features/Budgets/router/Budgets.router";
import { goalsRoutes } from "../../features/Goals/router/Goals.router";
import { profileRoutes } from "../../features/Profile/router/Profile.router";
import { settingsRoutes } from "../../features/Settings/router/Settings.router";
import { supportRoutes } from "../../features/Support/router/Support.router";
import { walletRoutes } from "../../features/Wallet/router/Wallet.router";

export default function AppRoutes() {
  const routes = useRoutes([
    // 🔓 Public routes (login, register, etc.)
     ...authRoutes.map((route) => ({
      ...route,
      element: <PublicRoute>{route.element}</PublicRoute>,
    })),

    // 🔐 Protected routes under main layout
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        ...homeRoutes,
        ...userRoutes,
        ...donationsRoutes,
        ...StatisticsRoutes,
        ...dashboardRoutes,
        ...AffiliatesRoutes,
        ...AnalyticsRoutes,
        ...BudgetsRoutes,
        ...goalsRoutes,
        ...profileRoutes,
        ...settingsRoutes,
        ...supportRoutes,
        ...walletRoutes
      ],
    },

    // 404 fallback
    { path: "*", element: <PageNotFound /> },
  ]);

  return routes;
}
