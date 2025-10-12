import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { dashboardData } from '../utils/dashboard.data';



export default function MonthlyPayments() {
  const { monthlyExpenses, paymentsHistory } = dashboardData;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {/* Monthly Expenses Chart */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <h3 className='text-base font-semibold text-slate-800 mb-3'>
          Monthly Expenses
        </h3>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
            <XAxis
              dataKey='month'
              stroke='#64748b'
              style={{ fontSize: '10px' }}
            />
            <YAxis stroke='#64748b' style={{ fontSize: '10px' }} />
            <Tooltip />
            <Bar dataKey='income' fill='#3b82f6' radius={[4, 4, 0, 0]} />
            <Bar dataKey='expense' fill='#8b5cf6' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
