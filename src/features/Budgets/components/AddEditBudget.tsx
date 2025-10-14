import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { saveBudget } from '../redux/budgets.slice';
import { Budget } from '../types/budgets.types';
import CategorySelect from './CategorySelect';
import { Spinner } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks/app.hooks';

interface AddEditBudgetProps {
  editingBudget?: Budget | null;
  onCancelEdit?: () => void;
}

interface BudgetFormData {
  budgetName: string;
  spendingType: string;
  budgetAmount: number;
  date: string;
  paymentMethod?: string;
  frequency?: string;
  notes?: string;
  budgetType?: string;
  incomeSource?: string;
  currency?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  amountSpent?: number;
  categoryId: string;
}

export default function AddEditBudget({
  editingBudget,
  onCancelEdit,
}: AddEditBudgetProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { budgets } = useAppSelector((state) => state.budgets);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
    watch,
  } = useForm<BudgetFormData>({
    defaultValues: {
      budgetName: '',
      categoryId: '',
      spendingType: 'Monthly',
      budgetAmount: 0,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      frequency: 'Monthly',
      notes: '',
      budgetType: 'Personal',
      incomeSource: '',
      currency: 'USD',
      startDate: '',
      endDate: '',
      status: 'Active',
      amountSpent: 0,
    },
  });

  // Load budget from URL params if editing
  useEffect(() => {
    if (id && budgets.length > 0) {
      const foundBudget = budgets.find((b) => b.id === id);
      if (foundBudget) {
        console.log('Found budget to edit:', foundBudget);
        console.log('Budget categoryId:', foundBudget.categoryId);
        setCurrentBudget(foundBudget);
      }
    } else if (editingBudget) {
      setCurrentBudget(editingBudget);
    }
  }, [id, budgets, editingBudget]);

  // Populate form when budget is loaded
  useEffect(() => {
    const  budgetToEdit = currentBudget || editingBudget;
    if (budgetToEdit) {
      console.log('Populating form with budget:', budgetToEdit);

      // Format dates to YYYY-MM-DD for input[type="date"]
      const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '';
        try {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        } catch {
          return '';
        }
      };

      // Extract categoryId from nested object or direct field
      const extractedCategoryId = budgetToEdit.category?.id || budgetToEdit.categoryId || '';

      console.log('Budget category object:', budgetToEdit.category);
      console.log('Budget categoryId field:', budgetToEdit.categoryId);
      console.log('Extracted categoryId:', extractedCategoryId);

      const formData = {
        spendingType: budgetToEdit.spendingType || 'Monthly',
        budgetAmount: budgetToEdit.budgetAmount || 0,
        categoryId: extractedCategoryId,
        date: formatDate(budgetToEdit.date) || new Date().toISOString().split('T')[0],
        budgetName: budgetToEdit.budgetName || '',
        paymentMethod: budgetToEdit.paymentMethod || '',
        frequency: budgetToEdit.frequency || 'Monthly',
        notes: budgetToEdit.notes || '',
        budgetType: budgetToEdit.budgetType || 'Personal',
        incomeSource: budgetToEdit.incomeSource || '',
        currency: budgetToEdit.currency || 'USD',
        startDate: formatDate(budgetToEdit.startDate),
        endDate: formatDate(budgetToEdit.endDate),
        status: budgetToEdit.status || 'Active',
        amountSpent: budgetToEdit.amountSpent || 0,
      };

      console.log('Form data to reset:', formData);
      console.log('CategoryId being set:', formData.categoryId);

      reset(formData);

      // Force set categoryId to ensure it's updated
      setTimeout(() => {
        setValue('categoryId', extractedCategoryId, { shouldValidate: true });
        console.log('Force set categoryId:', extractedCategoryId);
      }, 0);
    }
  }, [currentBudget, editingBudget, reset, setValue]);

  const onSubmit = async (data: BudgetFormData) => {
    try {
      const budgetToEdit = currentBudget || editingBudget;
      const budgetData: Budget = {
        id: budgetToEdit?.id || '',
        budgetName: data.budgetName,
        categoryId: data.categoryId,
        spendingType: data.spendingType,
        budgetAmount: data.budgetAmount,
        date: data.date,
        paymentMethod: data.paymentMethod || null,
        frequency: data.frequency || null,
        notes: data.notes || null,
        budgetType: data.budgetType || null,
        incomeSource: data.incomeSource || null,
        currency: data.currency || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        status: data.status || null,
        amountSpent: data.amountSpent || 0,
        isActive: true,
      };

      await dispatch(saveBudget(budgetData)).unwrap();
      reset();

      // Navigate back or call cancel callback
      if (id) {
        navigate('/budgets/overview');
      } else if (onCancelEdit) {
        onCancelEdit();
      }
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const isEditing = currentBudget || editingBudget || id;
  const watchedCategoryId = watch('categoryId');

  console.log('Current Budget:', currentBudget);
  console.log('Watched categoryId from form:', watchedCategoryId);

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        {isEditing ? 'Update Budget' : 'Create New Budget'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Budget Name
            </label>
            <input
              type='text'
              {...register('budgetName')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='e.g., Travel, Groceries'
            />
          </div>

          <Controller
            key={`category-${currentBudget?.id || 'new'}`}
            name="categoryId"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <CategorySelect
                value={field.value}
                onChange={field.onChange}
                error={errors.categoryId?.message}
              />
            )}
          />
        </div>
        {/* Budget Amount and Spending Type */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Budget Amount
            </label>
            <input
              type='number'
              step='0.01'
              {...register('budgetAmount', {
                required: 'Budget amount is required',
                min: {
                  value: 0.01,
                  message: 'Amount must be greater than 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.budgetAmount
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.budgetAmount && (
              <p className='text-xs text-red-600 mt-1'>
                {errors.budgetAmount.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Spending Type
            </label>
            <select
              {...register('spendingType', {
                required: 'Spending type is required',
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.spendingType
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
            >
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Yearly'>Yearly</option>
            </select>
            {errors.spendingType && (
              <p className='text-xs text-red-600 mt-1'>
                {errors.spendingType.message}
              </p>
            )}
          </div>
        </div>

        {/* Date and Budget Type */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Date
            </label>
            <input
              type='date'
              {...register('date', { required: 'Date is required' })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.date
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
            />
            {errors.date && (
              <p className='text-xs text-red-600 mt-1'>{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Budget Type
            </label>
            <select
              {...register('budgetType')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            >
              <option value='Personal'>Personal</option>
              <option value='Business'>Business</option>
              <option value='Family'>Family</option>
            </select>
          </div>
        </div>

        {/* Payment Method and Frequency */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Payment Method
            </label>
            <input
              type='text'
              {...register('paymentMethod')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='e.g., Credit Card, Cash'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Frequency
            </label>
            <select
              {...register('frequency')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            >
              <option value='One-time'>One-time</option>
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Yearly'>Yearly</option>
            </select>
          </div>
        </div>

        {/* Start and End Date */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Start Date
            </label>
            <input
              type='date'
              {...register('startDate')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              End Date
            </label>
            <input
              type='date'
              {...register('endDate')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>
        </div>

        {/* Currency and Amount Spent */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Currency
            </label>
            <input
              type='text'
              {...register('currency')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='USD'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Amount Spent
            </label>
            <input
              type='number'
              step='0.01'
              {...register('amountSpent', {
                min: {
                  value: 0,
                  message: 'Amount must be at least 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.amountSpent
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.amountSpent && (
              <p className='text-xs text-red-600 mt-1'>
                {errors.amountSpent.message}
              </p>
            )}
          </div>
        </div>

        {/* Status and Income Source */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Status
            </label>
            <select
              {...register('status')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Income Source
            </label>
            <input
              type='text'
              {...register('incomeSource')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='e.g., Salary, Investment'
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Notes
          </label>
          <textarea
            {...register('notes')}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            placeholder='Additional notes...'
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-4'>
          {(onCancelEdit || id) && (
            <button
              type='button'
              onClick={() => {
                if (id) {
                  navigate('/budgets/overview');
                } else if (onCancelEdit) {
                  onCancelEdit();
                }
              }}
              className='flex-1 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            disabled={isSubmitting}
            className='flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold disabled:opacity-50'
          >
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Budget'
              : 'Create Budget'}
          </button>
        </div>
      </form>
    </div>
  );
}
