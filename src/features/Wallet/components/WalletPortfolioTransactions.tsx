import { walletData } from '../utils/wallet.data';

export default function WalletPortfolioTransactions() {
  const { transactions } = walletData;

  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-base font-bold text-slate-800'>
          Transaction History
        </h3>
        <button className='text-xs text-emerald-600 hover:text-emerald-700 font-medium'>
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-4 gap-4 pb-2 border-b border-slate-200 mb-3'>
        <div className='text-xs font-semibold text-slate-600'>Type</div>
        <div className='text-xs font-semibold text-slate-600'>Date</div>
        <div className='text-xs font-semibold text-slate-600'>Description</div>
        <div className='text-xs font-semibold text-slate-600 text-right'>
          Amount
        </div>
      </div>

      {/* Transactions */}
      <div className='space-y-2'>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='grid grid-cols-1 md:grid-cols-4 gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors'
          >
            <div className='flex items-center gap-2'>
              <div
                className='w-8 h-8 rounded-full flex items-center justify-center'
                style={{ backgroundColor: `${transaction.color}20` }}
              >
                <div
                  className='w-1.5 h-1.5 rounded-full'
                  style={{ backgroundColor: transaction.color }}
                ></div>
              </div>
              <div>
                <p className='text-xs font-medium text-slate-800 capitalize'>
                  {transaction.category}
                </p>
                <p className='text-[10px] text-slate-500 md:hidden'>
                  {transaction.date}
                </p>
              </div>
            </div>

            <div className='hidden md:flex items-center'>
              <p className='text-xs text-slate-600'>{transaction.date}</p>
            </div>

            <div className='flex items-center'>
              <p className='text-xs text-slate-700'>
                {transaction.description}
              </p>
            </div>

            <div className='flex items-center justify-between md:justify-end'>
              <p
                className={`text-xs font-semibold ${
                  transaction.amount >= 0
                    ? 'text-emerald-600'
                    : 'text-slate-800'
                }`}
              >
                {transaction.amount >= 0 ? '+' : ''}$
                {Math.abs(transaction.amount).toFixed(2)}
              </p>
              <span className='text-[10px] text-slate-500 ml-2'>
                {transaction.currency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
