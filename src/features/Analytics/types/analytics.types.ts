import * as LucideIcons from 'lucide-react';
export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  color: string;
  icon: keyof typeof LucideIcons;
}

export interface MonthlyExpenseData {
  month: string;
  income: number;
  expense: number;
  saving: number;
}
export interface TransactionItem {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  icon: keyof typeof LucideIcons;
  color: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}


export interface AnalyticsData {
  metrics: AnalyticsMetric[];
  expenseCategories:ExpenseCategory[];
  monthlyExpenses: MonthlyExpenseData[];
  transactions: TransactionItem[];
}
