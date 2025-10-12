import React from 'react';
import AnalyticsTransactions from './AnalyticsTransactions';
import { analyticsData } from '../utils/analytics.data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AnalyticsExpenses() {
  const { expenseCategories } = analyticsData;

  // Prepare data for Recharts
  const chartData = expenseCategories.map((category) => ({
    name: category.name,
    value: category.percentage,
    amount: category.amount,
    color: category.color,
  }));

  // Custom Tooltip Component
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
          {/* Expenses Breakdown */}
          <div className='lg:col-span-4'>
            <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
              <h3 className='text-base font-bold text-slate-800 mb-4'>
                Expenses Breakdown
              </h3>

              {/* Recharts Pie Chart */}
              <div className='flex justify-center mb-6'>
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey='value'
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <div className='space-y-3'>
                {expenseCategories.map((category) => (
                  <div
                    key={category.id}
                    className='flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors'
                  >
                    <div className='flex items-center gap-2 flex-1'>
                      <div
                        className='w-3 h-3 rounded-sm'
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className='text-xs font-medium text-slate-700'>
                        {category.name}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-xs font-semibold text-slate-800'>
                        ${category.amount}
                      </span>
                      <span className='text-xs font-bold text-slate-900 min-w-[35px] text-right'>
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className='lg:col-span-8'>
            <AnalyticsTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
