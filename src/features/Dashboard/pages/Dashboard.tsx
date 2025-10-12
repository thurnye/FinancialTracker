
import BalanceWidgets from '../components/BalanceWidgets';
import BudgetHealthAndExpense from '../components/BudgetHealthAndExpense';
import IncomeVsExpense from '../components/IncomeVsExpense';
import MonthlyPayments from '../components/MonthlyPayments';
import GoalsAndTransactions from '../components/GoalsAndTransactions';

export default function Dashboard() {

  return (
    <div className='space-y-6 pb-6'>
      {/* Balance Cards */}
      <BalanceWidgets/>

      {/* Budget Health & Expense Breakdown */}
      <BudgetHealthAndExpense/>

      {/* Monthly Budgets & Income vs Expenses */}
      <IncomeVsExpense/>

      {/* Monthly Expenses & Payments History */}
      <MonthlyPayments/>

      {/* Saving Goals & Transaction History */}
      <GoalsAndTransactions/>
    </div>
  );
}
