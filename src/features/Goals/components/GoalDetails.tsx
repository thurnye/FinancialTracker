import React, { useEffect, useState } from 'react';
import { goalsData } from '../utils/goals.data';
import { Goal } from '../types/goals.types';

interface IGoalDetails {
  id: string;
}

export default function GoalDetails({ id }: IGoalDetails) {
  const { history, goals } = goalsData;
  const [goal, setGoal] = useState<Goal | undefined>();

  useEffect(() => {
    if (id) {
      const foundGoal = goals.find((el) => el.id === id);
      setGoal(foundGoal);
    }
  }, [id, goals]);

  return (
    <div>
      {goal && (
        <div className='space-y-4'>
          <div className='bg-white rounded-xl p-2 px-4 mb-3 shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{goal.name}</h3>
          </div>

          <div
            key={goal.id}
            className='bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
          >
            <div className='grid grid-cols-4 gap-3 mb-3'>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Saved</p>
                <p className='text-xs font-semibold text-slate-800'>
                  ${goal.saved.toLocaleString()}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Monthly</p>
                <p className='text-xs font-semibold text-slate-800'>
                  ${goal.monthly.toLocaleString()}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Target</p>
                <p className='text-xs font-semibold text-slate-800'>
                  ${goal.target.toLocaleString()}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-slate-500 mb-0.5'>Target Date</p>
                <p className='text-xs font-semibold text-slate-800'>
                  {goal.deadline}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-xs opacity-90'>Spent</p>
                <h2 className='text-2xl font-bold -mt-2'>
                  ${goal.saved.toFixed(2)}
                </h2>
              </div>
              <div>
                <p className='text-xs opacity-90 text-end'>Goal</p>
                <h2 className='text-2xl font-bold -mt-2'>
                  ${goal.target.toFixed(2)}
                </h2>
              </div>
            </div>
            <div className='w-full bg-slate-100 rounded-full h-2 mb-1'>
              <div
                className='h-2 rounded-full transition-all duration-300'
                style={{
                  width: `${goal.percentage}%`,
                  backgroundColor: goal.color,
                }}
              ></div>
            </div>
            <div className='flex justify-between text-[10px] text-slate-600'>
              <span>{goal.percentage.toFixed(0)}% saved</span>
              <span>{(100 - goal.percentage).toFixed(0)}% remaining</span>
            </div>
          </div>

          {/* History */}
          <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
            <h3 className='text-base font-bold text-slate-800 mb-3'>History</h3>

            {/* Table Header */}
            <div className='grid grid-cols-4 gap-2 pb-2 border-b border-slate-200 mb-2'>
              <div className='text-[10px] font-semibold text-slate-600'>
                Date
              </div>
              <div className='text-[10px] font-semibold text-slate-600'>
                Wallet
              </div>
              <div className='text-[10px] font-semibold text-slate-600'>
                Description
              </div>
              <div className='text-[10px] font-semibold text-slate-600 text-right'>
                Amount
              </div>
            </div>

            {/* History Items */}
            <div className='space-y-2'>
              {history.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-4 gap-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors'
                >
                  <div className='text-[10px] text-slate-600'>{item.date}</div>
                  <div className='text-[10px] text-slate-600'>
                    {item.wallet}
                  </div>
                  <div className='text-[10px] text-slate-700'>
                    {item.description}
                  </div>
                  <div className='text-[10px] font-semibold text-slate-800 text-right'>
                    +${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
