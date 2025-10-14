/**
 * Settings API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { UserProfile } from '../types/settings.types';

class UserApi {

 

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

export const UserApiService = new UserApi();
