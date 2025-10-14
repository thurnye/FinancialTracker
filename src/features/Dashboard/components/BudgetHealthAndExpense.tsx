import { dashboardData } from '../utils/dashboard.data';
import Card from '../../../components/ui/Card';
import LineChartComponent from '../../../components/charts/LineChartComponent';

export default function BudgetHealthAndExpense() {
  const { budgetHealth, expenseBreakdown, monthlyExpenses } = dashboardData;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <Card>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-base font-semibold text-slate-800'>
            Monthly Expenses Breakdown
          </h3>
        </div>
        <div className='space-y-2'>
          {expenseBreakdown.map((item, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center gap-2 flex-1'>
                <div
                  className='w-2 h-2 rounded-full'
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className='text-xs text-slate-700'>{item.category}</span>
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
          ))}
        </div>
      </Card>

      <Card className='lg:col-span-2'>
        <div className='flex justify-between'>
          <h3 className='text-base font-semibold text-slate-800 mb-3'>
            Budget Health
          </h3>
          <div className='mb-3'>
            <div className='text-2xl font-bold text-slate-800'>
              ${budgetHealth.value.toLocaleString()}
            </div>
            <p className='text-sm text-emerald-600 mt-1'>
              Last Month: <span className='font-semibold'>+$2,500</span>
            </p>
          </div>
        </div>
        <LineChartComponent
          data={monthlyExpenses as any}
          lines={[
            { dataKey: 'expense', stroke: '#8b5cf6', strokeWidth: 2, dot: false },
          ]}
          xAxisKey='month'
          height={150}
          showGrid={true}
          showLegend={false}
        />
      </Card>
    </div>
  );
}
