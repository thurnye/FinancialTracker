/**
 * Goals Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { GoalsApiService } from '../services/goals.api.service';
import { Goal } from '../types/goals.types';

export const fetchGoals = createAsyncThunk(
  'goals/fetchGoals',
  async (_, { rejectWithValue }) => {
    try {
      return await GoalsApiService.getGoals();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch goals';
      return rejectWithValue(err);
    }
  }
);

export const saveGoal = createAsyncThunk(
  'goals/saveGoal',
  async (data: Goal, { rejectWithValue }) => {
    try {
      return await GoalsApiService.saveGoal(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save goal';
      return rejectWithValue(err);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (goalId: string, { rejectWithValue }) => {
    try {
      await GoalsApiService.deleteGoal(goalId);
      return goalId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete goal';
      return rejectWithValue(err);
    }
  }
);
