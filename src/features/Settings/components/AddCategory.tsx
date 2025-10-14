import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { saveCategory } from '../redux/settings.slice';
import ColorSelect from './ColorSelect';
import IconSelect from './IconSelect';
import { CategoryTypes } from '../utils/settings.data';
import { Category } from '../types/settings.types';
import { Spinner } from 'react-bootstrap';

interface CategoryFormData {
  name: string;
  type: string;
  icon: string;
  color: string;
}

interface AddCategoryProps {
  editingCategory?: Category | null;
  onCancelEdit?: () => void;
}

export default function AddCategory({ editingCategory, onCancelEdit }: AddCategoryProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.settings);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      type: CategoryTypes.Expense,
      icon: 'ShoppingCart',
      color: '#10b981',
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editingCategory) {
      setValue('name', editingCategory.name);
      setValue('type', editingCategory.type);
      setValue('icon', editingCategory.icon);
      setValue('color', editingCategory.color);
    }
  }, [editingCategory, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    const categoryData: Category = {
      id: editingCategory?.id || '',
      name: data.name,
      type: data.type as 'income' | 'expense',
      icon: data.icon as any,
      color: data.color,
    };

    try {
      await dispatch(saveCategory(categoryData)).unwrap();
      reset();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleCancel = () => {
    reset();
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div>
      <div className='lg:col-span-5'>
        {/* Create Category Form */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <h3 className='text-base font-bold text-slate-800 mb-3'>
            {editingCategory ? 'Edit Category' : 'Create a new category'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
              <label className='block text-xs font-medium text-slate-700 mb-1'>
                Name
              </label>
              <input
                type='text'
                placeholder='category name'
                {...register('name', {
                  required: 'Category name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                className={`w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:ring-emerald-500'
                }`}
              />
              {errors.name && (
                <p className='text-xs text-red-600 mt-1'>{errors.name.message}</p>
              )}
            </div>
            <div className='my-3'>
              <label className='block text-xs font-medium text-slate-700 mb-1'>
                Type
              </label>
              <select
                {...register('type', { required: 'Type is required' })}
                className={`w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 ${
                  errors.type
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:ring-emerald-500'
                }`}
              >
                <option value={CategoryTypes.Income}>{CategoryTypes.Income}</option>
                <option value={CategoryTypes.Expense}>{CategoryTypes.Expense}</option>
              </select>
              {errors.type && (
                <p className='text-xs text-red-600 mt-1'>{errors.type.message}</p>
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
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
            <div className='flex gap-2 mt-3'>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {loading ? (
                  <>
                    <Spinner animation='border' size='sm' className='me-2' />
                    Saving...
                  </>
                ) : (
                  editingCategory ? 'Update Category' : 'Create Category'
                )}
              </button>
              {editingCategory && (
                <button
                  type='button'
                  onClick={handleCancel}
                  className='px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium'
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
