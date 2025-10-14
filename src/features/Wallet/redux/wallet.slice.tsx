/**
 * Wallet Redux Slice (Unified Create/Update)
 */

import { createSlice } from '@reduxjs/toolkit';
import { Wallet, WalletAccount, ICreditCard, TransactionItem } from '../types/wallet.types';
import {
  fetchWallets,
  saveWallet,
  deleteWallet,
  fetchWalletAccounts,
  saveWalletAccount,
  deleteWalletAccount,
  fetchCreditCards,
  saveCreditCard,
  deleteCreditCard,
  fetchTransactions,
  saveTransaction,
  deleteTransaction,
} from './wallet.asyncThunkService';

interface WalletState {
  wallets: Wallet[];
  accounts: WalletAccount[];
  creditCards: ICreditCard[];
  transactions: TransactionItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  accounts: [],
  creditCards: [],
  transactions: [],
  loading: false,
  error: null,
};

// --- Slice ---

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: WalletState) => {
      state.loading = true;
      state.error = null;
    };
    const stopLoading = (state: WalletState) => {
      state.loading = false;
    };

    builder
      // Fetch Wallets
      .addCase(fetchWallets.pending, startLoading)
      .addCase(fetchWallets.fulfilled, (state, action) => {
        stopLoading(state);
        state.wallets = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Wallet
      .addCase(saveWallet.pending, startLoading)
      .addCase(saveWallet.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedWallet = action.payload;
        const index = state.wallets.findIndex((w) => w.id === updatedWallet.id);
        if (index !== -1) {
          state.wallets[index] = updatedWallet;
        } else {
          state.wallets.unshift(updatedWallet);
        }
      })
      .addCase(saveWallet.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Wallet
      .addCase(deleteWallet.pending, startLoading)
      .addCase(deleteWallet.fulfilled, (state, action) => {
        stopLoading(state);
        state.wallets = state.wallets.filter((w) => w.id !== action.payload);
      })
      .addCase(deleteWallet.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch Accounts
      .addCase(fetchWalletAccounts.pending, startLoading)
      .addCase(fetchWalletAccounts.fulfilled, (state, action) => {
        stopLoading(state);
        state.accounts = action.payload.map((account) => ({
          ...account,
          id: account.id ?? '',
        }));
      })
      .addCase(fetchWalletAccounts.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Account
      .addCase(saveWalletAccount.pending, startLoading)
      .addCase(saveWalletAccount.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedAccount = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.accounts.findIndex((a) => a.id === updatedAccount.id);
        if (index !== -1) {
          state.accounts[index] = updatedAccount;
        } else {
          state.accounts.unshift(updatedAccount);
        }
      })
      .addCase(saveWalletAccount.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Account
      .addCase(deleteWalletAccount.pending, startLoading)
      .addCase(deleteWalletAccount.fulfilled, (state, action) => {
        stopLoading(state);
        state.accounts = state.accounts.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteWalletAccount.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch Credit Cards
      .addCase(fetchCreditCards.pending, startLoading)
      .addCase(fetchCreditCards.fulfilled, (state, action) => {
        stopLoading(state);
        state.creditCards = action.payload.map((card) => ({
          ...card,
          id: card.id ?? '',
        }));
      })
      .addCase(fetchCreditCards.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Credit Card
      .addCase(saveCreditCard.pending, startLoading)
      .addCase(saveCreditCard.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedCard = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.creditCards.findIndex((c) => c.id === updatedCard.id);
        if (index !== -1) {
          state.creditCards[index] = updatedCard;
        } else {
          state.creditCards.unshift(updatedCard);
        }
      })
      .addCase(saveCreditCard.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Credit Card
      .addCase(deleteCreditCard.pending, startLoading)
      .addCase(deleteCreditCard.fulfilled, (state, action) => {
        stopLoading(state);
        state.creditCards = state.creditCards.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCreditCard.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Fetch Transactions
      .addCase(fetchTransactions.pending, startLoading)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        stopLoading(state);
        state.transactions = action.payload.map((transaction) => ({
          ...transaction,
          id: transaction.id ?? '',
        }));
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Save Transaction
      .addCase(saveTransaction.pending, startLoading)
      .addCase(saveTransaction.fulfilled, (state, action) => {
        stopLoading(state);
        const updatedTransaction = {
          ...action.payload,
          id: action.payload.id ?? '',
        };
        const index = state.transactions.findIndex((t) => t.id === updatedTransaction.id);
        if (index !== -1) {
          state.transactions[index] = updatedTransaction;
        } else {
          state.transactions.unshift(updatedTransaction);
        }
      })
      .addCase(saveTransaction.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      })

      // Delete Transaction
      .addCase(deleteTransaction.pending, startLoading)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        stopLoading(state);
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = walletSlice.actions;
export default walletSlice.reducer;

// Re-export async thunks for convenience
export {
  fetchWallets,
  saveWallet,
  deleteWallet,
  fetchWalletAccounts,
  saveWalletAccount,
  deleteWalletAccount,
  fetchCreditCards,
  saveCreditCard,
  deleteCreditCard,
  fetchTransactions,
  saveTransaction,
  deleteTransaction,
} from './wallet.asyncThunkService';