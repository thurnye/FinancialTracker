import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  showPagination?: boolean;
  showFilter?: boolean;
  filterPlaceholder?: string;
  className?: string;
  pageSize?: number;
  pageCount?: number;
  totalItems?: number;
  setPage?: (page: number) => void;
  setLimit?: (limit: number) => void;
}

export default function DataTable<TData>({
  data,
  columns,
  showPagination = true,
  showFilter = false,
  filterPlaceholder = 'Search...',
  className = '',
  pageSize = 10,
  pageCount = 1,
  totalItems,
  setPage,
  setLimit,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState(0); // local pagination index

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handlePrev = () => {
    if (pageIndex > 0) {
      const newPage = pageIndex;
      setPageIndex(pageIndex - 1);
      setPage && setPage(newPage); // inform parent (1-based)
    }
  };

  const handleNext = () => {
    if (pageIndex + 1 < pageCount) {
      const newPage = pageIndex + 2;
      setPageIndex(pageIndex + 1);
      setPage && setPage(newPage);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Global Filter */}
      {showFilter && (
        <div className="mb-4">
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={filterPlaceholder}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-3 px-2 text-xs font-semibold text-slate-600"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex items-center gap-1 cursor-pointer select-none hover:text-slate-900'
                            : 'flex items-center gap-1'
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="inline-flex">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp size={14} />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDown size={14} />
                            ) : (
                              <ChevronsUpDown size={14} className="opacity-40" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-sm text-slate-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row: any, idx: number) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {table.getAllColumns().map((column) => {
                    const cell = table.getRowModel().rows[idx]?.getVisibleCells()?.find(
                      (c) => c.column.id === column.id
                    );
                    return (
                      <td key={column.id} className="py-3 px-2">
                        {cell
                          ? flexRender(column.columnDef.cell, cell.getContext())
                          : null}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Server-side Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            Page {pageIndex + 1} of {pageCount}{' '}
            {totalItems && `(${totalItems} total)`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={pageIndex === 0}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-xs text-slate-600">
              Page {pageIndex + 1}
            </span>
            <button
              onClick={handleNext}
              disabled={pageIndex + 1 >= pageCount}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
