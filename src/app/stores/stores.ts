import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/redux/slice/auth.slice';
import userReducer from '../../features/user/redux/slices/user.slice';
import donationsReducer from '../../features/donation/redux/donation.slice'
import statisticsReducer from '../../features/statistics/redux/statistics.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    donations: donationsReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
