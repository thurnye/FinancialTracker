/**
 * Analytics API Service
 * Handles all analytics-related API calls
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { AnalyticsData, AnalyticsMetric, ExpenseCategory, MonthlyExpenseData, TransactionItem } from '../types/analytics.types';

class AnalyticsApiService {
  private readonly basePath = '/analytics';

  async getMetrics(): Promise<AnalyticsMetric[]> {
    return apiClient.get<AnalyticsMetric[]>(`${this.basePath}/metrics`);
  }

  async getExpenseCategories(): Promise<ExpenseCategory[]> {
    return apiClient.get<ExpenseCategory[]>(`${this.basePath}/expense-categories`);
  }

  async getMonthlyExpenses(): Promise<MonthlyExpenseData[]> {
    return apiClient.get<MonthlyExpenseData[]>(`${this.basePath}/monthly-expenses`);
  }

  async getTransactions(): Promise<TransactionItem[]> {
    return apiClient.get<TransactionItem[]>(`${this.basePath}/transactions`);
  }

  async getAllAnalyticsData(): Promise<AnalyticsData> {
    return apiClient.get<AnalyticsData>(`${this.basePath}`);
  }
}

export const analyticsApiService = new AnalyticsApiService();
