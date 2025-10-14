/**
 * Transaction Data Mappers
 * Maps backend response to frontend types
 */

import { Transaction, BackendPagination, FrontendPagination } from '../types/transaction.types';

/**
 * Backend transaction interface (from API)
 */
interface BackendTransaction {
  id: string;
  userId?: string;
  walletId?: string | null;
  categoryId?: string | null;
  transactionDate: string;
  transactionAmount: number;
  transactionType: string; // 'credit' | 'debit' | 'transfer'
  merchantName?: string | null;
  description?: string | null;
  status?: string | null;
  method?: string | null;
  location?: string | null;
  reference?: string | null;
  currencyCode?: string | null;
  transactionFee?: number | null;
  createdAt?: string;
  updatedAt?: string;
  user?: any;
  wallet?: any;
  category?: {
    id: string;
    type: string;
    name: string;
    icon: string;
    color: string;
  };
}

/**
 * Map backend transaction type to frontend type
 */
function mapTransactionType(backendType: string): 'income' | 'expense' | 'transfer' {
  const typeMap: Record<string, 'income' | 'expense' | 'transfer'> = {
    credit: 'income',
    debit: 'expense',
    transfer: 'transfer',
    income: 'income',
    expense: 'expense',
  };

  return typeMap[backendType.toLowerCase()] || 'expense';
}

/**
 * Map single backend transaction to frontend format
 */
export function mapBackendTransactionToFrontend(
  backendTransaction: BackendTransaction
): Transaction {
  return {
    id: backendTransaction.id,
    userId: backendTransaction.userId,
    walletId: backendTransaction.walletId,
    categoryId: backendTransaction.categoryId,
    type: mapTransactionType(backendTransaction.transactionType),
    amount: backendTransaction.transactionAmount,
    currency: backendTransaction.currencyCode || 'USD',
    description: backendTransaction.description || backendTransaction.merchantName || null,
    date: backendTransaction.transactionDate,
    status: backendTransaction.status,
    paymentMethod: backendTransaction.method,
    reference: backendTransaction.reference,
    notes: backendTransaction.location || null,
    isRecurring: false,
    recurringFrequency: null,
    tags: null,
    attachments: null,
    createdAt: backendTransaction.createdAt,
    updatedAt: backendTransaction.updatedAt,
    wallet: backendTransaction.wallet
      ? {
          id: backendTransaction.wallet.id,
          walletName: backendTransaction.wallet.walletName,
          walletType: backendTransaction.wallet.walletType,
          bankName: backendTransaction.wallet.bankName,
        }
      : undefined,
    category: backendTransaction.category,
  };
}

/**
 * Map array of backend transactions to frontend format
 */
export function mapBackendTransactionsToFrontend(
  backendTransactions: BackendTransaction[]
): Transaction[] {
  return backendTransactions.map(mapBackendTransactionToFrontend);
}

/**
 * Map backend pagination to frontend format
 */
export function mapBackendPaginationToFrontend(
  backendPagination: BackendPagination
): FrontendPagination {
  return {
    currentPage: backendPagination.page,
    pageSize: backendPagination.limit,
    totalItems: backendPagination.total,
    totalPages: backendPagination.totalPages,
    hasNextPage: backendPagination.page < backendPagination.totalPages,
    hasPreviousPage: backendPagination.page > 1,
  };
}

/**
 * Map frontend transaction to backend format for saving
 */
export function mapFrontendTransactionToBackend(
  frontendTransaction: Transaction
): any {
  // Map frontend type to backend type
  const typeMap: Record<string, string> = {
    income: 'credit',
    expense: 'debit',
    transfer: 'transfer',
  };

  return {
    id: frontendTransaction.id || undefined,
    walletId: frontendTransaction.walletId,
    categoryId: frontendTransaction.categoryId,
    transactionDate: frontendTransaction.date,
    transactionAmount: frontendTransaction.amount,
    transactionType: typeMap[frontendTransaction.type] || 'debit',
    description: frontendTransaction.description,
    status: frontendTransaction.status || 'completed',
    method: frontendTransaction.paymentMethod,
    reference: frontendTransaction.reference,
    currencyCode: frontendTransaction.currency || 'USD',
    merchantName: frontendTransaction.description,
  };
}
