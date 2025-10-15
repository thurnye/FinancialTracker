/**
 * Transaction API Service
 * Handles all transaction-related API calls with pagination support
 */

import { apiClient } from '../../../shared/services/apiClient.service';
import { ApiResponse } from '../../../shared/types/api.types';
import {
  Transaction,
  PaginatedResponse,
  TransactionFilters,
} from '../types/transaction.types';
import {
  mapBackendTransactionsToFrontend,
  mapBackendTransactionToFrontend,
  mapBackendPaginationToFrontend,
} from '../utils/transaction.mapper';

class TransactionApi {
  /**
   * Get all transactions with pagination and filters
   * @param filters - Optional filters including page, limit, walletId, etc.
   * @returns Paginated transaction response
   */
  async getTransactions(
    filters?: TransactionFilters
  ): Promise<PaginatedResponse<Transaction>> {
    const params = new URLSearchParams();

    // Pagination params
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    // Sorting params
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    // Filter params
    if (filters?.walletId) params.append('walletId', filters.walletId);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.minAmount !== undefined)
      params.append('minAmount', filters.minAmount.toString());
    if (filters?.maxAmount !== undefined)
      params.append('maxAmount', filters.maxAmount.toString());
    if (filters?.searchQuery) params.append('search', filters.searchQuery);

    const queryString = params.toString();
    const url = queryString ? `/transaction?${queryString}` : '/transaction';

    // Use getClient() to get the full axios response with metadata
    const axiosResponse = await apiClient.getClient().get<ApiResponse<any[]>>(url);
    const response = axiosResponse.data;

    // Backend returns: { data: [...], meta: { pagination: {...} } }
    // Map the transactions and pagination
    const transactions = Array.isArray(response.data) ? response.data : [];
    const paginationMeta = response.meta?.pagination;

    if (paginationMeta) {
      // Has pagination metadata
      return {
        data: mapBackendTransactionsToFrontend(transactions),
        pagination: mapBackendPaginationToFrontend(paginationMeta),
      };
    } else {
      // No pagination metadata - return what we have
      return {
        data: mapBackendTransactionsToFrontend(transactions),
        pagination: {
          currentPage: filters?.page || 1,
          pageSize: filters?.limit || 20,
          totalItems: transactions.length,
          totalPages: Math.ceil(transactions.length / (filters?.limit || 20)),
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
  }

  /**
   * Get transactions by wallet ID with pagination
   * @param walletId - The wallet ID to filter by
   * @param filters - Optional pagination and filter params
   * @returns Paginated transaction response
   */
  async getTransactionsByWallet(
    walletId: string,
    filters?: TransactionFilters
  ): Promise<PaginatedResponse<Transaction>> {
    return this.getTransactions({ ...filters, walletId });
  }

  /**
   * Get a single transaction by ID
   * @param id - Transaction ID
   * @returns Transaction details
   */
  async getTransactionById(id: string): Promise<Transaction> {
    const backendTransaction = await apiClient.get<any>(`/transaction/${id}`);
    return mapBackendTransactionToFrontend(backendTransaction);
  }

  /**
   * Create or update a transaction
   * @param data - Transaction data
   * @returns Created/updated transaction
   */
  async saveTransaction(data: Transaction): Promise<Transaction> {
    const backendTransaction = await apiClient.post<any>('/transaction/create-update', data);
    return mapBackendTransactionToFrontend(backendTransaction);
  }

  /**
   * Delete a transaction
   * @param transactionId - ID of transaction to delete
   */
  async deleteTransaction(transactionId: string): Promise<void> {
    return apiClient.delete<void>(`/transaction/${transactionId}`);
  }

  /**
   * Get transaction statistics
   * @param filters - Optional filters for statistics
   * @returns Transaction statistics
   */
  async getTransactionStats(filters?: {
    walletId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    netAmount: number;
  }> {
    const params = new URLSearchParams();
    if (filters?.walletId) params.append('walletId', filters.walletId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const queryString = params.toString();
    const url = queryString
      ? `/transaction/stats?${queryString}`
      : '/transaction/stats';

    return apiClient.get(url);
  }
}

export const TransactionApiService = new TransactionApi();
