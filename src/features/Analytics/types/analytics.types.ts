export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface MonthlyExpenseData {
  month: string;
  income: number;
  expense: number;
}

export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  monthlyExpenses: MonthlyExpenseData[];
}
