import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { fetchAnalyticsData } from '../redux/analytics.slice';
import Card from '../../../components/ui/Card';
import BarChartComponent from '../../../components/charts/BarChartComponent';
import IconStyle from '../../../components/ui/IconStyle';
import { Spinner } from '../../../components/ui';

export default function Overview() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
        <p className='text-sm text-red-600'>{error}</p>
      </div>
    );
  }

  if (!data || !data.metrics || !data.monthlyExpenses) return null;

  const { metrics, monthlyExpenses } = data;

  return (
    <div className='space-y-4 pb-6'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className='grid grid-cols-1 sm:grid-cols-2 bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between sm:col-span-2 mb-2'>
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
                {metric.label === 'Category' ? metric.value.toLocaleString() :  `${metric.value.toLocaleString()}`}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <h3 className='text-base font-bold text-slate-800 mb-4'>
          Monthly Expenses
        </h3>
        <BarChartComponent
          data={monthlyExpenses as any}
          bars={[
            { dataKey: 'income', fill: '#3b82f6', name: 'Income' },
            { dataKey: 'expense', fill: '#8b5cf6', name: 'Expense' },
            { dataKey: 'saving', fill: '#10b981', name: 'Saving' },
          ]}
          xAxisKey='month'
          height={250}
          showGrid={true}
          showLegend={true}
        />
      </Card>
    </div>
  );
}
