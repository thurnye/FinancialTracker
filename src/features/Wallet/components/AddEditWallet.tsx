import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { WalletAccount } from '../types/wallet.types';
import IconSelect from '../../Settings/components/IconSelect';
import ColorSelect from '../../Settings/components/ColorSelect';

interface AddEditWalletProps {
  onSave?: (wallet: Omit<WalletAccount, 'id'>) => void;
  onCancel?: () => void;
  isEdit: boolean;
}

export default function AddEditWallet({
  onSave,
  onCancel,
  isEdit,
}: AddEditWalletProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Omit<WalletAccount, 'id'>>({
    defaultValues: {
      type: 'savings',
      name: '',
      balance: 0,
      icon: 'Landmark',
      color: '#4f46e5',
    },
  });

  const onSubmit = (data: Omit<WalletAccount, 'id'>) => {
    // console.log('Wallet data:', data);
    if (onSave) {
      onSave(data);
    }
    reset();
  };

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        {isEdit ? 'Update Wallet' : 'Add New Walled'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Wallet Name */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Wallet Name
          </label>
          <input
            type='text'
            {...register('name', {
              required: 'Wallet name is required',
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
            placeholder='e.g., Savings Account'
          />
          {errors.name && (
            <p className='text-xs text-red-600 mt-1'>{errors.name.message}</p>
          )}
        </div>

        {/* Wallet Type */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Wallet Type
          </label>
          <select
            {...register('type', { required: 'Type is required' })}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              errors.type
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
          >
            <option value='savings'>Savings</option>
            <option value='checking'>Checking</option>
            <option value='investment'>Investment</option>
            <option value='emergency'>Emergency</option>
          </select>
          {errors.type && (
            <p className='text-xs text-red-600 mt-1'>{errors.type.message}</p>
          )}
        </div>

        {/* Initial Balance */}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Initial Balance
          </label>
          <input
            type='number'
            step='0.01'
            {...register('balance', {
              required: 'Balance is required',
              min: {
                value: 0,
                message: 'Balance cannot be negative',
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              errors.balance
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
            placeholder='0.00'
          />
          {errors.balance && (
            <p className='text-xs text-red-600 mt-1'>
              {errors.balance.message}
            </p>
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
            {isEdit ? 'Save Updated Wallet' : 'Save Wallet'}
          </button>
        </div>
      </form>
    </div>
  );
}
