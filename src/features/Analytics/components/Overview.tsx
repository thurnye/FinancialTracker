import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { analyticsData } from '../utils/analytics.data';
import IconStyle from '../../../components/ui/IconStyle';

export default function Overview() {
  const { metrics, monthlyExpenses } = analyticsData;

  return (
    <div className='space-y-4 pb-6'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className='grid grid-cols-1 sm:grid-cols-2 bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
          >
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center mb-2'
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <IconStyle
                backgroundColor={`${metric.color}20`}
                iconName={metric.icon}
                size={18}
                color={metric.color}
              />
            </div>
            <div className=''>
              <p className='text-xs text-slate-600 mb-1'>{metric.label}</p>
              <h3 className='text-xl font-bold text-slate-800'>
                ${metric.value.toLocaleString()}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Expenses Chart */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <h3 className='text-base font-bold text-slate-800 mb-4'>
          Monthly Expenses
        </h3>
        <ResponsiveContainer width='100%' height={250}>
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
            <Bar dataKey='saving' fill='#10b981' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
