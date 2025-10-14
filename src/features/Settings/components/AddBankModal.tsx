import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { AppDispatch } from '../../../app/stores/stores';
import { X, Landmark } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BankData, BankAccount } from '../types/settings.types';
import { Wallet } from '../../Wallet/types/wallet.types';
import { saveWallet } from '../../Wallet/redux/wallet.slice';

interface AddBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (bankData: BankData) => void;
  editingWallet?: Wallet | null;
}

interface BankFormData {
  walletName: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  fullName: string;
  balance?: number;
}

export default function AddBankModal({ isOpen, onClose, onSave, editingWallet }: AddBankModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BankFormData>({
    defaultValues: {
      walletName: '',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      fullName: '',
      balance: 0,
    },
  });

  useEffect(() => {
    if (editingWallet) {
      setValue('walletName', editingWallet.walletName);
      setValue('bankName', editingWallet.bankName);
      setValue('accountNumber', editingWallet.accountNumber);
      setValue('fullName', editingWallet.bankName); // Using bankName as fallback for fullName
      setValue('balance', editingWallet.balance || 0);
      // Note: routing number is not stored in backend, using placeholder
      setValue('routingNumber', '');
    }
  }, [editingWallet, setValue]);

  const routingNumber = watch('routingNumber');
  const accountNumber = watch('accountNumber');
  const fullName = watch('fullName');

  if (!isOpen) return null;

  const onSubmit = async (data: BankFormData) => {
    setIsSubmitting(true);
    try {
      const walletData: Wallet = {
        id: editingWallet?.id || '',
        walletName: data.walletName,
        walletType: 'Bank',
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        currency: 'USD',
        balance: data.balance || 0,
        isActive: true,
      };

      await dispatch(saveWallet(walletData)).unwrap();

      // Show success toast
      toast.success(
        editingWallet?.id
          ? 'Bank account updated successfully!'
          : 'Bank account added successfully!'
      );

      // Call legacy onSave if provided for backwards compatibility
      if (onSave) {
        onSave({
          routingNumber: data.routingNumber,
          accountNumber: data.accountNumber,
          fullName: data.fullName,
        });
      }

      reset();
      onClose();
    } catch (error) {
      console.error('Failed to save bank account:', error);
      toast.error('Failed to save bank account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    reset();
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors'
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className='text-xl font-bold text-slate-900 mb-6'>
          {editingWallet ? 'Edit Bank Account' : 'Link a bank account'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Wallet Name
            </label>
            <input
              type='text'
              {...register('walletName', {
                required: 'Wallet name is required',
                minLength: {
                  value: 2,
                  message: 'Wallet name must be at least 2 characters',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.walletName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='My Checking Account'
            />
            {errors.walletName && (
              <p className='text-xs text-red-600 mt-1'>{errors.walletName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Bank Name
            </label>
            <input
              type='text'
              {...register('bankName', {
                required: 'Bank name is required',
                minLength: {
                  value: 2,
                  message: 'Bank name must be at least 2 characters',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.bankName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='Chase Bank'
            />
            {errors.bankName && (
              <p className='text-xs text-red-600 mt-1'>{errors.bankName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Routing number
            </label>
            <input
              type='text'
              {...register('routingNumber', {
                pattern: {
                  value: /^\d{9}$/,
                  message: 'Routing number must be 9 digits',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.routingNumber
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='021000021'
            />
            {errors.routingNumber && (
              <p className='text-xs text-red-600 mt-1'>{errors.routingNumber.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Account number
            </label>
            <input
              type='text'
              {...register('accountNumber', {
                required: 'Account number is required',
                minLength: {
                  value: 4,
                  message: 'Account number must be at least 4 digits',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.accountNumber
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='1234567890'
            />
            {errors.accountNumber && (
              <p className='text-xs text-red-600 mt-1'>{errors.accountNumber.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Full name
            </label>
            <input
              type='text'
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-emerald-500'
              }`}
              placeholder='John Doe'
            />
            {errors.fullName && (
              <p className='text-xs text-red-600 mt-1'>{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Initial Balance
            </label>
            <input
              type='number'
              step='0.01'
              {...register('balance', {
                min: {
                  value: 0,
                  message: 'Balance must be at least 0',
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
              <p className='text-xs text-red-600 mt-1'>{errors.balance.message}</p>
            )}
          </div>

          {/* Bank Card Visual */}
          <div className='bg-emerald-400 rounded-xl p-6 relative mt-6'>
            <div className='flex items-start justify-between mb-8'>
              <div className='w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center'>
                <Landmark className='text-white' size={20} />
              </div>
              <div className='w-16 h-6 bg-white rounded'></div>
            </div>

            <div className='space-y-1 text-slate-900'>
              <div className='flex gap-4 text-sm font-mono tracking-wider'>
                <span>{routingNumber || '17778886777'}</span>
                <span>{accountNumber ? `${accountNumber.slice(0, 3)}L23 4L789` : '1001234 L789'}</span>
                <span>*123</span>
              </div>
              <div className='flex gap-6 text-xs mt-3'>
                <div>
                  <p className='text-slate-700 text-[10px]'>routing number</p>
                  <p className='font-medium'>{routingNumber}</p>
                </div>
                <div>
                  <p className='text-slate-700 text-[10px]'>bank account number</p>
                  <p className='font-medium'>{accountNumber}</p>
                </div>
                <div>
                  <p className='text-slate-700 text-[10px]'>cheque number</p>
                  <p className='font-medium'>123</p>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className='flex gap-3 mt-6'>
            <button
              type='button'
              onClick={handleBack}
              className='flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold'
            >
              Back
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold disabled:opacity-50'
            >
              {isSubmitting ? 'Saving...' : editingWallet ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
