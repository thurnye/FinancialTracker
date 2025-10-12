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


export default function IncomeVsExpense() {
     const {
        monthlyBudgets,
        monthlyIncomeExpenses,
      } = dashboardData;

  return (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* Monthly Budgets */}
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Budgets
              </h3>
              <div className='space-y-3'>
                {monthlyBudgets.map((budget) => (
                  <div key={budget.id}>
                    <div className='flex justify-between items-center mb-1'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='w-2 h-2 rounded-full'
                          style={{ backgroundColor: budget.color }}
                        ></div>
                        <span className='text-xs font-medium text-slate-700'>
                          {budget.name}
                        </span>
                      </div>
                      <span className='text-xs text-slate-600'>
                        ${budget.amount} / ${budget.total}
                      </span>
                    </div>
                    <div className='w-full bg-slate-100 rounded-full h-1.5'>
                      <div
                        className='h-1.5 rounded-full transition-all duration-300'
                        style={{
                          width: `${(budget.amount / budget.total) * 100}%`,
                          backgroundColor: budget.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Monthly Income vs Expenses */}
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Income vs Expenses
              </h3>
              <ResponsiveContainer width='100%' height={220}>
                <BarChart data={monthlyIncomeExpenses}>
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
          </div>
  )
}
