/**
 * Analytics Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { AnalyticsApiService } from '../services/analytics.api.service';

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await AnalyticsApiService.getAllAnalyticsData();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch analytics data';
      return rejectWithValue(err);
    }
  }
);
