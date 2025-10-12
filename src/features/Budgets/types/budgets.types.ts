import * as LucideIcons from 'lucide-react';
export interface BudgetCategory {
  id: string;
  name: string;
  icon: keyof typeof LucideIcons;
  color: string;
  spent: number;
  total: number;
  percentage: number;
  period: string;
}

export interface SpendingTrendData {
  month: string;
  amount: number;
}

export interface BudgetData {
  categories: BudgetCategory[];
  spendingTrend: SpendingTrendData[];
  totalBudget: number;
  totalSpent: number;
  remaining: number;
}
