import { useState } from 'react';
import { Plus } from 'lucide-react';
import { budgetsData } from '../utils/budgets.data';
import IconStyle from '../../../components/ui/IconStyle';
import { Link } from 'react-router-dom';

interface IBudgetCategory {
  setBudgetCategoryId: (id: string) => void;
}

export default function BudgetCategory({
  setBudgetCategoryId,
}: IBudgetCategory) {
  const { categories } = budgetsData;
  const [budgetCategory, setBudgetCategory] = useState<string>('1');

  return (
    <div className='space-y-4'>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => {
            setBudgetCategory(category.id);
            setBudgetCategoryId(category.id);
          }}
          className={`
            ${budgetCategory === category.id ? 'bg-green-100' : 'bg-white'}
            rounded-lg p-3 mb-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center'
                style={{ backgroundColor: `${category.color}20` }}
              >
                <IconStyle
                  backgroundColor={category.color}
                  iconName={category.icon}
                  size={18}
                />
              </div>
              <div>
                <p className='text-xs text-slate-600 mb-0.5'>{category.name}</p>
                <p className='text-base font-semibold text-slate-800'>
                  ${category.total.toLocaleString()}
                </p>
              </div>
            </div>
            <span className='text-[10px] text-slate-500'>
              {category.period}
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
