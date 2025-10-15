/**
 * Dashboard API Service
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { DashboardData } from '../types/dashboard.types';

class DashboardApi {
  async getDashboardData(): Promise<DashboardData> {
    return apiClient.get<DashboardData>('/Analytics/dashboard');
  }
}

export const DashboardApiService = new DashboardApi();
