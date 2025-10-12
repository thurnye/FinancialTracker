import React from 'react';
import { incomeCategories, expenseCategories } from '../utils/settings.data';
import AddCategory from '../components/AddCategory';
import CategoryTypeList from '../components/CategoryTypeList';

export default function SettingsCategory() {
  return (
    <div className='space-y-4 pb-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-5'>
          {/* Create Category Form */}
          <AddCategory />
        </div>

        <div className='lg:col-span-7'>
          {/* Income Categories */}
          <CategoryTypeList data={incomeCategories} type='Income Categories'/>

          {/* Expense Categories */}
          <CategoryTypeList data={expenseCategories} type='Expense Categories'/>
        </div>
      </div>
    </div>
  );
}
