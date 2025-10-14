import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AppDispatch } from '../../../app/stores/stores';
import { saveGoal } from '../redux/goals.slice';
import { Goal } from '../types/goals.types';
import { useAppSelector } from '../../../app/hooks/app.hooks';
import CategorySelect from '../../Budgets/components/CategorySelect';
import { ErrorDialog, StringArrayInput } from '../../../components';

interface AddEditGoalProps {
  editingGoal?: Goal | null;
  onCancelEdit?: () => void;
}

interface GoalFormData {
  categoryId?: string;
  goalName: string;
  goalDescription?: string;
  priority?: string;
  progress?: number;
  deadline?: string;
  startDate?: string;
  targetMetric?: string;
  targetValue?: number;
  targetDate?: string;
  successCriteria?: string;
  actions?: string[];
  resourcesNeeded?: string[];
  obstacles?: string;
  milestones?: string[];
}

export default function AddEditGoal({
  editingGoal,
  onCancelEdit,
}: AddEditGoalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { goals } = useAppSelector((state) => state.goals);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GoalFormData>({
    defaultValues: {
      categoryId: '',
      goalName: '',
      goalDescription: '',
      priority: 'Medium',
      progress: 0,
      deadline: '',
      startDate: '',
      targetMetric: '',
      targetValue: 0,
      targetDate: '',
      successCriteria: '',
      actions: [],
      resourcesNeeded: [],
      obstacles: '',
      milestones: [],
    },
  });

  // Load goal from URL params if editing
  useEffect(() => {
    if (id && goals.length > 0) {
      const foundGoal = goals.find((g) => g.id === id);
      if (foundGoal) {
        // console.log('Found goal to edit:', foundGoal);
        setCurrentGoal(foundGoal);
      }
    } else if (editingGoal) {
      setCurrentGoal(editingGoal);
    }
  }, [id, goals, editingGoal]);

  // Populate form when goal is loaded
  useEffect(() => {
    const goalToEdit = currentGoal || editingGoal;
    if (goalToEdit) {
      // console.log('Populating form with goal:', goalToEdit);

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

      const formData = {
        categoryId: goalToEdit.categoryId || '',
        goalName: goalToEdit.goalName,
        goalDescription: goalToEdit.goalDescription || '',
        priority: goalToEdit.priority || 'Medium',
        progress: goalToEdit.progress || 0,
        deadline: formatDate(goalToEdit.deadline),
        startDate: formatDate(goalToEdit.startDate),
        targetMetric: goalToEdit.targetMetric || '',
        targetValue: goalToEdit.targetValue || 0,
        targetDate: formatDate(goalToEdit.targetDate),
        successCriteria: goalToEdit.successCriteria || '',
        actions: goalToEdit.actions || [],
        resourcesNeeded: goalToEdit.resourcesNeeded || [],
        obstacles: goalToEdit.obstacles || '',
        milestones: goalToEdit.milestones || [],
      };

      // console.log('Form data to reset:', formData);
      reset(formData);
    }
  }, [currentGoal, editingGoal, reset]);

  const onSubmit = async (data: GoalFormData) => {
    try {
      const goalToEdit = currentGoal || editingGoal;
      const goalData: Goal = {
        id: goalToEdit?.id || '',
        categoryId: data.categoryId || null,
        goalName: data.goalName,
        goalDescription: data.goalDescription || null,
        priority: data.priority || null,
        progress: data.progress || 0,
        deadline: data.deadline || null,
        startDate: data.startDate || null,
        targetMetric: data.targetMetric || null,
        targetValue: data.targetValue || null,
        targetDate: data.targetDate || null,
        successCriteria: data.successCriteria || null,
        actions: data.actions && data.actions.length > 0 ? data.actions : null,
        resourcesNeeded:
          data.resourcesNeeded && data.resourcesNeeded.length > 0
            ? data.resourcesNeeded
            : null,
        obstacles: data.obstacles || null,
        milestones:
          data.milestones && data.milestones.length > 0
            ? data.milestones
            : null,
        isActive: true,
      };

      await dispatch(saveGoal(goalData)).unwrap();

      // Show success toast
      toast.success(
        goalToEdit?.id
          ? 'Goal updated successfully!'
          : 'Goal created successfully!'
      );

      reset();

      // Navigate back or call cancel callback
      if (id) {
        navigate('/goals/overview');
      } else if (onCancelEdit) {
        onCancelEdit();
      }
    } catch (error: any) {
      console.error('Failed to save goal:', error);
      setErrorMessage('Failed to save goal. Please try again.');
      setErrorDetails(error?.message || JSON.stringify(error, null, 2));
      setShowErrorDialog(true);
    }
  };

  const isEditing = currentGoal || editingGoal || id;

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        {isEditing ? 'Update Goal' : 'Create New Goal'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
              <p className='text-xs text-red-600 mt-1'>
                {errors.goalName.message}
              </p>
            )}
          </div>
          {/* Category */}
          <div>
            <Controller
              name='categoryId'
              control={control}
              render={({ field }) => (
                <CategorySelect
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={errors.categoryId?.message}
                />
              )}
            />
          </div>
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
              <p className='text-xs text-red-600 mt-1'>
                {errors.progress.message}
              </p>
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
              <p className='text-xs text-red-600 mt-1'>
                {errors.targetValue.message}
              </p>
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

        {/* Date Fields */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
              Target Date
            </label>
            <input
              type='date'
              {...register('targetDate')}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            />
          </div>

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
        </div>

        {/* Success Criteria */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Success Criteria
          </label>
          <textarea
            {...register('successCriteria')}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            placeholder='Define what success looks like...'
            rows={2}
          />
        </div>

        {/* Actions */}
        <div>
          <Controller
            name='actions'
            control={control}
            render={({ field }) => (
              <StringArrayInput
                label='Actions'
                values={field.value || []}
                onChange={field.onChange}
                placeholder='What actions will you take to achieve this goal?'
                maxWords={50}
                error={errors.actions?.message}
              />
            )}
          />
        </div>

        {/* Resources Needed */}
        <div>
          <Controller
            name='resourcesNeeded'
            control={control}
            render={({ field }) => (
              <StringArrayInput
                label='Resources Needed'
                values={field.value || []}
                onChange={field.onChange}
                placeholder='What resources do you need?'
                maxWords={50}
                error={errors.resourcesNeeded?.message}
              />
            )}
          />
        </div>

        {/* Obstacles */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Obstacles
          </label>
          <textarea
            {...register('obstacles')}
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
            placeholder='What obstacles might you face?'
            rows={2}
          />
        </div>

        {/* Milestones */}
        <div>
          <Controller
            name='milestones'
            control={control}
            render={({ field }) => (
              <StringArrayInput
                label='Milestones'
                values={field.value || []}
                onChange={field.onChange}
                placeholder='List key milestones for this goal...'
                maxWords={50}
                error={errors.milestones?.message}
              />
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 pt-4'>
          {(onCancelEdit || id) && (
            <button
              type='button'
              onClick={() => {
                if (id) {
                  navigate('/goals/overview');
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
              ? 'Update Goal'
              : 'Create Goal'}
          </button>
        </div>
      </form>

      {/* Error Dialog */}
      <ErrorDialog
        show={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title='Save Goal Failed'
        message={errorMessage}
        details={errorDetails}
      />
    </div>
  );
}
