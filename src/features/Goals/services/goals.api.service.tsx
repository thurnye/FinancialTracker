/**
 * Goals API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { Goal, GoalsData } from '../types/goals.types';

class GoalsApi {
  async getGoals(): Promise<Goal[]> {
    return apiClient.get<Goal[]>('/goals');
  }

  async saveGoal(data: Goal): Promise<Goal> {
    if (data.id) {
      return apiClient.put<Goal>(`/goals/${data.id}`, data);
    } else {
      return apiClient.post<Goal>('/goals', data);
    }
  }

  async deleteGoal(goalId: string): Promise<void> {
    return apiClient.delete<void>(`/goals/${goalId}`);
  }

  async getAllGoalsData(): Promise<GoalsData> {
    return apiClient.get<GoalsData>('/goals/all');
  }
}

export const GoalsApiService = new GoalsApi();
