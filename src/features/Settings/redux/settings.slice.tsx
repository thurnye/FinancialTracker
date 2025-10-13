/**
 * Settings Redux Slice (Unified Create/Update)
 */

import { createSlice } from '@reduxjs/toolkit';
import { BankAccount, Category, UserProfile } from '../types/settings.types';
import {
  fetchBankAccounts,
  saveBankAccount,
  deleteBankAccount,
  fetchCategories,
  saveCategory,
  deleteCategory,
  fetchUserProfile,
  updateUserProfile,
} from './settings.asyncThunkService';

interface SettingsState {
  bankAccounts: BankAccount[];
  categories: Category[];
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  bankAccounts: [],
  categories: [],
  userProfile: null,
  loading: false,
  error: null,
};

// --- Slice ---

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: SettingsState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: SettingsState) => {
      state.loading = false;
    };

    builder
      // Fetch Bank Accounts
      .addCase(fetchBankAccounts.pending, startLoading)
      .addCase(fetchBankAccounts.fulfilled, (state, action) => {
        stopLoading(state);
        state.bankAccounts = action.payload.map((account) => ({
          ...account,
          id: account.id ?? '',
        }));
      })
      .addCase(fetchBankAccounts.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Bank Account
      .addCase(saveBankAccount.pending, startLoading)
      .addCase(saveBankAccount.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedAccount = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.bankAccounts.findIndex((a) => a.id === updatedAccount.id);
        if (index !== -1) {
          state.bankAccounts[index] = updatedAccount;
        } else {
          state.bankAccounts.unshift(updatedAccount);
        }
      })
      .addCase(saveBankAccount.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Bank Account
      .addCase(deleteBankAccount.pending, startLoading)
      .addCase(deleteBankAccount.fulfilled, (state, action) => {
        stopLoading(state);
        state.bankAccounts = state.bankAccounts.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteBankAccount.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, startLoading)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        stopLoading(state);
        state.categories = action.payload.map((category) => ({
          ...category,
          id: category.id ?? '',
        }));
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Category
      .addCase(saveCategory.pending, startLoading)
      .addCase(saveCategory.fulfilled, (state, action) => {
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
      .addCase(saveCategory.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Category
      .addCase(deleteCategory.pending, startLoading)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        stopLoading(state);
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, startLoading)
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, startLoading)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        stopLoading(state);
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchBankAccounts,
  saveBankAccount,
  deleteBankAccount,
  fetchCategories,
  saveCategory,
  deleteCategory,
  fetchUserProfile,
  updateUserProfile,
} from './settings.asyncThunkService';
