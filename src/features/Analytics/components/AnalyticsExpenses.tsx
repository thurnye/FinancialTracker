import React from 'react';
import AnalyticsTransactions from './AnalyticsTransactions';
import { analyticsData } from '../utils/analytics.data';
import Card from '../../../components/ui/Card';
import PieChartComponent from '../../../components/charts/PieChartComponent';

export default function AnalyticsExpenses() {
  const { expenseCategories } = analyticsData;

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
