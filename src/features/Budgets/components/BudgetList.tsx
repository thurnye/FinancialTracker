import { useState, useEffect } from 'react';
import { Plus, Inbox } from 'lucide-react';
import { budgetsData } from '../utils/budgets.data';
import IconStyle from '../../../components/ui/IconStyle';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks/app.hooks';

interface IBudgetCategory {
  setBudgetCategoryId: (id: string) => void;
}

export default function BudgetList({
  setBudgetCategoryId,
}: IBudgetCategory) {
  const { budgets, loading, error } = useAppSelector((state) => state.budgets);
  const [budgetCategory, setBudgetCategory] = useState<string>('');

  // Set first budget as selected when budgets load
  useEffect(() => {
    if (budgets.length > 0 && !budgetCategory) {
      setBudgetCategory(budgets[0].id);
      setBudgetCategoryId(budgets[0].id);
    }
  }, [budgets, budgetCategory, setBudgetCategoryId]);

  // Empty state
  if (!loading && budgets.length === 0) {
    return (
      <div className='space-y-4'>
        <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center'>
          <div className='flex justify-center mb-3'>
            <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center'>
              <Inbox size={32} className='text-slate-400' />
            </div>
          </div>
          <h3 className='text-lg font-semibold text-slate-700 mb-2'>No Budgets Yet</h3>
          <p className='text-sm text-slate-500 mb-4'>
            Create your first budget to start tracking your spending
          </p>
          <Link
            to={'../add-budget'}
            className='inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium'
          >
            <Plus size={16} />
            Create Budget
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {budgets.map((budget) => (
        <div
          key={budget.id}
          onClick={() => {
            setBudgetCategory(budget.id);
            setBudgetCategoryId(budget.id);
          }}
          className={`
            ${budgetCategory === budget.id ? 'bg-green-100' : 'bg-white'}
            rounded-lg p-3 mb-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center'
                style={{ backgroundColor: `${budget?.category?.color}20` }}
              >
                <IconStyle
                  backgroundColor={budget?.category?.color}
                  iconName={budget?.category?.icon as keyof typeof import('lucide-react')}
                  size={18}
                />
              </div>
              <div>
                <p className='text-xs text-slate-600 mb-0.5'>{budget.budgetName}</p>
                <p className='text-base font-semibold text-slate-800'>
                  ${budget.budgetAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <span className='text-[10px] text-slate-500'>
              {budget.frequency}
            </span>
          </div>
        </div>
      ))}

      {/* Add New Budget Button */}
      <Link to={'../add-budget'} className='w-full bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600'>
        <Plus size={16} />
        <span className='text-sm font-medium'>Add new Budget</span>
      </Link>
    </div>
  );
}
