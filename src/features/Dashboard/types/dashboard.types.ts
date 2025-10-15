export interface BalanceCard {
  id: string;
  title: string;
  amount: number;
  change: number;
  changePercentage: number;
}

export interface ExpenseBreakdownItem {
  category: string;
  percentage: number;
  amount: number;
  color: string;
  icon: string;
}

export interface MonthlyIncomeExpense {
  month: string;
  income: number;
  expense: number;
}

export interface MonthlyBudgetHealth {
  month: string;
  totalBudget: number;
  totalIncome: number;
  percentageUsed: number;
}

export interface PaymentHistoryItem {
  id: string;
  name: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  category: string;
  icon: string;
  color: string;
  daysAgo: number;
}

export interface SavingGoalAndBudgetGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
  icon: string;
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
export interface WalletSpending {
  walletId: string
  walletName: string;
  walletType: string;
  currency: string;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  color: string;
  icon: string;
}

export interface DashboardData {
  balanceCards: BalanceCard[];
  budgetHealth: BudgetHealthData;
  expenseBreakdown: ExpenseBreakdownItem[];
  monthlyIncomeExpenses: MonthlyIncomeExpense[];
  monthlyBudgetHealth: MonthlyBudgetHealth[];
  savingGoals: SavingGoalAndBudgetGoal[];
  budgetGoals: SavingGoalAndBudgetGoal[];
  transactionHistory: TransactionHistoryItem[];
  paymentsHistory: PaymentHistoryItem[];
  walletSpending: WalletSpending[];
  latestTransactions: TransactionHistoryItem[];
}
