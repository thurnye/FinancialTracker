import { dashboardData } from '../utils/dashboard.data';
import Card from '../../../components/ui/Card';
import BarChartComponent from '../../../components/charts/BarChartComponent';



export default function MonthlyPayments() {
  const { monthlyExpenses, paymentsHistory } = dashboardData;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <Card>
        <h3 className='text-base font-semibold text-slate-800 mb-3'>
          Monthly Expenses
        </h3>
        <BarChartComponent
          data={monthlyExpenses as any}
          bars={[
            { dataKey: 'income', fill: '#3b82f6', name: 'Income' },
            { dataKey: 'expense', fill: '#8b5cf6', name: 'Expense' },
          ]}
          xAxisKey='month'
          height={200}
          showGrid={true}
          showLegend={false}
        />
      </Card>

      {/* Payments History */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-base font-semibold text-slate-800'>
            Payments History
          </h3>
          <button className='text-xs text-emerald-600 hover:text-emerald-700 font-medium'>
            See more
          </button>
        </div>
        <div className='space-y-2'>
          {paymentsHistory.map((payment) => (
            <div
              key={payment.id}
              className='flex items-center justify-between py-2 border-b border-slate-100 last:border-0'
            >
              <div>
                <p className='text-xs font-medium text-slate-800'>
                  {payment.name}
                </p>
                <p className='text-[10px] text-slate-500'>{payment.date}</p>
              </div>
              <div className='text-right'>
                <p className='text-xs font-semibold text-emerald-600'>
                  +${payment.amount.toFixed(2)}
                </p>
                <span className='text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full'>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
