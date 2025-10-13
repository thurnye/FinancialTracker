/**
 * Budgets Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { BudgetsApiService } from '../services/budgets.api.service';
import { BudgetCategory } from '../types/budgets.types';

export const fetchBudgetCategories = createAsyncThunk(
  'budgets/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await BudgetsApiService.getCategories();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch budget categories';
      return rejectWithValue(err);
    }
  }
);

export const saveBudgetCategory = createAsyncThunk(
  'budgets/saveCategory',
  async (data: BudgetCategory, { rejectWithValue }) => {
    try {
      return await BudgetsApiService.saveCategory(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save budget category';
      return rejectWithValue(err);
    }
  }
);

export const deleteBudgetCategory = createAsyncThunk(
  'budgets/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await BudgetsApiService.deleteCategory(categoryId);
      return categoryId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete budget category';
      return rejectWithValue(err);
    }
  }
);
