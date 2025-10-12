import React, { useState } from 'react';
import GoalList from '../components/GoalList';
import GoalDetails from '../components/GoalDetails';

export default function GoalsOverview() {
  const [selectedGoalItemId, setSelectedGoalItemId] = useState<string>('1');

  return (
    <div className='space-y-4 pb-6'>
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
