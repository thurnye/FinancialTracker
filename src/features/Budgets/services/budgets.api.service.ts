/**
 * Budgets API Service (Unified Create/Update)
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { BudgetCategory, BudgetData } from '../types/budgets.types';

class BudgetsApi {
  async getCategories(): Promise<BudgetCategory[]> {
    return apiClient.get<BudgetCategory[]>('/budgets/categories');
  }

  async saveCategory(data: BudgetCategory): Promise<BudgetCategory> {
    if (data.id) {
      return apiClient.put<BudgetCategory>(`/budgets/categories/${data.id}`, data);
    } else {
      return apiClient.post<BudgetCategory>('/budgets/categories', data);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    return apiClient.delete<void>(`/budgets/categories/${categoryId}`);
  }

  async getAllBudgetData(): Promise<BudgetData> {
    return apiClient.get<BudgetData>('/budgets');
  }
}

export const BudgetsApiService = new BudgetsApi();
