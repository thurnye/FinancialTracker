import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { fetchGoals } from '../redux/goals.slice';
import GoalList from '../components/GoalList';
import GoalDetails from '../components/GoalDetails';
import { Spinner, Alert } from 'react-bootstrap';

export default function GoalsOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, loading, error } = useSelector((state: RootState) => state.goals);
  const [selectedGoalItemId, setSelectedGoalItemId] = useState<string>('1');

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  if (loading && goals.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <div className='space-y-4 pb-6'>
      {error && (
        <Alert variant='danger' dismissible>
          {error}
        </Alert>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-3'>
          {/* Active Goals */}
          <GoalList setSelectedGoalItemId={setSelectedGoalItemId} />
        </div>

        <div className='lg:col-span-9'>
          {/* Available by Market & History */}
          <GoalDetails id={selectedGoalItemId} />
        </div>
      </div>
    </div>
  );
}
