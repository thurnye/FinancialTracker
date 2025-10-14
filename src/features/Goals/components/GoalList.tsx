import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import { Plus } from 'lucide-react';
import ProgressCircle from '../../../components/charts/ProgressCircle';
import { Link } from 'react-router-dom';
import { toGoalDisplay } from '../types/goals.types';

interface IGoalList {
  setSelectedGoalItemId: (id: string) => void;
}

export default function GoalList({ setSelectedGoalItemId }: IGoalList) {
  const { goals } = useSelector((state: RootState) => state.goals);
  const [selectedGoalItem, setSelectedGoalItem] = useState<string>('');

  // Convert goals from Redux to display format with visual properties
  const displayGoals = goals.map((goal, index) => toGoalDisplay(goal, {
    icon: ['car', 'monitor', 'plane', 'home'][index] || 'Target',
    color: ['#4f46e5', '#8b5cf6', '#06b6d4', '#ec4899'][index] || '#4f46e5',
    monthly: [500, 200, 150, 400][index] || 0
  }));

  return (
    <div>
      <div className='space-y-4'>
        {displayGoals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => {
              setSelectedGoalItem(goal.id);
              setSelectedGoalItemId(goal.id);
            }}
            className={`
            ${selectedGoalItem === goal.id ? 'bg-green-100' : 'bg-white'}
            rounded-lg p-3 mb-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div
                  className='w-10 h-10 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: `${goal.color}20` }}
                >
                  <ProgressCircle
                    percentage={goal.percentage}
                    color={goal.color}
                    size={50}
                  />
                </div>
                <div>
                  <p className='text-xs font-semibold text-slate-600 mb-0.5'>
                    {goal.name}
                  </p>
                  <p className='text-xs  text-slate-800'>
                    ${goal.saved.toLocaleString()}/$
                    {goal.target.toLocaleString()}
                  </p>
                </div>
              </div>
              <span className='text-[10px] text-slate-500'>
                {goal.deadline}
              </span>
            </div>
          </div>
        ))}

        {/* Add New Budget Button */}
        <Link to={'../add-goal'} className='w-full bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600'>
          <Plus size={16} />
          <span className='text-sm font-medium'>Add new Goal</span>
        </Link>
      </div>
    </div>
  );
}
