import React from 'react';
import { dashboardData } from '../utils/dashboard.data';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function BalanceWidgets() {
  const { balanceCards } = dashboardData;

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {balanceCards.map((card) => (
          <div
            key={card.id}
            className='bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
          >
            <p className='text-xs text-slate-600 mb-1'>{card.title}</p>
            <h3 className='text-xl font-bold text-slate-800 mb-1'>
              ${card.amount.toLocaleString()}
            </h3>
            <div className='flex items-center gap-1'>
              {card.change >= 0 ? (
                <>
                  <TrendingUp size={16} className='text-emerald-600' />
                  <span className='text-sm text-emerald-600'>
                    +${Math.abs(card.change).toFixed(2)}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className='text-red-600' />
                  <span className='text-sm text-red-600'>
                    -${Math.abs(card.change).toFixed(2)}
                  </span>
                </>
              )}
              <span className='text-xs text-slate-500 ml-1'>last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
