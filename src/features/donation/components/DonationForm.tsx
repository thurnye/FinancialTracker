import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import { charityCategories } from '../constants/donation.constants';
import { saveDonation } from '../redux/donation.slice';
import { IDonationData } from '../types/donation.types';
import Card, { CardBody, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import FormField from '../../../components/forms/FormField';
import FormSelect from '../../../components/forms/FormSelect';
import FormTextarea from '../../../components/forms/FormTextarea';

interface IDonationFormProps {
  donation?: IDonationData;
  onClose?: () => void;
}

const DonationForm: React.FC<IDonationFormProps> = ({ donation, onClose }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.donations);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDonationData>({
    defaultValues: donation || {
      title: '',
      amount: 0,
      date: '',
      category: '',
      description: '',
    },
  });

  useEffect(() => {
    if (donation) reset(donation);
  }, [donation, reset]);

  const onSubmit = async (data: IDonationData) => {
    await dispatch(saveDonation(data));
    reset();
    if (onClose) onClose();
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="text-emerald-700 mb-4">
          {donation ? 'Edit Donation' : 'Add New Donation'}
        </CardTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Title"
            type="text"
            placeholder="e.g. Grocery Shopping"
            registration={register('title', { required: 'Title is required' })}
            error={errors.title?.message}
          />

          <FormField
            label="Amount"
            type="number"
            step="0.01"
            placeholder="e.g. 50.00"
            registration={register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be positive' },
            })}
            error={errors.amount?.message}
          />

          <FormField
            label="Date"
            type="date"
            registration={register('date', { required: 'Date is required' })}
            error={errors.date?.message}
          />

          <FormSelect
            label="Category"
            options={charityCategories}
            placeholder="Select a category"
            registration={register('category', { required: 'Category is required' })}
            error={errors.category?.message}
          />

          <FormTextarea
            label="Description (Optional)"
            rows={3}
            placeholder="Add details if necessary"
            registration={register('description')}
          />

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              variant="success"
              loading={loading}
            >
              {donation ? 'Update Donation' : 'Add Donation'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default DonationForm;
