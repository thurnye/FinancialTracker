import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { budgetsData } from '../utils/budgets.data';
import { useEffect, useState } from 'react';
import { BudgetCategory } from '../types/budgets.types';

interface IBudgetSpendingDetails {
  id: string;
}

export default function BudgetSpendingDetails({ id }: IBudgetSpendingDetails) {
  const { categories, spendingTrend, totalSpent, totalBudget, remaining } =
    budgetsData;
  const [category, setCategory] = useState<BudgetCategory | undefined>();

  useEffect(() => {
    if (id) {
      const foundCategory = categories.find((el) => el.id === id);
      setCategory(foundCategory);
    }
  }, [id, categories]);

  return (
    <>
      {category && (
        <>
          <div className='bg-white rounded-xl p-2 px-4 mb-3 shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{category.name}</h3>
          </div>
          <div className=''>
            {/* <button className='bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors'>
              Manage
            </button> */}
            <div className=' mb-5 bg-white rounded-xl p-4 shadow-lg'>
              <div className='flex justify-between items-start'>
                <div>
                  <p className='text-xs opacity-90'>Spent</p>
                  <h2 className='text-2xl font-bold -mt-2'>
                    ${category.spent.toFixed(2)}
                  </h2>
                </div>
                <div>
                  <p className='text-xs opacity-90 text-end'>Budget</p>
                  <h2 className='text-2xl font-bold -mt-2'>
                    ${category.total.toFixed(2)}
                  </h2>
                </div>
              </div>
              {/* Progress Bar */}
              <div className='relative'>
                <div className='w-full bg-slate-100 rounded-full h-2'>
                  <div
                    className='h-2 rounded-full transition-all duration-300 bg-gradient-to-br from-indigo-600 to-purple-700 '
                    style={{
                      width: `${(category.spent / category.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between items-center mt-1'>
                  <span className='text-[10px] text-slate-600'>
                    {((category.spent / category.total) * 100).toFixed(0)}% used
                  </span>
                  <span className='text-[10px] text-slate-600'>
                    {(100 - (category.spent / category.total) * 100).toFixed(0)}% left
                  </span>
                </div>
              </div>
            </div>

            <div className=' mb-5 bg-white rounded-xl border border-slate-200 p-4  shadow-sm'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70 '>Last Month</p>
                  <p className='text-sm font-semibold'>
                    ${totalBudget.toFixed(2)}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70 '>Spent</p>
                  <p className='text-sm font-semibold'>
                    ${totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-[10px] opacity-70'>Savings</p>
                  <p className='text-sm font-semibold'>
                    ${remaining.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Spending Trend */}
            <div className='bg-white rounded-xl p-4 shadow-sm border border-slate-200'>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Spending Trend
              </h3>
              <ResponsiveContainer width='100%' height={150}>
                <AreaChart data={spendingTrend}>
                  <defs>
                    <linearGradient
                      id='colorAmount'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#8b5cf6' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#8b5cf6' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                  <XAxis
                    dataKey='month'
                    stroke='#64748b'
                    style={{ fontSize: '10px' }}
                  />
                  <YAxis stroke='#64748b' style={{ fontSize: '10px' }} />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='amount'
                    stroke='#8b5cf6'
                    strokeWidth={2}
                    fillOpacity={1}
                    fill='url(#colorAmount)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}
