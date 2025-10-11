/**
 * Donations Redux Slice (Unified Create/Update)
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { DonationApiService } from '../services/donation.services';
import { IDonation, IDonationData } from '../types/donation.types';

interface IDonationsState {
  donations: IDonation[];
  loading: boolean;
  error: string | null;
}

const initialState: IDonationsState = {
  donations: [],
  loading: false,
  error: null,
};

// --- Async Thunks ---

export const fetchDonations = createAsyncThunk(
  'donations/fetchDonations',
  async (_, { rejectWithValue }) => {
    try {
      return await DonationApiService.getDonations();
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : 'Failed to fetch donations';
      return rejectWithValue(err);
    }
  }
);

export const saveDonation = createAsyncThunk(
  'donations/saveDonation',
  async (data: IDonationData, { rejectWithValue }) => {
    try {
      return await DonationApiService.saveDonation(data);
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : 'Failed to save donation';
      return rejectWithValue(err);
    }
  }
);

export const deleteDonation = createAsyncThunk(
  'donations/deleteDonation',
  async (donationId: string, { rejectWithValue }) => {
    try {
      await DonationApiService.deleteDonation(donationId);
      return donationId;
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : 'Failed to delete donation';
      return rejectWithValue(err);
    }
  }
);

// --- Slice ---

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: IDonationsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: IDonationsState) => {
      state.loading = false;
    };

    builder
      // Fetch Donations
      .addCase(fetchDonations.pending, startLoading)
      .addCase(fetchDonations.fulfilled, (state, action) => {
        stopLoading(state);
        state.donations = action.payload.map((donation) => ({
          ...donation,
          id: donation.id ?? '',
        }));
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Create or Update Donation
      .addCase(saveDonation.pending, startLoading)
      .addCase(saveDonation.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedDonation = {
          ...action.payload,
          id: action.payload.id ?? '',
        };

        const index = state.donations.findIndex(
          (e) => e.id === updatedDonation.id
        );

        if (index !== -1) {
          // Update existing donation
          state.donations[index] = updatedDonation;
        } else {
          // Add new donation
          state.donations.unshift(updatedDonation);
        }
      })
      .addCase(saveDonation.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Donation
      .addCase(deleteDonation.pending, startLoading)
      .addCase(deleteDonation.fulfilled, (state, action) => {
        stopLoading(state);
        state.donations = state.donations.filter(
          (donation) => donation.id !== action.payload
        );
      })
      .addCase(deleteDonation.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = donationsSlice.actions;
export default donationsSlice.reducer;
