import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/stores/stores';
import { saveGoal } from '../redux/goals.slice';
import { Goal } from '../types/goals.types';

interface AddEditGoalProps {
  editingGoal?: Goal | null;
  onCancelEdit?: () => void;
}

interface GoalFormData {
  goalName: string;
  goalDescription?: string;
  priority?: string;
  progress?: number;
  deadline?: string;
  targetValue?: number;
  targetMetric?: string;
}

export default function AddEditGoal({ editingGoal, onCancelEdit }: AddEditGoalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GoalFormData>({
    defaultValues: {
      goalName: '',
      goalDescription: '',
      priority: 'Medium',
      progress: 0,
      deadline: '',
      targetValue: 0,
      targetMetric: '',
    },
  });

  useEffect(() => {
    if (editingGoal) {
      reset({
        goalName: editingGoal.goalName,
        goalDescription: editingGoal.goalDescription || '',
        priority: editingGoal.priority || 'Medium',
        progress: editingGoal.progress || 0,
        deadline: editingGoal.deadline || '',
        targetValue: editingGoal.targetValue || 0,
        targetMetric: editingGoal.targetMetric || '',
      });
    }
  }, [editingGoal, reset]);

  const onSubmit = async (data: GoalFormData) => {
    try {
      const goalData: Goal = {
        id: editingGoal?.id || '',
        goalName: data.goalName,
        goalDescription: data.goalDescription || null,
        priority: data.priority || null,
        progress: data.progress || 0,
        deadline: data.deadline || null,
        targetValue: data.targetValue || null,
        targetMetric: data.targetMetric || null,
        isActive: true,
      };

      await dispatch(saveGoal(goalData)).unwrap();
      reset();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Failed to save goal:', error);
    }
  };

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        {editingGoal ? 'Update Goal' : 'Create New Goal'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Goal Name */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Goal Name
          </label>
          <input
            type='text'
            {...register('goalName', {
              required: 'Goal name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              errors.goalName
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
            placeholder='e.g., Complete Project X'
          />
          {errors.goalName && (
            <p className='text-xs text-red-600 mt-1'>{errors.goalName.message}</p>
          )}
        </div>

        {/* Goal Description */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Description
          </label>
          <textarea
            {...register('goalDescription')}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            placeholder='Describe your goal...'
            rows={3}
          />
        </div>

        {/* Priority and Progress */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Priority
            </label>
            <select
              {...register('priority')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Progress (%)
            </label>
            <input
              type='number'
              min='0'
              max='100'
              {...register('progress', {
                min: { value: 0, message: 'Progress must be at least 0' },
                max: { value: 100, message: 'Progress cannot exceed 100' },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.progress
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0'
            />
            {errors.progress && (
              <p className='text-xs text-red-600 mt-1'>{errors.progress.message}</p>
            )}
          </div>
        </div>

        {/* Target Value and Metric */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Target Value
            </label>
            <input
              type='number'
              step='0.01'
              {...register('targetValue', {
                min: {
                  value: 0,
                  message: 'Value must be greater than or equal to 0',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.targetValue
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='0.00'
            />
            {errors.targetValue && (
              <p className='text-xs text-red-600 mt-1'>{errors.targetValue.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Target Metric
            </label>
            <input
              type='text'
              {...register('targetMetric')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='e.g., dollars, hours, items'
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Deadline
          </label>
          <input
            type='date'
            {...register('deadline')}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-4'>
          {onCancelEdit && (
            <button
              type='button'
              onClick={onCancelEdit}
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
            {isSubmitting ? 'Saving...' : editingGoal ? 'Update Goal' : 'Create Goal'}
          </button>
        </div>
      </form>
    </div>
  );
}
