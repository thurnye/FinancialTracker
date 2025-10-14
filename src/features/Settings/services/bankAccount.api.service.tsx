/**
 * Settings API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { BankAccount  } from '../types/settings.types';

class BankAccountApi {
  // Bank Accounts
  async getBankAccounts(): Promise<BankAccount[]> {
    return apiClient.get<BankAccount[]>('/settings/bank-accounts');
  }

  async saveBankAccount(data: BankAccount): Promise<BankAccount> {
    if (data.id) {
      return apiClient.put<BankAccount>(`/settings/bank-accounts/${data.id}`, data);
    } else {
      return apiClient.post<BankAccount>('/settings/bank-accounts', data);
    }
  }

  async deleteBankAccount(accountId: string): Promise<void> {
    return apiClient.delete<void>(`/settings/bank-accounts/${accountId}`);
  }

}

export const BankAccountApiService = new BankAccountApi();
