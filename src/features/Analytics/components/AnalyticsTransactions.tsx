import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { ColumnDef } from '@tanstack/react-table';
import * as LucideIcons from 'lucide-react';
import IconStyle from '../../../components/ui/IconStyle';
import DataTable from '../../../components/ui/DataTable';
import { fetchTransactions } from '../../Transactions/redux/transaction.asyncThunkService';
import { setPage } from '../../Transactions/redux/transaction.slice';
import { Transaction } from '../../Transactions/types/transaction.types';
import { Spinner } from '../../../components/ui';

export default function AnalyticsTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error, pagination, filters } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ page: 1, limit: 20, sortBy: 'date', sortOrder: 'desc' }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchTransactions({ ...filters, page }));
  };

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const typeColors = {
            income: { bg: '#10b98120', color: '#10b981', icon: 'TrendingUp' },
            expense: { bg: '#ef444420', color: '#ef4444', icon: 'TrendingDown' },
            transfer: { bg: '#3b82f620', color: '#3b82f6', icon: 'ArrowLeftRight' },
          };
          const typeConfig = typeColors[row.original.type as keyof typeof typeColors] || typeColors.expense;

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
              <div>
                <p className='text-xs font-medium text-slate-800 capitalize'>
                  {row.original.category?.name || row.original.type}
                </p>
                <p className='text-[10px] text-slate-500 md:hidden'>
                  {new Date(row.original.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        },
        enableSorting: true,
      },
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
        accessorKey: 'description',
        header: 'Description',
        cell: ({ getValue }) => (
          <p className='text-xs text-slate-700'>
            {(getValue() as string) || 'No description'}
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
    ],
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

  if (error) {
    return (
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-base font-bold text-slate-800'>
            Transaction History
          </h3>
        </div>
        <div className='text-center py-8'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-base font-bold text-slate-800'>
            Transaction History
          </h3>
        </div>
        <div className='text-center py-8'>
          <p className='text-sm text-slate-500'>No transactions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-base font-bold text-slate-800'>
          Transaction History
        </h3>
      </div>

      <DataTable
        data={transactions}
        columns={columns}
        showPagination={false}
        pageSize={5}
        showFilter={true}
        filterPlaceholder='Search transactions...'
      />

      {/* Backend pagination controls */}
      {pagination && pagination.totalPages > 0 && (
        <div className='mt-4 pt-4 border-t border-slate-200'>
          <div className='flex justify-between items-center'>
            <p className='text-xs text-slate-600'>
              Showing {transactions.length} of {pagination.totalItems} transactions (Page {pagination.currentPage} of {pagination.totalPages})
            </p>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage || loading}
                className='px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Previous
              </button>
              <span className='text-xs text-slate-600'>
                {pagination.currentPage} / {pagination.totalPages}
              </span>
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
      )}
    </div>
  );
}
