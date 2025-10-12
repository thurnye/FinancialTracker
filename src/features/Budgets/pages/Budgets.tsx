import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { budgetsData } from '../utils/budgets.data';

export default function Budgets() {
  const { categories, spendingTrend, totalBudget, totalSpent, remaining } = budgetsData;

  return (
    <div className="space-y-4 pb-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Budget Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs opacity-90 mb-0.5">Active Budget</p>
              <h2 className="text-2xl font-bold">${totalBudget.toFixed(2)}</h2>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
              Manage
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <p className="text-[10px] opacity-70 mb-0.5">Total Spent</p>
              <p className="text-sm font-semibold">${totalSpent.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-70 mb-0.5">Remaining</p>
              <p className="text-sm font-semibold">${remaining.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-70 mb-0.5">Progress</p>
              <p className="text-sm font-semibold">{((totalSpent / totalBudget) * 100).toFixed(0)}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-1.5">
            <div
              className="bg-white h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Monthly Spending Trend */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={spendingTrend}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '10px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '10px' }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-slate-800">Budget Categories</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-medium">
            <Plus size={14} />
            Add new budget
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border-b border-slate-100 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{category.name}</h4>
                    <p className="text-xs text-slate-500">
                      ${category.spent.toLocaleString()} / ${category.total.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">${category.total - category.spent}</p>
                  <p className="text-[10px] text-slate-500">Remaining</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-slate-600">{category.percentage.toFixed(0)}% used</span>
                  <span className="text-[10px] text-slate-600">
                    {(100 - category.percentage).toFixed(0)}% left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
