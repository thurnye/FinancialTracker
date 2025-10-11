/**
 * User Redux Slice (Unified Save)
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/trade.types";
import {
  userApiService,
  IUserProfileData,
} from "../../services/user.api.service";
import { ApiClientError } from "../../../../shared/types/api.types";

interface UserState {
  currentUser: IUser | null;
  viewedUser: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  viewedUser: null,
  loading: false,
  error: null,
};

// --- Async Thunks ---

export const fetchCurrentUserProfile = createAsyncThunk(
  "user/fetchCurrentUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userApiService.getCurrentUserProfile();
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : "Failed to fetch current user profile";
      return rejectWithValue(err);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await userApiService.getUserProfile(userId);
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : "Failed to fetch user profile";
      return rejectWithValue(err);
    }
  }
);

export const saveUserProfile = createAsyncThunk(
  "user/saveUserProfile",
  async (data: IUserProfileData, { rejectWithValue }) => {
    try {
      return await userApiService.saveUserProfile(data);
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : "Failed to save user profile";
      return rejectWithValue(err);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file: File, { rejectWithValue }) => {
    try {
      return await userApiService.uploadAvatar(file);
    } catch (error) {
      const err =
        error instanceof ApiClientError
          ? error.message
          : "Failed to upload avatar";
      return rejectWithValue(err);
    }
  }
);

// --- Slice ---

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearViewedUser: (state) => {
      state.viewedUser = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: UserState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: UserState) => {
      state.loading = false;
    };

    builder
      // Fetch Current User
      .addCase(fetchCurrentUserProfile.pending, startLoading)
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch User by ID
      .addCase(fetchUserProfile.pending, startLoading)
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.viewedUser = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Create or Update User
      .addCase(saveUserProfile.pending, startLoading)
      .addCase(saveUserProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.currentUser = action.payload;
      })
      .addCase(saveUserProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Upload Avatar
      .addCase(uploadAvatar.pending, startLoading)
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        stopLoading(state);
        if (state.currentUser) {
          state.currentUser.avatar = action.payload.avatarUrl;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearViewedUser } = userSlice.actions;
export default userSlice.reducer;
