/**
 * Goals Redux Slice (Unified Create/Update)
 */

import { createSlice } from '@reduxjs/toolkit';
import { Goal } from '../types/goals.types';
import {
  fetchGoals,
  saveGoal,
  deleteGoal,
} from './goals.asyncThunkService';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

// --- Slice ---

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: GoalsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: GoalsState) => {
      state.loading = false;
    };

    builder
      // Fetch Goals
      .addCase(fetchGoals.pending, startLoading)
      .addCase(fetchGoals.fulfilled, (state, action) => {
        stopLoading(state);
        state.goals = action.payload.map((goal) => ({
          ...goal,
          id: goal.id ?? '',
        }));
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Goal
      .addCase(saveGoal.pending, startLoading)
      .addCase(saveGoal.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedGoal = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.goals.findIndex((g) => g.id === updatedGoal.id);
        if (index !== -1) {
          state.goals[index] = updatedGoal;
        } else {
          state.goals.unshift(updatedGoal);
        }
      })
      .addCase(saveGoal.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Goal
      .addCase(deleteGoal.pending, startLoading)
      .addCase(deleteGoal.fulfilled, (state, action) => {
        stopLoading(state);
        state.goals = state.goals.filter((g) => g.id !== action.payload);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = goalsSlice.actions;
export default goalsSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchGoals,
  saveGoal,
  deleteGoal,
} from './goals.asyncThunkService';
