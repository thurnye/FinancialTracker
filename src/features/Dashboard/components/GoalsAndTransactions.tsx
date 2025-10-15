import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import ProgressCircle from '../../../components/charts/ProgressCircle';
import * as LucideIcons from 'lucide-react';
import { Spinner } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks/app.hooks';

export default function GoalsAndTransactions() {
  const { data } = useAppSelector((state) => state.dashboard);

  if (!data || !data.latestTransactions)
    return (
      <div className='flex justify-center items-center py-6 text-slate-500'>
        <Spinner animation='border' size='sm' className='me-2' />
      </div>
    );

  const {  latestTransactions } = data;

  return (
    <div className=''>

      {/* Transaction History */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-base font-semibold text-slate-800'>
            Transaction History
          </h3>
          <button className='text-xs text-emerald-600 hover:text-emerald-700 font-medium'>
            See more
          </button>
        </div>
        <div className='space-y-2'>
          {latestTransactions.map((transaction) => {
            // Convert icon name to PascalCase for Lucide icons
            const iconName = transaction.icon
              ? transaction.icon.charAt(0).toUpperCase() +
                transaction.icon
                  .slice(1)
                  .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
              : 'DollarSign';
            const IconComponent =
              (LucideIcons as any)[iconName] || LucideIcons.DollarSign;

            return (
              <div
                key={transaction.id}
                className='flex items-center justify-between py-2 border-b border-slate-100 last:border-0'
              >
                <div className='flex items-center gap-2'>
                  <div
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: `${transaction.color}20` }}
                  >
                    <IconComponent
                      size={16}
                      style={{ color: transaction.color }}
                    />
                  </div>
                  <div>
                    <p className='text-xs font-medium text-slate-800'>
                      {transaction.category}
                    </p>
                    <p className='text-[10px] text-slate-500'>
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p
                    className={`text-xs font-semibold ${
                      transaction.amount < 0
                        ? 'text-red-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {transaction.amount < 0 ? '-' : '+'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className='text-[10px] text-slate-500'>
                    {transaction.currency}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
