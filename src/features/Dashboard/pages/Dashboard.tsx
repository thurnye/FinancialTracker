import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/stores/stores';
import { fetchDashboardData } from '../redux/dashboard.asyncThunkService';
import BalanceWidgets from '../components/BalanceWidgets';
import BudgetHealthAndExpense from '../components/BudgetHealthAndExpense';
import MonthlyBudgets_IncomeVsExpense from '../components/MonthlyBudgets_IncomeVsExpense';
import MonthlyPayments from '../components/MonthlyPayments';
import GoalsAndTransactions from '../components/GoalsAndTransactions';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className='space-y-6 pb-6'>
      {/* Balance Cards */}
      <BalanceWidgets />

      {/* Budget Health & Expense Breakdown */}
      <BudgetHealthAndExpense />

      {/* Monthly Budgets & Income vs Expenses */}
      <MonthlyBudgets_IncomeVsExpense/>

      {/* Monthly Expenses & Payments History */}
      <MonthlyPayments />

      {/* Saving Goals & Transaction History */}
      <GoalsAndTransactions />
    </div>
  );
}
