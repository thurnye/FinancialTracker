import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { AppDispatch } from '../../../app/stores/stores';
import { X, CreditCard } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { CardData, BankAccount } from '../types/settings.types';
import { Wallet } from '../../Wallet/types/wallet.types';
import { saveWallet } from '../../Wallet/redux/wallet.slice';

interface AddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (cardData: CardData) => void;
  editingWallet?: Wallet | null;
}

interface CreditCardFormData {
  walletName: string;
  bankName: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  creditLimit?: number;
  balance?: number;
}

// Format card number with spaces
const formatCardNumber = (value: string) => {
  const cleaned = value.replace(/\s/g, '');
  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  return formatted;
};

export default function AddCreditCardModal({
  isOpen,
  onClose,
  onSave,
  editingWallet,
}: AddCreditCardModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreditCardFormData>({
    defaultValues: {
      walletName: '',
      bankName: '',
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      creditLimit: 0,
      balance: 0,
    },
  });

  useEffect(() => {
    if (editingWallet) {
      setValue('walletName', editingWallet.walletName);
      setValue('bankName', editingWallet.bankName);
      setValue('cardNumber', editingWallet.accountNumber);
      setValue('cardholderName', editingWallet.bankName);

      // Format expiry date from backend format to MM/YY
      if (editingWallet.expiryDate) {
        const date = new Date(editingWallet.expiryDate);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        setValue('expiryDate', `${month}/${year}`);
      }

      setValue('cvv', editingWallet.cvv?.toString() || '');
      setValue('creditLimit', editingWallet.creditLimit || 0);
      setValue('balance', editingWallet.balance || 0);
    }
  }, [editingWallet, setValue]);

  const cardNumber = watch('cardNumber');
  const cardholderName = watch('cardholderName');
  const expiryDate = watch('expiryDate');
  const cvv = watch('cvv');

  if (!isOpen) return null;

  const onSubmit = async (data: CreditCardFormData) => {
    setIsSubmitting(true);
    try {
      // Convert MM/YY to ISO date format
      let expiryDateISO: string | null = null;
      if (data.expiryDate) {
        const [month, year] = data.expiryDate.split('/');
        expiryDateISO = new Date(parseInt(`20${year}`), parseInt(month) - 1, 1).toISOString();
      }

      // Determine card type from card number
      const firstDigit = data.cardNumber.charAt(0);
      const cardType = firstDigit === '4' ? 'Visa' : firstDigit === '5' ? 'Mastercard' : 'Credit Card';

      const walletData: Wallet = {
        id: editingWallet?.id || '',
        walletName: data.walletName,
        walletType: 'Credit',
        accountNumber: data.cardNumber,
        bankName: data.bankName,
        cardType: cardType,
        currency: 'USD',
        balance: data.balance || 0,
        creditLimit: data.creditLimit || 0,
        expiryDate: expiryDateISO,
        cvv: parseInt(data.cvv),
        isActive: true,
      };

      await dispatch(saveWallet(walletData)).unwrap();

      // Show success toast
      toast.success(
        editingWallet?.id
          ? 'Credit card updated successfully!'
          : 'Credit card added successfully!'
      );

      // Call legacy onSave if provided for backwards compatibility
      if (onSave) {
        onSave({
          cardNumber: data.cardNumber,
          cardholderName: data.cardholderName,
          expiryDate: data.expiryDate,
          cvv: data.cvv,
        });
      }

      reset();
      onClose();
    } catch (error) {
      console.error('Failed to save credit card:', error);
      toast.error('Failed to save credit card. Please try again.');
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
          {editingWallet ? 'Edit Credit Card' : 'Add Credit Card'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Wallet Name
            </label>
            <Controller
              name='walletName'
              control={control}
              rules={{
                required: 'Wallet name is required',
                minLength: {
                  value: 2,
                  message: 'Wallet name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type='text'
                  value={value}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.walletName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                  placeholder='My Credit Card'
                />
              )}
            />
            {errors.walletName && (
              <p className='text-xs text-red-600 mt-1'>{errors.walletName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Bank Name
            </label>
            <Controller
              name='bankName'
              control={control}
              rules={{
                required: 'Bank name is required',
                minLength: {
                  value: 2,
                  message: 'Bank name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type='text'
                  value={value}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.bankName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                  placeholder='Chase Bank'
                />
              )}
            />
            {errors.bankName && (
              <p className='text-xs text-red-600 mt-1'>{errors.bankName.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Card Number
            </label>
            <Controller
              name='cardNumber'
              control={control}
              rules={{
                required: 'Card number is required',
                pattern: {
                  value: /^\d{16}$/,
                  message: 'Card number must be 16 digits',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type='text'
                  value={formatCardNumber(value)}
                  onChange={(e) => {
                    const cleanValue = e.target.value.replace(/\s/g, '');
                    if (cleanValue.length <= 16 && /^\d*$/.test(cleanValue)) {
                      onChange(cleanValue);
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.cardNumber
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                  placeholder='1234 5678 9012 3456'
                  maxLength={19}
                />
              )}
            />
            {errors.cardNumber && (
              <p className='text-xs text-red-600 mt-1'>{errors.cardNumber.message}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Cardholder Name
            </label>
            <Controller
              name='cardholderName'
              control={control}
              rules={{
                required: 'Cardholder name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type='text'
                  value={value}
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.cardholderName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-300 focus:ring-emerald-500'
                  }`}
                  placeholder='JOHN DOE'
                />
              )}
            />
            {errors.cardholderName && (
              <p className='text-xs text-red-600 mt-1'>{errors.cardholderName.message}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Expiry Date
              </label>
              <Controller
                name='expiryDate'
                control={control}
                rules={{
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: 'Invalid expiry date (MM/YY)',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    type='text'
                    value={value}
                    onChange={(e) => {
                      let cleanValue = e.target.value.replace(/\D/g, '');
                      if (cleanValue.length >= 2) {
                        cleanValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
                      }
                      onChange(cleanValue);
                    }}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.expiryDate
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-emerald-500'
                    }`}
                    placeholder='MM/YY'
                    maxLength={5}
                  />
                )}
              />
              {errors.expiryDate && (
                <p className='text-xs text-red-600 mt-1'>{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                CVV
              </label>
              <Controller
                name='cvv'
                control={control}
                rules={{
                  required: 'CVV is required',
                  pattern: {
                    value: /^\d{3}$/,
                    message: 'CVV must be 3 digits',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    type='text'
                    value={value}
                    onChange={(e) => {
                      const cleanValue = e.target.value;
                      if (cleanValue.length <= 3 && /^\d*$/.test(cleanValue)) {
                        onChange(cleanValue);
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.cvv
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-emerald-500'
                    }`}
                    placeholder='123'
                    maxLength={3}
                  />
                )}
              />
              {errors.cvv && (
                <p className='text-xs text-red-600 mt-1'>{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Credit Limit
              </label>
              <Controller
                name='creditLimit'
                control={control}
                rules={{
                  min: {
                    value: 0,
                    message: 'Credit limit must be at least 0',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    type='number'
                    step='0.01'
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.creditLimit
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-emerald-500'
                    }`}
                    placeholder='0.00'
                  />
                )}
              />
              {errors.creditLimit && (
                <p className='text-xs text-red-600 mt-1'>{errors.creditLimit.message}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Current Balance
              </label>
              <Controller
                name='balance'
                control={control}
                rules={{
                  min: {
                    value: 0,
                    message: 'Balance must be at least 0',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    type='number'
                    step='0.01'
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.balance
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-emerald-500'
                    }`}
                    placeholder='0.00'
                  />
                )}
              />
              {errors.balance && (
                <p className='text-xs text-red-600 mt-1'>{errors.balance.message}</p>
              )}
            </div>
          </div>

          {/* Credit Card Visual */}
          <div className='bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 relative mt-6 text-white'>
            <div className='flex items-start justify-between mb-8'>
              <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                <CreditCard className='text-white' size={20} />
              </div>
              <div className='text-xs font-semibold'>CREDIT CARD</div>
            </div>

            <div className='space-y-4'>
              <div className='font-mono text-lg tracking-wider'>
                {formatCardNumber(cardNumber) || '**** **** **** ****'}
              </div>

              <div className='flex justify-between items-end'>
                <div>
                  <p className='text-xs text-indigo-200 mb-1'>CARDHOLDER NAME</p>
                  <p className='font-medium text-sm'>
                    {cardholderName || 'YOUR NAME'}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-indigo-200 mb-1'>EXPIRES</p>
                  <p className='font-medium text-sm'>{expiryDate || 'MM/YY'}</p>
                </div>
                <div>
                  <p className='text-xs text-indigo-200 mb-1'>CVV</p>
                  <p className='font-medium text-sm'>{cvv || '***'}</p>
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
