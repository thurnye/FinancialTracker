import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BudgetCategory } from '../types/budgets.types';
import IconSelect from '../../Settings/components/IconSelect';
import ColorSelect from '../../Settings/components/ColorSelect';

interface AddEditBudgetProps {
  onSave?: (budget: Omit<BudgetCategory, 'id' | 'spent' | 'percentage'>) => void;
  onCancel?: () => void;
  isEdit: boolean
}

export default function AddEditBudget({ onSave, onCancel, isEdit }: AddEditBudgetProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Omit<BudgetCategory, 'id' | 'spent' | 'percentage'>>({
    defaultValues: {
      name: '',
      icon: 'Utensils',
      color: '#4f46e5',
      total: 0,
      period: 'Monthly',
    },
  });

  const onSubmit = (data: Omit<BudgetCategory, 'id' | 'spent' | 'percentage'>) => {
    console.log('Budget data:', data);
    if (onSave) {
      onSave(data);
    }
    reset();
  };

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>{isEdit ? 'Update Budget' : 'Create New Budget'}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Budget Name */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Budget Category Name
          </label>
          <input
            type='text'
            {...register('name', {
              required: 'Budget name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
            placeholder='e.g., Food & Dining'
          />
          {errors.name && (
            <p className='text-xs text-red-600 mt-1'>{errors.name.message}</p>
          )}
        </div>

        {/* Budget Amount and Period */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Budget Amount
            </label>
            <input
              type='number'
              step='0.01'
              {...register('total', {
                required: 'Budget amount is required',
                min: {
                  value: 0.01,
                  message: 'Amount must be greater than 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.total
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.total && (
              <p className='text-xs text-red-600 mt-1'>{errors.total.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Period
            </label>
            <select
              {...register('period', { required: 'Period is required' })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.period
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
            >
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Yearly'>Yearly</option>
            </select>
            {errors.period && (
              <p className='text-xs text-red-600 mt-1'>{errors.period.message}</p>
            )}
          </div>
        </div>

        {/* Icon and Color */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            name='icon'
            control={control}
            rules={{ required: 'Icon is required' }}
            render={({ field }) => (
              <IconSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.icon?.message}
              />
            )}
          />

          <Controller
            name='color'
            control={control}
            rules={{ required: 'Color is required' }}
            render={({ field }) => (
              <ColorSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-4'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='flex-1 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            className='flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold'
          >
           {isEdit ? 'Update Budget': 'Create Budget'}
          </button>
        </div>
      </form>
    </div>
  );
}
