import Card from '../../../components/ui/Card';
// import * as LucideIcons from 'lucide-react';
import { useAppSelector } from '../../../app/hooks/app.hooks';
import { PieChartComponent, ProgressCircle } from '../../../components';
import { Spinner } from 'react-bootstrap';

export default function MonthlyPayments() {
  const { data } = useAppSelector((state) => state.dashboard);

  if (!data || !data.walletSpending|| !data.savingGoals)
    return (
      <div className='flex justify-center items-center py-6 text-slate-500'>
        <Spinner animation='border' size='sm' className='me-2' />
      </div>
    );

  const { walletSpending, savingGoals } = data;

  console.log('walletSpending', walletSpending);

  const chartData = walletSpending.map((wallet) => {
    const percentage =
      wallet.totalIncome > 0
        ? (wallet.netBalance / wallet.totalIncome) * 100
        : 0;

    return {
      name: wallet.walletName,
      value: parseFloat(percentage.toFixed(2)),
      amount: wallet.netBalance,
      color: wallet.color,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200'>
          <p className='text-xs font-semibold text-slate-800'>{data.name}</p>
          <p className='text-xs text-slate-600'>
            Balance: ${data.amount.toLocaleString()}
          </p>
          <p className='text-xs text-slate-600'>Used: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {/* Payments History */}
      <Card>
        <h3 className='text-base font-bold text-slate-800 mb-4'>
          Wallet Spending Breakdown
        </h3>

        <div className='flex justify-center mb-6'>
          <PieChartComponent
            data={chartData}
            height={250}
            width={250}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
        </div>
        <div>
          <ul className='space-y-2'>
            {chartData.map((wallet) => (
              <li key={wallet.name} className='flex items-center gap-3'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: wallet.color }}
                ></div>
                <span className='text-xs text-slate-700 font-medium'>
                  {wallet.name}
                </span>
                <span className='text-xs text-slate-500'>
                  - ${wallet.amount.toLocaleString()} ({wallet.value}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
       {/* Saving Goals */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <h3 className='text-base font-semibold text-slate-800 mb-3'>
          Saving Goals
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          {savingGoals.map((goal) => (
            <div key={goal.id} className='text-center'>
              <ProgressCircle percentage={goal.current} color={goal.color} />

              <p className='text-xs font-medium text-slate-800'>{goal.name}</p>
              <p className='text-[10px] text-slate-500'>
                ${((goal.current / 100) * goal.target).toLocaleString()} / $
                {goal.target.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-base font-semibold text-slate-800'>
            Payments History
          </h3>
          <button className='text-xs text-emerald-600 hover:text-emerald-700 font-medium'>
            See more
          </button>
        </div>
        <div className='space-y-2'>
          {paymentsHistory.map((payment) => {
            // Convert icon name to PascalCase for Lucide icons
            const iconName = payment.icon
              ? payment.icon.charAt(0).toUpperCase() +
                payment.icon
                  .slice(1)
                  .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
              : 'DollarSign';
            const IconComponent =
              (LucideIcons as any)[iconName] || LucideIcons.DollarSign;
            const statusColor =
              payment.status === 'paid'
                ? 'emerald'
                : payment.status === 'pending'
                ? 'amber'
                : 'red';

            return (
              <div
                key={payment.id}
                className='flex items-center justify-between py-2 border-b border-slate-100 last:border-0'
              >
                <div className='flex items-center gap-3'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center'
                    style={{ backgroundColor: payment.color + '20' }}
                  >
                    <IconComponent size={18} style={{ color: payment.color }} />
                  </div>
                  <div>
                    <p className='text-xs font-medium text-slate-800'>
                      {payment.name}
                    </p>
                    <p className='text-[10px] text-slate-500'>
                      {payment.category} • {payment.daysAgo} days ago
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-xs font-semibold text-slate-800'>
                    ${payment.amount.toFixed(2)} {payment.currency}
                  </p>
                  <span
                    className={`text-[10px] bg-${statusColor}-100 text-${statusColor}-700 px-2 py-0.5 rounded-full`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
