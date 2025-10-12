/**
 * User API Service
 * - Get user profile(s)
 * - Save user profile (create or update)
 * - Upload avatar
 */

import { apiClient } from "../../../shared/services/apiClient.service";
import { IUser } from "../../auth/types/auth.types";

export interface IUserProfileData {
  id?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatar?: string;
}

class UserApiService {
  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<IUser> {
    return apiClient.get<IUser>(`/users/${userId}`);
  }

  /**
   * Get current user profile
   */
  async getCurrentUserProfile(): Promise<IUser> {
    return apiClient.get<IUser>("/users/me");
  }

  /**
   * Save user profile — create if no ID, update if ID exists
   */
  async saveUserProfile(data: IUserProfileData): Promise<IUser> {
    if (data.id) {
      // Update existing user
      return apiClient.put<IUser>(`/users/${data.id}`, data);
    } else {
      // Create new user (for onboarding or admin cases)
      return apiClient.post<IUser>("/users", data);
    }
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append("avatar", file);

    return apiClient.post<{ avatarUrl: string }>("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export const userApiService = new UserApiService();
