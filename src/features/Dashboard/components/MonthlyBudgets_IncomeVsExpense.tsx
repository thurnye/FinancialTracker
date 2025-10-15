import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import Card from '../../../components/ui/Card';
import { Spinner } from 'react-bootstrap';
import * as LucideIcons from 'lucide-react';
import { LineChartComponent } from '../../../components';

export default function MonthlyBudgets_IncomeVsExpense() {
  const { data } = useSelector((state: RootState) => state.dashboard);

  if (!data || !data.monthlyIncomeExpenses) {
    return (
      <div className='flex justify-center items-center py-6 text-slate-500'>
        <Spinner animation='border' size='sm' className='me-2' />
      </div>
    );
  }

  const { monthlyBudgetHealth, budgetGoals } = data;
  console.log(budgetGoals);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white border border-slate-200 rounded-lg shadow-md p-3 text-xs text-slate-700'>
          <p className='font-semibold text-slate-800 mb-1'>{label}</p>
          <p>
            Total Income:{' '}
            <span className='font-medium'>
              ${data.income?.toLocaleString()}
            </span>
          </p>
          <p>
            Total Budget:{' '}
            <span className='font-medium'>
              ${data.budget?.toLocaleString()}
            </span>
          </p>
          <p>
            Budget Health:{' '}
            <span className='font-medium'>{data.health?.toFixed(1)}%</span>
          </p>
          <p>
            Status:{' '}
            <span
              className={`font-semibold ml-1 ${
                data.status === 'Good'
                  ? 'text-emerald-600'
                  : data.status === 'Overspent'
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}
            >
              {data.status}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
      <Card className='lg:col-span-5'>
        <h3 className='text-base font-semibold text-slate-800 mb-3'>
          Monthly Budgets
        </h3>
        <div className='space-y-3'>
          {budgetGoals.map((budget) => {
            const iconName = budget.icon
              ? budget.icon.charAt(0).toUpperCase() +
                budget.icon
                  .slice(1)
                  .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
              : 'DollarSign';
            const IconComponent =
              (LucideIcons as any)[iconName] || LucideIcons.DollarSign;
            return (
              <div key={budget.id}>
                <div className='flex justify-between items-center mb-1'>
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-8 h-8 rounded-full flex items-center justify-center'
                      style={{ backgroundColor: budget.color + '20' }}
                    >
                      <IconComponent
                        size={16}
                        style={{ color: budget.color }}
                      />
                    </div>
                    <span className='text-xs font-medium text-slate-700'>
                      {budget.name}
                    </span>
                  </div>
                  <span className='text-xs text-slate-600'>
                    ${budget.current} / ${budget.target}
                  </span>
                </div>
                <div className='w-full bg-slate-100 rounded-full h-1.5'>
                  <div
                    className='h-1.5 rounded-full transition-all duration-300'
                    style={{
                      width: `${budget.percentage}%`,
                      backgroundColor: budget.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className='lg:col-span-7'>
        <div className='flex justify-between'>
          <h3 className='text-base font-semibold text-slate-800 mb-3'>
            Budget Health
          </h3>
          <div className='mb-3'>
            {/* <div className='text-2xl font-bold text-slate-800'>
              ${budgetHealth?.value?.toLocaleString()}
            </div> */}
            <p className='text-sm text-emerald-600 mt-1'>
              Last Month: <span className='font-semibold'>+$2,500</span>
            </p>
          </div>
        </div>
        <LineChartComponent
          data={monthlyBudgetHealth as any}
          lines={[
            {
              dataKey: 'health',
              stroke: '#8b5cf6',
              strokeWidth: 2,
              dot: false,
              name: 'Budget Health (%)',
            },
          ]}
          xAxisKey='month'
          height={250}
          showGrid={true}
          showLegend={true}
          customTooltip={<CustomTooltip />}
        />
      </Card>
    </div>
  );
}
