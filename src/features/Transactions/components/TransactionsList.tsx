import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { ColumnDef } from '@tanstack/react-table';
import * as LucideIcons from 'lucide-react';
import { fetchTransactions, fetchTransactionsByWallet, deleteTransaction } from '../redux/transaction.asyncThunkService';
import { setPage, setLimit, clearError } from '../redux/transaction.slice';
import { Transaction } from '../types/transaction.types';
import DataTable from '../../../components/ui/DataTable';
import IconStyle from '../../../components/ui/IconStyle';
import { Spinner } from '../../../components/ui';
import { toast } from 'sonner';

interface TransactionsListProps {
  walletId?: string;
}

export default function TransactionsList({ walletId }: TransactionsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, pagination, filters, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (walletId) {
      dispatch(fetchTransactionsByWallet({ walletId, filters: { page: 1, limit: 20 } }));
    } else {
      dispatch(fetchTransactions({ page: 1, limit: 20 }));
    }
  }, [dispatch, walletId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    if (walletId) {
      dispatch(fetchTransactionsByWallet({ walletId, filters: { ...filters, page } }));
    } else {
      dispatch(fetchTransactions({ ...filters, page }));
    }
  };

  const handlePageSizeChange = (limit: number) => {
    dispatch(setLimit(limit));
    if (walletId) {
      dispatch(fetchTransactionsByWallet({ walletId, filters: { ...filters, limit, page: 1 } }));
    } else {
      dispatch(fetchTransactions({ ...filters, limit, page: 1 }));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await dispatch(deleteTransaction(id)).unwrap();
        toast.success('Transaction deleted successfully!');
        // Reload transactions
        if (walletId) {
          dispatch(fetchTransactionsByWallet({ walletId, filters }));
        } else {
          dispatch(fetchTransactions(filters));
        }
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete transaction');
      }
    }
  };

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return (
            <p className='text-xs text-slate-600'>
              {date.toLocaleDateString()}
            </p>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const typeColors = {
            income: { bg: '#10b98120', color: '#10b981', icon: 'TrendingUp' },
            expense: { bg: '#ef444420', color: '#ef4444', icon: 'TrendingDown' },
            transfer: { bg: '#3b82f620', color: '#3b82f6', icon: 'ArrowLeftRight' },
          };
          const typeConfig = typeColors[row.original.type as keyof typeof typeColors];

          return (
            <div className='flex items-center gap-2'>
              <div
                className='w-8 h-8 rounded-full flex items-center justify-center'
                style={{ backgroundColor: typeConfig.bg }}
              >
                <IconStyle
                  backgroundColor={typeConfig.bg}
                  iconName={typeConfig.icon as keyof typeof LucideIcons}
                  size={15}
                  color={typeConfig.color}
                />
              </div>
              <p className='text-xs font-medium text-slate-800 capitalize'>
                {row.original.type}
              </p>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ getValue, row }) => (
          <div>
            <p className='text-xs text-slate-700 font-medium'>
              {getValue() as string || 'No description'}
            </p>
            {row.original.category && (
              <p className='text-[10px] text-slate-500'>
                {row.original.category.name}
              </p>
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'wallet',
        header: 'Wallet',
        cell: ({ row }) => (
          <p className='text-xs text-slate-600'>
            {row.original.wallet?.walletName || 'N/A'}
          </p>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <div className='flex items-center justify-end gap-2'>
            <p
              className={`text-xs font-semibold ${
                row.original.type === 'income'
                  ? 'text-emerald-600'
                  : row.original.type === 'expense'
                  ? 'text-red-600'
                  : 'text-slate-800'
              }`}
            >
              {row.original.type === 'income' ? '+' : row.original.type === 'expense' ? '-' : ''}
              ${Math.abs(row.original.amount).toFixed(2)}
            </p>
            <span className='text-[10px] text-slate-500'>
              {row.original.currency || 'USD'}
            </span>
          </div>
        ),
        enableSorting: true,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => handleDelete(row.original.id)}
              className='text-xs text-red-600 hover:text-red-800 font-medium'
            >
              Delete
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  if (loading && (!transactions || transactions.length === 0)) {
    return (
      <div className='bg-white rounded-lg p-8 shadow-sm border border-slate-200 text-center'>
        <Spinner />
        <p className='text-sm text-slate-500 mt-4'>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h3 className='text-base font-bold text-slate-800'>
            {walletId ? 'Wallet Transactions' : 'All Transactions'}
          </h3>
          <p className='text-xs text-slate-500'>
            Showing {pagination.totalItems} total transactions
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <select
            value={filters.limit}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className='text-xs border border-slate-300 rounded-lg px-2 py-1'
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>

      <DataTable
        data={transactions}
        columns={columns}
        showPagination={true}
        pageSize={filters.limit || 20}
        showFilter={true}
        filterPlaceholder='Search transactions...'
      />

      {/* Custom Pagination Info */}
      <div className='mt-4 pt-4 border-t border-slate-200'>
        <div className='flex justify-between items-center'>
          <p className='text-xs text-slate-600'>
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPreviousPage || loading}
              className='px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage || loading}
              className='px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className='absolute inset-0 bg-white/50 flex items-center justify-center'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
