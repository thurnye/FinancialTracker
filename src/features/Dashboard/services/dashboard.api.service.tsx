/**
 * Dashboard API Service
 */

import { apiClient } from '../../../shared/services/apiClient.service';

class DashboardApi {
  async getDashboardData(): Promise<any> {
    return apiClient.get<any>('/dashboard');
  }
}

export const DashboardApiService = new DashboardApi();
