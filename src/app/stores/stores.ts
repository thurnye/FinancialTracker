import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/redux/slice/auth.slice';
import donationsReducer from '../../features/donation/redux/donation.slice'
import statisticsReducer from '../../features/statistics/redux/statistics.slice';
import walletReducer from '../../features/Wallet/redux/wallet.slice';
import budgetsReducer from '../../features/Budgets/redux/budgets.slice';
import goalsReducer from '../../features/Goals/redux/goals.slice';
import analyticsReducer from '../../features/Analytics/redux/analytics.slice';
import dashboardReducer from '../../features/Dashboard/redux/dashboard.slice';
import settingsReducer from '../../features/Settings/redux/settings.slice';
import profileReducer from '../../features/Profile/redux/profile.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donations: donationsReducer,
    statistics: statisticsReducer,
    wallet: walletReducer,
    budgets: budgetsReducer,
    goals: goalsReducer,
    analytics: analyticsReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
