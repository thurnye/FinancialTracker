import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { fetchCategories } from '../redux/settings.slice';
import AddCategory from '../components/AddCategory';
import CategoryTypeList from '../components/CategoryTypeList';
import { Spinner, Alert } from 'react-bootstrap';
import { CategoryTypes } from '../utils/settings.data';
import { Category } from '../types/settings.types';
import { useAppSelector } from '../../../app/hooks/app.hooks';

export default function SettingsCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useAppSelector((state) => state.settings);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  // Separate categories by type
  const incomeCategories = useMemo(
    () =>
      categories.filter(
        (cat) => cat.type.toLowerCase() === CategoryTypes.Income.toLowerCase()
      ),
    [categories]
  );

  const expenseCategories = useMemo(
    () =>
      categories.filter(
        (cat) => cat.type.toLowerCase() === CategoryTypes.Expense.toLowerCase()
      ),
    [categories]
  );

  if (loading && categories.length === 0) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: '400px' }}
      >
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <div className='space-y-4 pb-6'>
      {error && (
        <Alert variant='danger' dismissible>
          {error}
        </Alert>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-5'>
          {/* Create Category Form */}
          <AddCategory
            editingCategory={editingCategory}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className='lg:col-span-7'>
          {/* Income Categories */}
          <CategoryTypeList
            data={incomeCategories}
            type='Income Categories'
            onEdit={handleEditCategory}
          />

          {/* Expense Categories */}
          <CategoryTypeList
            data={expenseCategories}
            type='Expense Categories'
            onEdit={handleEditCategory}
          />
        </div>
      </div>
    </div>
  );
}
