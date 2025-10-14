import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { fetchBudgets } from '../redux/budgets.slice';
import BudgetList from '../components/BudgetList';
import BudgetSpendingDetails from '../components/BudgetSpendingDetails';
import { Spinner, Alert } from 'react-bootstrap';

export default function BudgetOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const { budgets, loading, error } = useSelector((state: RootState) => state.budgets);
  const [budgetCategoryId, setBudgetCategoryId] = useState<string>('1');

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  if (loading && budgets.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  console.log('Budgets:', budgets);

  return (
    <div className='space-y-4 pb-6'>
      {error && (
        <Alert variant='danger' dismissible>
          {error}
        </Alert>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-3'>
          {/* Budget Categories */}
          <BudgetList setBudgetCategoryId={setBudgetCategoryId}/>
        </div>

        <div className='lg:col-span-9'>
          {/* Header Section */}
          <BudgetSpendingDetails id={budgetCategoryId}/>
        </div>
      </div>
    </div>
  );
}
