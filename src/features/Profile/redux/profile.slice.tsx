/**
 * Profile Redux Slice
 */

import { createSlice } from '@reduxjs/toolkit';
import { UserProfileData } from '../services/profile.api.service';
import {
  fetchProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} from './profile.asyncThunkService';

interface ProfileState {
  profile: UserProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// --- Slice ---

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: ProfileState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: ProfileState) => {
      state.loading = false;
    };

    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, startLoading)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Update Profile
      .addCase(updateProfile.pending, startLoading)
      .addCase(updateProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Upload Avatar
      .addCase(uploadAvatar.pending, startLoading)
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        stopLoading(state);
        if (state.profile) {
          state.profile.avatar = action.payload.avatarUrl;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Avatar
      .addCase(deleteAvatar.pending, startLoading)
      .addCase(deleteAvatar.fulfilled, (state) => {
        stopLoading(state);
        if (state.profile) {
          state.profile.avatar = undefined;
        }
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} from './profile.asyncThunkService';
