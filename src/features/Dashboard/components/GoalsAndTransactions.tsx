import { dashboardData } from '../utils/dashboard.data';


export default function GoalsAndTransactions() {

    const {
        savingGoals,
        transactionHistory,
      } = dashboardData;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* Saving Goals */}
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <h3 className='text-base font-semibold text-slate-800 mb-3'>
            Saving Goals
          </h3>
          <div className='grid grid-cols-2 gap-3'>
            {savingGoals.map((goal) => (
              <div key={goal.id} className='text-center'>
                <div className='relative inline-flex items-center justify-center w-16 h-16 mb-1'>
                  <svg className='w-16 h-16 transform -rotate-90'>
                    <circle
                      cx='32'
                      cy='32'
                      r='26'
                      stroke='#e2e8f0'
                      strokeWidth='6'
                      fill='none'
                    />
                    <circle
                      cx='32'
                      cy='32'
                      r='26'
                      stroke={goal.color}
                      strokeWidth='6'
                      fill='none'
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 26 * (1 - goal.percentage / 100)
                      }`}
                      strokeLinecap='round'
                    />
                  </svg>
                  <span className='absolute text-xs font-bold text-slate-800'>
                    {goal.percentage}%
                  </span>
                </div>
                <p className='text-xs font-medium text-slate-800'>
                  {goal.name}
                </p>
                <p className='text-[10px] text-slate-500'>
                  ${goal.current.toLocaleString()} / $
                  {goal.target.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

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
            {transactionHistory.map((transaction) => (
              <div
                key={transaction.id}
                className='flex items-center justify-between py-2 border-b border-slate-100 last:border-0'
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
                    <p className='text-xs font-medium text-slate-800'>
                      {transaction.category}
                    </p>
                    <p className='text-[10px] text-slate-500'>
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-xs font-semibold text-slate-800'>
                    {transaction.amount < 0 ? '-' : '+'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className='text-[10px] text-slate-500'>
                    {transaction.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
