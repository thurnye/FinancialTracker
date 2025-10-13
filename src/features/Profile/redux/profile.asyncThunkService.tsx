/**
 * Profile Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { ProfileApiService, UserProfileData } from '../services/profile.api.service';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await ProfileApiService.getProfile();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch profile';
      return rejectWithValue(err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data: Partial<UserProfileData>, { rejectWithValue }) => {
    try {
      return await ProfileApiService.updateProfile(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to update profile';
      return rejectWithValue(err);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'profile/uploadAvatar',
  async (file: File, { rejectWithValue }) => {
    try {
      return await ProfileApiService.uploadAvatar(file);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to upload avatar';
      return rejectWithValue(err);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  'profile/deleteAvatar',
  async (_, { rejectWithValue }) => {
    try {
      await ProfileApiService.deleteAvatar();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete avatar';
      return rejectWithValue(err);
    }
  }
);
