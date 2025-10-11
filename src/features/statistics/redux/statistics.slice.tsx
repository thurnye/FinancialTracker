/**
 * Statistics Redux Slice (Simplified)
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatisticsApiService } from '../services/statistics.services';
import { ApiClientError } from '../../../shared/types/api.types';

export interface DonationCategoryStat {
  category: string;
  totalAmount: number;
}

interface StatisticsState {
  donationAmountPerCategory: DonationCategoryStat[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  donationAmountPerCategory: [],
  loading: false,
  error: null,
};

// --- Async Thunks ---

export const fetchDonationsPerCategory = createAsyncThunk(
  'statistics/fetchDonationsPerCategory',
  async (_, { rejectWithValue }) => {
    try {
      return await StatisticsApiService.getDonationsPerCategory();
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : 'Failed to fetch statistics';
      return rejectWithValue(err);
    }
  }
);

// --- Slice ---

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: StatisticsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: StatisticsState) => {
      state.loading = false;
    };

    builder
      .addCase(fetchDonationsPerCategory.pending, startLoading)
      .addCase(fetchDonationsPerCategory.fulfilled, (state, action) => {
        stopLoading(state);
        state.donationAmountPerCategory = action.payload;
      })
      .addCase(fetchDonationsPerCategory.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = statisticsSlice.actions;
export default statisticsSlice.reducer;
