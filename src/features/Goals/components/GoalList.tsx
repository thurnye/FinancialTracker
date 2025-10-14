import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import { Plus, Inbox } from 'lucide-react';
import ProgressCircle from '../../../components/charts/ProgressCircle';
import { Link } from 'react-router-dom';
import { toGoalDisplay } from '../types/goals.types';

interface IGoalList {
  setSelectedGoalItemId: (id: string) => void;
}

export default function GoalList({ setSelectedGoalItemId }: IGoalList) {
  const { goals, loading } = useSelector((state: RootState) => state.goals);
  const [selectedGoalItem, setSelectedGoalItem] = useState<string>('');

  // Convert goals from Redux to display format with visual properties
  const displayGoals = goals.map((goal, index) => toGoalDisplay(goal, {
    icon: ['car', 'monitor', 'plane', 'home'][index] || 'Target',
    color: ['#4f46e5', '#8b5cf6', '#06b6d4', '#ec4899'][index] || '#4f46e5',
    monthly: [500, 200, 150, 400][index] || 0
  }));

  // Set first goal as selected when goals load
  useEffect(() => {
    if (displayGoals.length > 0 && !selectedGoalItem) {
      setSelectedGoalItem(displayGoals[0].id);
      setSelectedGoalItemId(displayGoals[0].id);
    }
  }, [displayGoals, selectedGoalItem, setSelectedGoalItemId]);

  // Empty state
  if (!loading && goals.length === 0) {
    return (
      <div className='space-y-4'>
        <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center'>
          <div className='flex justify-center mb-3'>
            <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center'>
              <Inbox size={32} className='text-slate-400' />
            </div>
          </div>
          <h3 className='text-lg font-semibold text-slate-700 mb-2'>No Goals Yet</h3>
          <p className='text-sm text-slate-500 mb-4'>
            Create your first goal to start tracking your progress
          </p>
          <Link
            to={'../add-goal'}
            className='inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium'
          >
            <Plus size={16} />
            Create Goal
          </Link>
        </div>
      </div>
    );
  }

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
              {goal.deadline && (
                <span className='text-[10px] text-slate-500'>
                  {new Date(goal.deadline).toLocaleDateString()}
                </span>
              )}
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
