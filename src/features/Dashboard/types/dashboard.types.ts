export interface BalanceCard {
  id: string;
  title: string;
  amount: number;
  change: number;
  changePercentage: number;
}

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  total: number;
  color: string;
  icon: string;
}

export interface ExpenseBreakdownItem {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface MonthlyIncomeExpense {
  month: string;
  income: number;
  expense: number;
}

export interface PaymentHistoryItem {
  id: string;
  name: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface SavingGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
}

export interface TransactionHistoryItem {
  id: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  icon: string;
  color: string;
}

export interface BudgetHealthData {
  label: string;
  value: number;
}

export interface DashboardData {
  balanceCards: BalanceCard[];
  budgetHealth: BudgetHealthData;
  monthlyBudgets: BudgetItem[];
  expenseBreakdown: ExpenseBreakdownItem[];
  monthlyIncomeExpenses: MonthlyIncomeExpense[];
  monthlyExpenses: MonthlyIncomeExpense[];
  savingGoals: SavingGoal[];
  transactionHistory: TransactionHistoryItem[];
  paymentsHistory: PaymentHistoryItem[];
}
