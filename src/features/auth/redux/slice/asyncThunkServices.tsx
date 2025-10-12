
// -------------------------------
// Auth Initialization (runs on app load)
// -------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, saveUser, clearUserStorage } from "../../../../app/utils/app.storage";
import { TokenManager } from "../../../../shared/services/apiClient.service";
import { ApiClientError } from "../../../../shared/types/api.types";
import { authApiService } from "../../services/auth.api.service";
import { IUserLoginInfo, RegisterData } from "../../types/auth.types";

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { rejectWithValue }) => {
  try {
    const storedUser = getUser();
    const token = TokenManager.getAccessToken();

    // If both user and token exist, skip refresh and reuse them
    if (storedUser && token) {
      console.log('[Auth Init] Rehydrating from sessionStorage + localStorage');
      return { user: storedUser, initialized: true };
    }

    // Otherwise, try silent refresh via backend cookie
    console.log('[Auth Init] Trying silent refresh with HttpOnly cookie...');
    const refreshed = await authApiService.refreshToken();
    if (refreshed.accessToken) {
      TokenManager.setAccessToken(refreshed.accessToken);
      saveUser(refreshed.user);
      return { user: refreshed.user, initialized: true };
    }

    console.warn('[Auth Init] No valid refresh response.');
    clearUserStorage();
    TokenManager.clear();
    return { user: null, initialized: true };
  } catch (error) {
    console.error('[Auth Init] Silent refresh failed:', error);
    clearUserStorage();
    TokenManager.clear();
    return { user: null, initialized: true };
  }
});

// -------------------------------
// Login
// -------------------------------
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: IUserLoginInfo, { rejectWithValue }) => {
    try {
      const response = await authApiService.login(credentials);
      saveUser(response.user);
      return response;
    } catch (error) {
      if (error instanceof ApiClientError) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          field: error.field,
        });
      }
      return rejectWithValue({ message: 'Unable to log in. Please try again.' });
    }
  }
);

// -------------------------------
// Register
// -------------------------------
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApiService.register(data);
      saveUser(response.user);
      return response;
    } catch (error) {
      if (error instanceof ApiClientError) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
          field: error.field,
        });
      }
      return rejectWithValue({ message: 'Unable to register. Please try again.' });
    }
  }
);

// -------------------------------
// Logout
// -------------------------------
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await authApiService.logout();
  } catch (error) {
    console.warn('[Logout] API error:', error);
  } finally {
    clearUserStorage();
    TokenManager.clear();
  }
});

// -------------------------------
// Fetch Current User (optional endpoint)
// -------------------------------
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authApiService.getCurrentUser();
      saveUser(user);
      return user;
    } catch (error) {
      if (error instanceof ApiClientError) {
        return rejectWithValue({
          message: error.message,
          code: error.code,
        });
      }
      return rejectWithValue({ message: 'Unable to load your profile.' });
    }
  }
);
