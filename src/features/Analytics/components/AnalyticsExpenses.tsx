import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import { ColumnDef } from '@tanstack/react-table';
import AnalyticsTransactions from './AnalyticsTransactions';
import Card from '../../../components/ui/Card';
import PieChartComponent from '../../../components/charts/PieChartComponent';
import DataTable from '../../../components/ui/DataTable';
import { ExpenseCategory } from '../types/analytics.types';
import { useAppSelector } from '../../../app/hooks/app.hooks';

export default function AnalyticsExpenses() {
  const { data } = useAppSelector((state) => state.analytics);

  const columns = useMemo<ColumnDef<ExpenseCategory>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-sm'
              style={{ backgroundColor: row.original.color }}
            ></div>
            <span className='text-xs font-medium text-slate-700'>
              {row.original.name}
            </span>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => (
          <span className='text-xs font-semibold text-slate-800'>
            ${(getValue() as number).toLocaleString()}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'percentage',
        header: 'Percentage',
        cell: ({ getValue }) => (
          <span className='text-xs font-bold text-slate-900'>
            {getValue() as number}%
          </span>
        ),
        enableSorting: true,
      },
    ],
    []
  );

  if (!data || !data.expenseCategories) return null;

  const { expenseCategories } = data;

  const chartData = expenseCategories.map((category) => ({
    name: category.name,
    value: category.percentage,
    amount: category.amount,
    color: category.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200'>
          <p className='text-xs font-semibold text-slate-800'>{data.name}</p>
          <p className='text-xs text-slate-600'>Amount: ${data.amount}</p>
          <p className='text-xs text-slate-600'>Percentage: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className='space-y-4 pb-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
          <div className='lg:col-span-4'>
            <Card>
              <h3 className='text-base font-bold text-slate-800 mb-4'>
                Expenses Breakdown
              </h3>

              <div className='flex justify-center mb-6'>
                <PieChartComponent
                  data={chartData}
                  height={200}
                  width={200}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  showLegend={false}
                  customTooltip={<CustomTooltip />}
                />
              </div>

              <DataTable
                data={expenseCategories}
                columns={columns}
                showPagination={false}
                showFilter={false}
              />
            </Card>
          </div>

          <div className='lg:col-span-8'>
            <AnalyticsTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
