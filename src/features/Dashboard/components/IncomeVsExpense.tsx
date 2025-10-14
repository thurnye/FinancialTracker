import { dashboardData } from '../utils/dashboard.data';
import Card from '../../../components/ui/Card';
import BarChartComponent from '../../../components/charts/BarChartComponent';


export default function IncomeVsExpense() {
     const {
        monthlyBudgets,
        monthlyIncomeExpenses,
      } = dashboardData;

  return (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <Card>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Budgets
              </h3>
              <div className='space-y-3'>
                {monthlyBudgets.map((budget) => (
                  <div key={budget.id}>
                    <div className='flex justify-between items-center mb-1'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='w-2 h-2 rounded-full'
                          style={{ backgroundColor: budget.color }}
                        ></div>
                        <span className='text-xs font-medium text-slate-700'>
                          {budget.name}
                        </span>
                      </div>
                      <span className='text-xs text-slate-600'>
                        ${budget.amount} / ${budget.total}
                      </span>
                    </div>
                    <div className='w-full bg-slate-100 rounded-full h-1.5'>
                      <div
                        className='h-1.5 rounded-full transition-all duration-300'
                        style={{
                          width: `${(budget.amount / budget.total) * 100}%`,
                          backgroundColor: budget.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className='text-base font-semibold text-slate-800 mb-3'>
                Monthly Income vs Expenses
              </h3>
              <BarChartComponent
                data={monthlyIncomeExpenses as any}
                bars={[
                  { dataKey: 'income', fill: '#3b82f6', name: 'Income' },
                  { dataKey: 'expense', fill: '#8b5cf6', name: 'Expense' },
                ]}
                xAxisKey='month'
                height={220}
                showGrid={true}
                showLegend={false}
              />
            </Card>
          </div>
  )
}
