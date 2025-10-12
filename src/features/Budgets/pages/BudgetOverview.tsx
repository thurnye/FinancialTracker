import { useState } from 'react';
import BudgetCategory from '../components/BudgetCategory';
import BudgetSpendingDetails from '../components/BudgetSpendingDetails';

export default function BudgetOverview() {
  const [budgetCategoryId, setBudgetCategoryId] = useState<string>('1');

  return (
    <div className='space-y-4 pb-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-3'>
          {/* Budget Categories */}
          <BudgetCategory setBudgetCategoryId={setBudgetCategoryId}/>
        </div>

        <div className='lg:col-span-9'>
          {/* Header Section */}
          <BudgetSpendingDetails id={budgetCategoryId}/>
        </div>
      </div>
    </div>
  );
}
