/**
 * Dashboard Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { DashboardApiService } from '../services/dashboard.api.service';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await DashboardApiService.getDashboardData();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch dashboard data';
      return rejectWithValue(err);
    }
  }
);
