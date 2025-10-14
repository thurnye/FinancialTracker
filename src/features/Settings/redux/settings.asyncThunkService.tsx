/**
 * Settings Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { BankAccount, Category, UserProfile } from '../types/settings.types';
// import { BankAccountApiService } from '../services/BankAccount.api.service';
import { CategoryApiService } from '../services/categories.api.service';
import { UserApiService } from '../services/user.api.service';
import { BankAccountApiService } from '../services/bankAccount.api.service';

// Bank Accounts
export const fetchBankAccounts = createAsyncThunk(
  'settings/fetchBankAccounts',
  async (_, { rejectWithValue }) => {
    try {
      return await BankAccountApiService.getBankAccounts();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch bank accounts';
      return rejectWithValue(err);
    }
  }
);

export const saveBankAccount = createAsyncThunk(
  'settings/saveBankAccount',
  async (data: BankAccount, { rejectWithValue }) => {
    try {
      return await BankAccountApiService.saveBankAccount(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save bank account';
      return rejectWithValue(err);
    }
  }
);

export const deleteBankAccount = createAsyncThunk(
  'settings/deleteBankAccount',
  async (accountId: string, { rejectWithValue }) => {
    try {
      await BankAccountApiService.deleteBankAccount(accountId);
      return accountId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete bank account';
      return rejectWithValue(err);
    }
  }
);

// Categories
export const fetchCategories = createAsyncThunk(
  '/category',
  async (_, { rejectWithValue }) => {
    try {
   return await CategoryApiService.getCategories();
       
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch categories';
      return rejectWithValue(err);
    }
  }
);

export const saveCategory = createAsyncThunk(
  '/saveCategory',
  async (data: Category, { rejectWithValue }) => {
    try {
      return await CategoryApiService.saveCategory(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save category';
      return rejectWithValue(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  '/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await CategoryApiService.deleteCategory(categoryId);
      return categoryId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete category';
      return rejectWithValue(err);
    }
  }
);

// User Profile
export const fetchUserProfile = createAsyncThunk(
  'settings/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await UserApiService.getUserProfile();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch user profile';
      return rejectWithValue(err);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'settings/updateUserProfile',
  async (data: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      return await UserApiService.updateUserProfile(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to update user profile';
      return rejectWithValue(err);
    }
  }
);
