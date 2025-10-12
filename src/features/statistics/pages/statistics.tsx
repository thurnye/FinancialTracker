import React, { useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { fetchDonationsPerCategory } from '../redux/statistics.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { donationAmountPerCategory, loading, error } = useAppSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchDonationsPerCategory());
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-semibold text-green-700 mb-8 text-center'>
          Donation Statistics
        </h1>

        <Card className='shadow-md border-0 rounded-lg bg-white'>
          <Card.Body className='p-6'>
            {loading && (
              <div className='flex justify-center items-center py-20'>
                <Spinner animation='border' variant='success' />
              </div>
            )}

            {!loading && error && (
              <p className='text-center text-red-600 font-medium py-10'>
                {error}
              </p>
            )}

            {!loading && !error && donationAmountPerCategory.length === 0 && (
              <p className='text-center text-gray-500 py-10'>
                No donation data available yet.
              </p>
            )}

            {!loading && !error && donationAmountPerCategory.length > 0 && (
              <div className='h-96'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={donationAmountPerCategory}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='category' />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey='totalAmount'
                      fill='#2ECC71'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
