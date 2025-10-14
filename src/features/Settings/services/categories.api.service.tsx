/**
 * Settings API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { Category } from '../types/settings.types';

class CategoryApi {
  // Categories
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/category');
  }

  async saveCategory(data: Category): Promise<Category> {
    return apiClient.post<Category>('/category/create-update', data);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    return apiClient.delete<void>(`/category/${categoryId}`);
  }
}

export const CategoryApiService = new CategoryApi();
