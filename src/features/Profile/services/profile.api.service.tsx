/**
 * Profile API Service
 */

import { apiClient } from '../../../shared/services/apiClient.service';

export interface UserProfileData {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  postCode?: string;
  country?: string;
}

class ProfileApi {
  async getProfile(): Promise<UserProfileData> {
    return apiClient.get<UserProfileData>('/profile');
  }

  async updateProfile(data: Partial<UserProfileData>): Promise<UserProfileData> {
    return apiClient.put<UserProfileData>('/profile', data);
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.post<{ avatarUrl: string }>('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async deleteAvatar(): Promise<void> {
    return apiClient.delete<void>('/profile/avatar');
  }
}

export const ProfileApiService = new ProfileApi();
