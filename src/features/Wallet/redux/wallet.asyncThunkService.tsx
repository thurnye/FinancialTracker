/**
 * Wallet Async Thunk Services
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiClientError } from '../../../shared/types/api.types';
import { WalletApiService } from '../services/wallet.api.service';
import { WalletAccount, ICreditCard, TransactionItem } from '../types/wallet.types';

// Wallet Accounts
export const fetchWalletAccounts = createAsyncThunk(
  'wallet/fetchAccounts',
  async (_, { rejectWithValue }) => {
    try {
      return await WalletApiService.getAccounts();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch wallet accounts';
      return rejectWithValue(err);
    }
  }
);

export const saveWalletAccount = createAsyncThunk(
  'wallet/saveAccount',
  async (data: WalletAccount, { rejectWithValue }) => {
    try {
      return await WalletApiService.saveAccount(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save wallet account';
      return rejectWithValue(err);
    }
  }
);

export const deleteWalletAccount = createAsyncThunk(
  'wallet/deleteAccount',
  async (accountId: string, { rejectWithValue }) => {
    try {
      await WalletApiService.deleteAccount(accountId);
      return accountId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete wallet account';
      return rejectWithValue(err);
    }
  }
);

// Credit Cards
export const fetchCreditCards = createAsyncThunk(
  'wallet/fetchCreditCards',
  async (_, { rejectWithValue }) => {
    try {
      return await WalletApiService.getCreditCards();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch credit cards';
      return rejectWithValue(err);
    }
  }
);

export const saveCreditCard = createAsyncThunk(
  'wallet/saveCreditCard',
  async (data: ICreditCard, { rejectWithValue }) => {
    try {
      return await WalletApiService.saveCreditCard(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save credit card';
      return rejectWithValue(err);
    }
  }
);

export const deleteCreditCard = createAsyncThunk(
  'wallet/deleteCreditCard',
  async (cardId: string, { rejectWithValue }) => {
    try {
      await WalletApiService.deleteCreditCard(cardId);
      return cardId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete credit card';
      return rejectWithValue(err);
    }
  }
);

// Transactions
export const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      return await WalletApiService.getTransactions();
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to fetch transactions';
      return rejectWithValue(err);
    }
  }
);

export const saveTransaction = createAsyncThunk(
  'wallet/saveTransaction',
  async (data: TransactionItem, { rejectWithValue }) => {
    try {
      return await WalletApiService.saveTransaction(data);
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to save transaction';
      return rejectWithValue(err);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'wallet/deleteTransaction',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      await WalletApiService.deleteTransaction(transactionId);
      return transactionId;
    } catch (error) {
      const err = error instanceof ApiClientError ? error.message : 'Failed to delete transaction';
      return rejectWithValue(err);
    }
  }
);
