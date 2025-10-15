/**
 * Transaction Async Thunks
 * Redux async actions for transaction operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
// import { TransactionApiService } from '../services/transaction.api.service';
import {
  Transaction,
  PaginatedResponse,
  TransactionFilters,
} from '../types/transaction.types';
import { TransactionApiService } from '../services/transaction.api.service 2';

/**
 * Fetch all transactions with pagination and filters
 */
export const fetchTransactions = createAsyncThunk<
  PaginatedResponse<Transaction>,
  TransactionFilters | undefined,
  { rejectValue: string }
>('transactions/fetchAll', async (filters, { rejectWithValue }) => {
  try {
    const response = await TransactionApiService.getTransactions(filters);
    // console.log('Fetched transactions:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch transactions'
    );
  }
});

/**
 * Fetch transactions by wallet ID
 */
export const fetchTransactionsByWallet = createAsyncThunk<
  PaginatedResponse<Transaction>,
  { walletId: string; filters?: TransactionFilters },
  { rejectValue: string }
>(
  'transactions/fetchByWallet',
  async ({ walletId, filters }, { rejectWithValue }) => {
    try {
      const response = await TransactionApiService.getTransactionsByWallet(
        walletId,
        filters
      );
      // console.log('Filters:', filters)
      // // console.log(walletId)
      // console.log('Fetched wallet transactions:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch wallet transactions'
      );
    }
  }
);

/**
 * Fetch a single transaction by ID
 */
export const fetchTransactionById = createAsyncThunk<
  Transaction,
  string,
  { rejectValue: string }
>('transactions/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await TransactionApiService.getTransactionById(id);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch transaction'
    );
  }
});

/**
 * Create or update a transaction
 */
export const saveTransaction = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: string }
>('transactions/save', async (data, { rejectWithValue }) => {
  try {
    const response = await TransactionApiService.saveTransaction(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to save transaction'
    );
  }
});

/**
 * Delete a transaction
 */
export const deleteTransaction = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('transactions/delete', async (id, { rejectWithValue }) => {
  try {
    await TransactionApiService.deleteTransaction(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to delete transaction'
    );
  }
});

/**
 * Fetch transaction statistics
 */
export const fetchTransactionStats = createAsyncThunk<
  {
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    netAmount: number;
  },
  | {
      walletId?: string;
      startDate?: string;
      endDate?: string;
    }
  | undefined,
  { rejectValue: string }
>('transactions/fetchStats', async (filters, { rejectWithValue }) => {
  try {
    const response = await TransactionApiService.getTransactionStats(filters);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch transaction stats'
    );
  }
});
