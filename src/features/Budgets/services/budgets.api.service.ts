/**
 * Budgets API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { Budget, BudgetData } from '../types/budgets.types';

class BudgetsApi {
  async getBudgets(): Promise<Budget[]> {
    return apiClient.get<Budget[]>('/budget');
  }

  async getBudgetById(id: string): Promise<Budget> {
    return apiClient.get<Budget>(`/budget/${id}`);
  }

  async saveBudget(data: Budget): Promise<Budget> {
    return apiClient.post<Budget>('/budget/create-update', data);
  }

  async deleteBudget(budgetId: string): Promise<void> {
    return apiClient.delete<void>(`/budget/${budgetId}`);
  }

  async getAllBudgetData(): Promise<BudgetData> {
    return apiClient.get<BudgetData>('/budget/all');
  }
}

export const BudgetsApiService = new BudgetsApi();
