// Main Transaction interface matching backend
export interface Transaction {
  id: string;
  userId?: string;
  walletId?: string | null;
  categoryId?: string | null;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency?: string;
  description?: string | null;
  date: string;
  status?: string | null;
  paymentMethod?: string | null;
  reference?: string | null;
  notes?: string | null;
  isRecurring?: boolean;
  recurringFrequency?: string | null;
  tags?: string[] | null;
  attachments?: string[] | null;
  createdAt?: string;
  updatedAt?: string;

  // Relations
  wallet?: {
    id: string;
    walletName: string;
    walletType: string;
    bankName: string;
  };

  category?: {
    id: string;
    type: string;
    name: string;
    icon: string;
    color: string;
  };
}

// Pagination interfaces
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Backend pagination format
export interface BackendPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Frontend pagination format
export interface FrontendPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: FrontendPagination;
}

export interface TransactionFilters extends PaginationParams {
  walletId?: string;
  categoryId?: string;
  type?: 'income' | 'expense' | 'transfer';
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  pagination: FrontendPagination;
  filters: TransactionFilters;
  loading: boolean;
  error: string | null;
}
