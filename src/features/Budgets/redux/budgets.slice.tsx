/**
 * Budgets Redux Slice (Unified Create/Update)
 */

import { createSlice } from '@reduxjs/toolkit';
import { BudgetCategory } from '../types/budgets.types';
import {
  fetchBudgetCategories,
  saveBudgetCategory,
  deleteBudgetCategory,
} from './budgets.asyncThunkService';

interface BudgetsState {
  categories: BudgetCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: BudgetsState = {
  categories: [],
  loading: false,
  error: null,
};

// --- Slice ---

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: BudgetsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: BudgetsState) => {
      state.loading = false;
    };

    builder
      // Fetch Categories
      .addCase(fetchBudgetCategories.pending, startLoading)
      .addCase(fetchBudgetCategories.fulfilled, (state, action) => {
        stopLoading(state);
        state.categories = action.payload.map((category) => ({
          ...category,
          id: category.id ?? '',
        }));
      })
      .addCase(fetchBudgetCategories.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Category
      .addCase(saveBudgetCategory.pending, startLoading)
      .addCase(saveBudgetCategory.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedCategory = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.categories.findIndex((c) => c.id === updatedCategory.id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        } else {
          state.categories.unshift(updatedCategory);
        }
      })
      .addCase(saveBudgetCategory.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Category
      .addCase(deleteBudgetCategory.pending, startLoading)
      .addCase(deleteBudgetCategory.fulfilled, (state, action) => {
        stopLoading(state);
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteBudgetCategory.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = budgetsSlice.actions;
export default budgetsSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchBudgetCategories,
  saveBudgetCategory,
  deleteBudgetCategory,
} from './budgets.asyncThunkService';
