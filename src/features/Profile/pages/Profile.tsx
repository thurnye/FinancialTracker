import React from 'react';
import { useAppSelector } from '../../../app/hooks/app.hooks';

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className='space-y-4 pb-6'>
      {/* Profile Header */}
      {user && (
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <div className='flex items-center gap-4 mb-4'>
            <img
              src={user.avatar}
              alt='Profile'
              className='w-16 h-16 rounded-full border-2 border-emerald-500'
            />
            <div>
              <h2 className='text-lg font-bold text-slate-800'>
                {user.firstName} {user.lastName}
              </h2>
              <p className='text-xs text-slate-600'>{user.email}</p>
              <p className='text-[10px] text-slate-500 mt-0.5'>
                Member since March 2023
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200'>
            <div>
              <p className='text-xs text-slate-600 mb-0.5'>Account Type</p>
              <p className='text-sm font-semibold text-slate-800'>Premium</p>
            </div>
            <div>
              <p className='text-xs text-slate-600 mb-0.5'>Spent</p>
              <p className='text-sm font-semibold text-slate-800'>$2,345.67</p>
            </div>
            <div>
              <p className='text-xs text-slate-600 mb-0.5'>Budget</p>
              <p className='text-sm font-semibold text-slate-800'>$3,800.00</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
