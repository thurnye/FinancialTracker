/**
 * Settings API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { BankAccount, Category, UserProfile } from '../types/settings.types';

class SettingsApi {
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

  // Categories
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/settings/categories');
  }

  async saveCategory(data: Category): Promise<Category> {
    if (data.id) {
      return apiClient.put<Category>(`/settings/categories/${data.id}`, data);
    } else {
      return apiClient.post<Category>('/settings/categories', data);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    return apiClient.delete<void>(`/settings/categories/${categoryId}`);
  }

  // User Profile
  async getUserProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/settings/profile');
  }

  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.put<UserProfile>('/settings/profile', data);
  }

  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.post<{ avatar: string }>('/settings/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return apiClient.post<void>('/settings/password/change', {
      oldPassword,
      newPassword,
    });
  }
}

export const SettingsApiService = new SettingsApi();
