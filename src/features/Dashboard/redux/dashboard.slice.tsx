/**
 * Dashboard Redux Slice
 */

import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from './dashboard.asyncThunkService';

interface DashboardState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

// --- Slice ---

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: DashboardState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: DashboardState) => {
      state.loading = false;
    };

    builder
      .addCase(fetchDashboardData.pending, startLoading)
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        stopLoading(state);
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// Re-export async thunks for convenience
export { fetchDashboardData } from './dashboard.asyncThunkService';
