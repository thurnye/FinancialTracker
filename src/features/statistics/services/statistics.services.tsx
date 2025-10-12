/**
 * Statistics API Service (Simplified)
 * - Get donations amount per category
 */

import { apiClient } from '../../../shared/services/apiClient.service';

export interface IDonationCategoryStat {
  category: string;
  totalAmount: number;
}

class StatisticsApi {
  /**
   * Get total donation amount per category
   */
  async getDonationsPerCategory(): Promise<IDonationCategoryStat[]> {
    return apiClient.get<IDonationCategoryStat[]>('/statistics');
  }
}

export const StatisticsApiService = new StatisticsApi();
