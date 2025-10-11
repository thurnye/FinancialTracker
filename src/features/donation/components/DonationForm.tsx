import React, { useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import { charityCategories } from '../constants/donation.constants';
import { saveDonation } from '../redux/donation.slice';
import { IDonationData } from '../types/donation.types';

interface IDonationFormProps {
  donation?: IDonationData; // If provided → edit mode, else → create mode
  onClose?: () => void; // Optional callback (e.g., close modal)
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
    <Card className='shadow-md border-0 bg-white p-6 rounded-lg'>
      <Card.Body>
        <h3 className='text-xl font-semibold text-green-700 mb-4'>
          {donation ? 'Edit Donation' : 'Add New Donation'}
        </h3>

        <Form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          {/* Title */}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='e.g. Grocery Shopping'
              {...register('title', { required: 'Title is required' })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Amount */}
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type='number'
              step='0.01'
              placeholder='e.g. 50.00'
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be positive' },
              })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.amount?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Date */}
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='date'
              {...register('date', { required: 'Date is required' })}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.date?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Category */}
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              {...register('category', { required: 'Category is required' })}
              defaultValue=''
            >
              <option value=''>Select a category</option>
              {charityCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {errors.category?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group>
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              placeholder='Add details if necessary'
              {...register('description')}
            />
          </Form.Group>

          {/* Submit */}
          <div className='flex justify-end mt-4'>
            <Button
              type='submit'
              variant='success'
              disabled={loading}
              className='px-4 py-2 text-white bg-green-600 hover:bg-green-700'
            >
              {loading ? (
                <>
                  <Spinner size='sm' animation='border' className='mr-2' />
                  Saving...
                </>
              ) : donation ? (
                'Update Donation'
              ) : (
                'Add Donation'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DonationForm;
