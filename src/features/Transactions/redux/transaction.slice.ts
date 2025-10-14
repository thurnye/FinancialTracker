/**
 * Transaction Redux Slice
 * Manages transaction state with pagination
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TransactionsState,
  TransactionFilters,
} from '../types/transaction.types';
import {
  fetchTransactions,
  fetchTransactionsByWallet,
  fetchTransactionById,
  saveTransaction,
  deleteTransaction,
} from './transaction.asyncThunkService';

const initialState: TransactionsState = {
  transactions: [],
  selectedTransaction: null,
  pagination: {
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  filters: {
    page: 1,
    limit: 20,
    sortBy: 'date',
    sortOrder: 'desc',
  },
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TransactionFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.filters.limit = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data || [];
        // console.log('Redux: Fetched transactions:', action.payload);
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          pageSize: action.payload.pagination?.pageSize || 20,
          totalItems: action.payload.pagination?.totalItems || 0,
          totalPages: action.payload.pagination?.totalPages || 0,
          hasNextPage: action.payload.pagination?.hasNextPage || false,
          hasPreviousPage: action.payload.pagination?.hasPreviousPage || false,
        };
        // // console.log('Redux: Updated pagination:', state.pagination);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch transactions';
      });

    // Fetch transactions by wallet
    builder
      .addCase(fetchTransactionsByWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByWallet.fulfilled, (state, action) => {
        state.loading = false;
        // console.log('Redux: Updated pagination BY Wallet:', state.pagination);
        state.transactions = action.payload.data || [];
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          pageSize: action.payload.pagination?.pageSize || 20,
          totalItems: action.payload.pagination?.totalItems || 0,
          totalPages: action.payload.pagination?.totalPages || 0,
          hasNextPage: action.payload.pagination?.hasNextPage || false,
          hasPreviousPage: action.payload.pagination?.hasPreviousPage || false,
        };
        // console.log('Redux: Updated wallet pagination:', state.pagination);
      })
      .addCase(fetchTransactionsByWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch wallet transactions';
      });

    // Fetch transaction by ID
    builder
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch transaction';
      });

    // Save transaction
    builder
      .addCase(saveTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          // Update existing transaction
          state.transactions[index] = action.payload;
        } else {
          // Add new transaction to the beginning
          state.transactions.unshift(action.payload);
          state.pagination.totalItems += 1;
        }
      })
      .addCase(saveTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save transaction';
      });

    // Delete transaction
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
        state.pagination.totalItems -= 1;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete transaction';
      });
  },
});

export const {
  setFilters,
  setPage,
  setLimit,
  resetFilters,
  clearError,
  clearSelectedTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
