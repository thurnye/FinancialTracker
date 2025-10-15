import { TrendingUp, TrendingDown } from 'lucide-react';
import { Spinner } from '../../../components/ui';
import { useAppSelector } from '../../../app/hooks/app.hooks';

export default function BalanceWidgets() {
  const { data, loading, error } = useAppSelector((state) => state.dashboard);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
        <p className='text-sm text-red-600'>{error}</p>
      </div>
    );
  }

  if (!data || !data.balanceCards) return null;

  const { balanceCards } = data;

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {balanceCards.map((card) => (
          <div
            key={card.id}
            className='bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
          >
            <p className='text-xs text-slate-600 mb-1'>{card.title}</p>
            <h3
              className={`text-xl font-bold text-slate-800 mb-1
              ${card.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}
            `}
            >
              <span className={`${card.amount >= 0 ? '' : 'text-red-600'}`}>
                ${card.amount.toLocaleString()}
              </span>
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
