/**
 * Budgets Redux Slice
 */

import { createSlice } from '@reduxjs/toolkit';
import { Budget } from '../types/budgets.types';
import {
  fetchBudgets,
  saveBudget,
  deleteBudget,
} from './budgets.asyncThunkService';

interface BudgetsState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
}

const initialState: BudgetsState = {
  budgets: [],
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
      // Fetch Budgets
      .addCase(fetchBudgets.pending, startLoading)
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        stopLoading(state);
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Budget
      .addCase(saveBudget.pending, startLoading)
      .addCase(saveBudget.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedBudget = action.payload;
        const index = state.budgets.findIndex((b) => b.id === updatedBudget.id);
        if (index !== -1) {
          state.budgets[index] = updatedBudget;
        } else {
          state.budgets.unshift(updatedBudget);
        }
      })
      .addCase(saveBudget.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Budget
      .addCase(deleteBudget.pending, startLoading)
      .addCase(deleteBudget.fulfilled, (state, action) => {
        stopLoading(state);
        state.budgets = state.budgets.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = budgetsSlice.actions;
export default budgetsSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchBudgets,
  saveBudget,
  deleteBudget,
} from './budgets.asyncThunkService';
