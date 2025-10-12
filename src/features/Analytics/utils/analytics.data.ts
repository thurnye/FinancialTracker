import { AnalyticsData } from '../types/analytics.types';

export const analyticsData: AnalyticsData = {
  metrics: [
    { id: '1', label: 'Total Income', value: 4870.34, color: '#4f46e5' },
    { id: '2', label: 'Total Saving', value: 147.69, color: '#10b981' },
    { id: '3', label: 'Total Expenses', value: 354, color: '#f59e0b' },
    { id: '4', label: 'APY', value: 40, color: '#ef4444' },
  ],

  monthlyExpenses: [
    { month: 'Jan', income: 4200, expense: 3800 },
    { month: 'Feb', income: 3800, expense: 4200 },
    { month: 'Mar', income: 5200, expense: 3600 },
    { month: 'Apr', income: 3600, expense: 4800 },
    { month: 'May', income: 4800, expense: 4200 },
    { month: 'Jun', income: 3200, expense: 3800 },
    { month: 'Jul', income: 4600, expense: 4400 },
    { month: 'Aug', income: 4400, expense: 3800 },
    { month: 'Sep', income: 5000, expense: 4600 },
    { month: 'Oct', income: 4000, expense: 4200 },
    { month: 'Nov', income: 4200, expense: 3600 },
    { month: 'Dec', income: 4800, expense: 4000 },
  ],
};
