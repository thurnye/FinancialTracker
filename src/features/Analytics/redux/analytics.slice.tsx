/**
 * Analytics Redux Slice
 */

import { createSlice } from '@reduxjs/toolkit';
import { AnalyticsData } from '../types/analytics.types';
import { fetchAnalyticsData } from './analytics.asyncThunkService';

interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

// --- Slice ---

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: AnalyticsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: AnalyticsState) => {
      state.loading = false;
    };

    builder
      .addCase(fetchAnalyticsData.pending, startLoading)
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        stopLoading(state);
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;

// Re-export async thunks for convenience
export { fetchAnalyticsData } from './analytics.asyncThunkService';
