import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import Card from '../../../components/ui/Card';
import LineChartComponent from '../../../components/charts/LineChartComponent';
import * as LucideIcons from 'lucide-react';
import { useAppSelector } from '../../../app/hooks/app.hooks';
import { Spinner } from 'react-bootstrap';
import { BarChartComponent } from '../../../components';

export default function BudgetHealthAndExpense() {
  const dashboard = useAppSelector((state) => state.dashboard.data);

  if (!dashboard) {
    return (
      <div className='flex justify-center items-center py-6 text-slate-500'>
        <Spinner animation='border' size='sm' className='me-2' />
      </div>
    );
  }

  const { monthlyIncomeExpenses, expenseBreakdown } = dashboard;

  // console.log('BudgetHealthAndExpense data:', monthlyBudgetHealth);




  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <Card>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-base font-semibold text-slate-800'>
            Monthly Expenses Breakdown
          </h3>
        </div>
        <div className='space-y-2 overflow-y-hidden *:hover:overflow-y-auto max-h-60 pr-1 '>
          {expenseBreakdown?.map((item, index) => {
            // Convert icon name to PascalCase for Lucide icons
            const iconName = item.icon
              ? item.icon.charAt(0).toUpperCase() +
                item.icon
                  .slice(1)
                  .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
              : 'DollarSign';
            const IconComponent =
              (LucideIcons as any)[iconName] || LucideIcons.DollarSign;

            return (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center gap-2 flex-1'>
                  <div
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <IconComponent size={16} style={{ color: item.color }} />
                  </div>
                  <span className='text-xs text-slate-700'>
                    {item.category}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-xs text-slate-600'>
                    ${item.amount.toLocaleString()}
                  </span>
                  <span className='text-xs font-semibold text-slate-800 w-10 text-right'>
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      

      <Card>
        <h3 className='text-base font-semibold text-slate-800 mb-3'>
          Monthly Income vs Expenses
        </h3>
        <BarChartComponent
          data={monthlyIncomeExpenses as any}
          bars={[
            { dataKey: 'income', fill: '#10b981', name: 'Income' },
            { dataKey: 'expense', fill: '#ef4444', name: 'Expense' },
          ]}
          xAxisKey='month'
          height={280}
          showGrid={true}
          showLegend={true}
        />
      </Card>
      
    </div>
  );
}
