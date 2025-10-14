import * as LucideIcons from 'lucide-react';

// Main Budget interface matching backend
export interface Budget {
  id: string;
  userId?: string;
  budgetName: string;
  categoryId?: string | null;
  spendingType: string; // e.g. "Monthly", "Weekly"
  budgetAmount: number;
  date: string;
  paymentMethod?: string | null;
  frequency?: string | null;
  notes?: string | null;
  budgetType?: string | null; // e.g. "Personal", "Business"
  incomeSource?: string | null;
  currency?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
  amountSpent?: number | null;
  isActive: boolean;
  updatedAt?: string | null;
  createdAt?: string | null;
  user?: {
    Id: string;
    FirstName: string;
    LastName: string;
  };

  category?: {
    id: string;
    type: string;
    name: string;
    icon: string;
    color: string;
  };
}

// Legacy interfaces for visualization components
export interface BudgetCategory {
  Id: string;
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
