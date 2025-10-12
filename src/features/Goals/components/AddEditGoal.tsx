import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Goal } from '../types/goals.types';
import IconSelect from '../../Settings/components/IconSelect';
import ColorSelect from '../../Settings/components/ColorSelect';

interface AddEditGoalProps {
  onSave?: (goal: Omit<Goal, 'id' | 'saved' | 'percentage'>) => void;
  onCancel?: () => void;
  isEdit: boolean
}

export default function AddEditGoal({ onSave, onCancel, isEdit }: AddEditGoalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Omit<Goal, 'id' | 'saved' | 'percentage'>>({
    defaultValues: {
      name: '',
      target: 0,
      monthly: 0,
      deadline: '',
      icon: 'Target',
      color: '#4f46e5',
    },
  });

  const onSubmit = (data: Omit<Goal, 'id' | 'saved' | 'percentage'>) => {
    console.log('Goal data:', data);
    if (onSave) {
      onSave(data);
    }
    reset();
  };

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>{isEdit ? 'Update Goal' : 'Create New Goal'}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Goal Name */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Goal Name
          </label>
          <input
            type='text'
            {...register('name', {
              required: 'Goal name is required',
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
            placeholder='e.g., New Car'
          />
          {errors.name && (
            <p className='text-xs text-red-600 mt-1'>{errors.name.message}</p>
          )}
        </div>

        {/* Target Amount and Monthly Contribution */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Target Amount
            </label>
            <input
              type='number'
              step='0.01'
              {...register('target', {
                required: 'Target amount is required',
                min: {
                  value: 0.01,
                  message: 'Amount must be greater than 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.target
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.target && (
              <p className='text-xs text-red-600 mt-1'>{errors.target.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Monthly Contribution
            </label>
            <input
              type='number'
              step='0.01'
              {...register('monthly', {
                required: 'Monthly contribution is required',
                min: {
                  value: 0.01,
                  message: 'Amount must be greater than 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.monthly
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.monthly && (
              <p className='text-xs text-red-600 mt-1'>{errors.monthly.message}</p>
            )}
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Deadline
          </label>
          <input
            type='text'
            {...register('deadline', {
              required: 'Deadline is required',
              pattern: {
                value: /^[A-Za-z]+ \d{4}$/,
                message: 'Format should be "Month Year" (e.g., June 2025)',
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              errors.deadline
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
            placeholder='e.g., June 2025'
          />
          {errors.deadline && (
            <p className='text-xs text-red-600 mt-1'>{errors.deadline.message}</p>
          )}
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
           {isEdit ? 'Save Update' : 'Create Goal'}
          </button>
        </div>
      </form>
    </div>
  );
}
