export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  spent: number;
  total: number;
  percentage: number;
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
