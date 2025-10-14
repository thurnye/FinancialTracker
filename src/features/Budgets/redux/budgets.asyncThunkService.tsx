/**
 * Budgets Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { BudgetsApiService } from '../services/budgets.api.service';
import { Budget } from '../types/budgets.types';

export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      return await BudgetsApiService.getBudgets();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch budgets';
      return rejectWithValue(err);
    }
  }
);

export const saveBudget = createAsyncThunk(
  'budgets/saveBudget',
  async (data: Budget, { rejectWithValue }) => {
    try {
      return await BudgetsApiService.saveBudget(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save budget';
      return rejectWithValue(err);
    }
  }
);

export const deleteBudget = createAsyncThunk(
  'budgets/deleteBudget',
  async (budgetId: string, { rejectWithValue }) => {
    try {
      await BudgetsApiService.deleteBudget(budgetId);
      return budgetId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete budget';
      return rejectWithValue(err);
    }
  }
);
