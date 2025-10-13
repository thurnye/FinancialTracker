/**
 * Analytics API Service (Unified Pattern)
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { AnalyticsData } from '../types/analytics.types';

class AnalyticsApi {
  async getAllAnalyticsData(): Promise<AnalyticsData> {
    return apiClient.get<AnalyticsData>('/analytics');
  }
}

export const AnalyticsApiService = new AnalyticsApi();
