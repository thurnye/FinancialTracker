/**
 * Donation API Service
 * - Create or update depending on ID
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { IDonationData } from '../types/donation.types';

class DonationApi {
  /**
   * Get all donations
   */
  async getDonations(): Promise<IDonationData[]> {
    return apiClient.get<IDonationData[]>('/donation');
  }

  /**
   * Save donation — create if no ID, update if ID exists
   */
  async saveDonation(data: IDonationData): Promise<IDonationData> {
    if (data.id) {
      // Update existing
      return apiClient.put<IDonationData>(`/donation/${data.id}`, data);
    } else {
      // Create new
      return apiClient.post<IDonationData>('/donation', data);
    }
  }

  /**
   * Delete donation
   */
  async deleteDonation(donationId: string): Promise<void> {
    return apiClient.delete<void>(`/donation/${donationId}`);
  }
}

export const DonationApiService = new DonationApi();
