/**
 * Goals API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { Goal, GoalsData } from '../types/goals.types';

class GoalsApi {
  async getGoals(): Promise<Goal[]> {
    return apiClient.get<Goal[]>('/goal');
  }

  async getGoalById(id: string): Promise<Goal> {
    return apiClient.get<Goal>(`/goal/${id}`);
  }

  async saveGoal(data: Goal): Promise<Goal> {
    return apiClient.post<Goal>('/goal/create-update', data);
  }

  async deleteGoal(goalId: string): Promise<void> {
    return apiClient.delete<void>(`/goal/${goalId}`);
  }

  async getAllGoalsData(): Promise<GoalsData> {
    return apiClient.get<GoalsData>('/goal/all');
  }
}

export const GoalsApiService = new GoalsApi();
