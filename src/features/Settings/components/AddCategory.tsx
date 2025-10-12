import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ColorSelect from './ColorSelect';
import IconSelect from './IconSelect';

interface CategoryFormData {
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      type: 'expense',
      icon: 'ShoppingCart',
      color: '#10b981',
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log('Category data:', data);
    // Handle category creation
    reset();
  };

  return (
    <div>
      <div className='lg:col-span-5'>
        {/* Create Category Form */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <h3 className='text-base font-bold text-slate-800 mb-3'>
            Create a new categories
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
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
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
            <button
              type='submit'
              className='mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium'
            >
              Create new category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
