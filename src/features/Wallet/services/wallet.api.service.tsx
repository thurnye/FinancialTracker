/**
 * Wallet API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { Wallet, WalletAccount, ICreditCard, TransactionItem, WalletData } from '../types/wallet.types';

class WalletApi {
  // ========== Wallet CRUD (Main Backend API) ==========

  async getWallets(): Promise<Wallet[]> {
    return apiClient.get<Wallet[]>('/wallet');
  }

  async getWalletById(id: string): Promise<Wallet> {
    return apiClient.get<Wallet>(`/wallet/${id}`);
  }

  async saveWallet(data: Wallet): Promise<Wallet> {
    return apiClient.post<Wallet>('/wallet/create-update', data);
  }

  async deleteWallet(walletId: string): Promise<void> {
    return apiClient.delete<void>(`/wallet/${walletId}`);
  }

  // ========== Wallet Accounts (Legacy - UI Components) ==========

  async getAccounts(): Promise<WalletAccount[]> {
    return apiClient.get<WalletAccount[]>('/wallet/accounts');
  }

  async saveAccount(data: WalletAccount): Promise<WalletAccount> {
    if (data.id) {
      return apiClient.put<WalletAccount>(`/wallet/accounts/${data.id}`, data);
    } else {
      return apiClient.post<WalletAccount>('/wallet/accounts', data);
    }
  }

  async deleteAccount(accountId: string): Promise<void> {
    return apiClient.delete<void>(`/wallet/accounts/${accountId}`);
  }

  // ========== Credit Cards ==========

  async getCreditCards(): Promise<ICreditCard[]> {
    return apiClient.get<ICreditCard[]>('/wallet/credit-cards');
  }

  async saveCreditCard(data: ICreditCard): Promise<ICreditCard> {
    if (data.id) {
      return apiClient.put<ICreditCard>(`/wallet/credit-cards/${data.id}`, data);
    } else {
      return apiClient.post<ICreditCard>('/wallet/credit-cards', data);
    }
  }

  async deleteCreditCard(cardId: string): Promise<void> {
    return apiClient.delete<void>(`/wallet/credit-cards/${cardId}`);
  }

  // ========== Transactions ==========

  async getTransactions(): Promise<TransactionItem[]> {
    return apiClient.get<TransactionItem[]>('/wallet/transactions');
  }

  async saveTransaction(data: TransactionItem): Promise<TransactionItem> {
    if (data.id) {
      return apiClient.put<TransactionItem>(`/wallet/transactions/${data.id}`, data);
    } else {
      return apiClient.post<TransactionItem>('/wallet/transactions', data);
    }
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    return apiClient.delete<void>(`/wallet/transactions/${transactionId}`);
  }

  // ========== Combined Data ==========

  async getAllWalletData(): Promise<WalletData> {
    return apiClient.get<WalletData>('/wallet');
  }
}

export const WalletApiService = new WalletApi();
