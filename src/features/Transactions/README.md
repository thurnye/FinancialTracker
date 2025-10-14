# Transactions Feature

A complete transaction management system with pagination, filtering, and wallet-specific queries.

## Features

- ✅ Fetch all transactions with pagination (default: 20 per page)
- ✅ Fetch transactions by wallet ID
- ✅ Advanced filtering (date range, amount range, type, category, search)
- ✅ Sorting support
- ✅ Create, update, and delete transactions
- ✅ Transaction statistics
- ✅ Redux state management
- ✅ Backend-frontend data mapping
- ✅ TypeScript support

## Quick Start

### 1. Using Redux Directly (Recommended - Simple Pattern)

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/stores/stores';
import { fetchTransactions } from '@/features/Transactions/redux/transaction.asyncThunkService';
import { setPage } from '@/features/Transactions/redux/transaction.slice';

function MyComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, pagination, filters, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchTransactions({ ...filters, page }));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {transactions.map((tx) => (
        <div key={tx.id}>{tx.description} - ${tx.amount}</div>
      ))}

      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPreviousPage}
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
```

### 2. Wallet-Specific Transactions

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/stores/stores';
import { fetchTransactionsByWallet } from '@/features/Transactions/redux/transaction.asyncThunkService';

function WalletTransactions({ walletId }: { walletId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (walletId) {
      dispatch(fetchTransactionsByWallet({
        walletId,
        filters: { page: 1, limit: 20 }
      }));
    }
  }, [dispatch, walletId]);

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>{tx.description}</div>
      ))}
    </div>
  );
}
```

### 3. Using the Pre-built Component

```tsx
import { TransactionsList } from '@/features/Transactions';

function MyPage() {
  return (
    <div>
      {/* All transactions */}
      <TransactionsList />

      {/* Wallet-specific transactions */}
      <TransactionsList walletId="wallet-123" />
    </div>
  );
}
```

## API Reference

### Redux Actions

#### `fetchTransactions(filters)`
Async thunk to fetch transactions with pagination.

```tsx
dispatch(fetchTransactions({
  page: 1,
  limit: 20,
  sortBy: 'date',
  sortOrder: 'desc',
}));
```

#### `fetchTransactionsByWallet({ walletId, filters })`
Async thunk to fetch wallet-specific transactions.

```tsx
dispatch(fetchTransactionsByWallet({
  walletId: 'wallet-123',
  filters: { page: 1, limit: 20 }
}));
```

#### `fetchTransactionById(id)`
Async thunk to fetch a single transaction.

#### `saveTransaction(data)`
Async thunk to create or update a transaction.

#### `deleteTransaction(id)`
Async thunk to delete a transaction.

#### Redux Slice Actions

```tsx
import { setPage, setLimit, setFilters, resetFilters, clearError } from './transaction.slice';

dispatch(setPage(2));
dispatch(setLimit(50));
dispatch(setFilters({ type: 'expense', startDate: '2024-01-01' }));
dispatch(resetFilters());
dispatch(clearError());
```

### API Service

#### `TransactionApiService.getTransactions(filters?)`
Fetch transactions with pagination and filters.

```tsx
const response = await TransactionApiService.getTransactions({
  page: 1,
  limit: 20,
  sortBy: 'date',
  sortOrder: 'desc',
  type: 'expense',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
});
```

#### `TransactionApiService.getTransactionsByWallet(walletId, filters?)`
Fetch transactions for a specific wallet.

```tsx
const response = await TransactionApiService.getTransactionsByWallet(
  'wallet-123',
  { page: 1, limit: 20 }
);
```

#### `TransactionApiService.saveTransaction(data)`
Create or update a transaction.

```tsx
const transaction = await TransactionApiService.saveTransaction({
  id: 'tx-123', // optional for create
  type: 'expense',
  amount: 50.00,
  description: 'Grocery shopping',
  date: '2024-01-15',
  walletId: 'wallet-123',
  categoryId: 'cat-456',
});
```

#### `TransactionApiService.deleteTransaction(id)`
Delete a transaction.

```tsx
await TransactionApiService.deleteTransaction('tx-123');
```

#### `TransactionApiService.getTransactionStats(filters?)`
Get transaction statistics.

```tsx
const stats = await TransactionApiService.getTransactionStats({
  walletId: 'wallet-123',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
});
// Returns: { totalIncome, totalExpenses, totalTransactions, netAmount }
```

## Filter Options

```tsx
interface TransactionFilters {
  // Pagination
  page?: number;
  limit?: number;

  // Sorting
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';

  // Filters
  walletId?: string;
  categoryId?: string;
  type?: 'income' | 'expense' | 'transfer';
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}
```

## Backend API Endpoints Expected

The frontend expects these backend endpoints:

```
GET    /api/transaction?page=1&limit=20&walletId=xxx
GET    /api/transaction/:id
POST   /api/transaction/create-update
DELETE /api/transaction/:id
GET    /api/transaction/stats?walletId=xxx
```

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sortBy` - Field to sort by (e.g., 'date', 'amount')
- `sortOrder` - 'asc' or 'desc' (default: 'desc')
- `walletId` - Filter by wallet ID
- `categoryId` - Filter by category ID
- `type` - Filter by type: 'income', 'expense', 'transfer'
- `startDate` - Filter transactions from this date
- `endDate` - Filter transactions to this date
- `minAmount` - Minimum transaction amount
- `maxAmount` - Maximum transaction amount
- `search` - Search in description/notes

### Response Format

```json
{
  "data": [
    {
      "id": "tx-123",
      "type": "expense",
      "amount": 50.00,
      "description": "Grocery shopping",
      "date": "2024-01-15T10:30:00Z",
      "walletId": "wallet-123",
      "categoryId": "cat-456",
      "wallet": {
        "id": "wallet-123",
        "walletName": "Main Checking",
        "walletType": "Bank",
        "bankName": "Chase"
      },
      "category": {
        "id": "cat-456",
        "name": "Groceries",
        "icon": "ShoppingCart",
        "color": "#10b981"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Examples

### Example 1: Basic Transaction List with Pagination

```tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/stores/stores';
import { fetchTransactions } from '@/features/Transactions/redux/transaction.asyncThunkService';
import { setPage } from '@/features/Transactions/redux/transaction.slice';

function TransactionsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, pagination, filters, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchTransactions({ ...filters, page }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>
          <h3>{tx.description}</h3>
          <p>${tx.amount}</p>
          <p>{new Date(tx.date).toLocaleDateString()}</p>
        </div>
      ))}

      <div>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
        >
          Previous
        </button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Example 2: Delete Transaction

```tsx
import { deleteTransaction, fetchTransactions } from '@/features/Transactions/redux/transaction.asyncThunkService';
import { toast } from 'sonner';

function TransactionItem({ transaction }) {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.transactions);

  const handleDelete = async () => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await dispatch(deleteTransaction(transaction.id)).unwrap();
        toast.success('Transaction deleted!');
        dispatch(fetchTransactions(filters)); // Reload
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete');
      }
    }
  };

  return (
    <div>
      <p>{transaction.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

## State Structure

```tsx
interface TransactionsState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: TransactionFilters;
  loading: boolean;
  error: string | null;
}
```

## Notes

- Default page size is 20 transactions
- Transactions are sorted by date (newest first) by default
- All amounts should be positive numbers; the type field indicates income/expense
- The backend should handle pagination and return the proper format
- Currency defaults to 'USD' if not specified
