import React from 'react';
import { Plus } from 'lucide-react';
import { goalsData } from '../utils/goals.data';

export default function Goals() {
  const { goals, markets, history } = goalsData;

  return (
    <div className="space-y-4 pb-6">
      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Goals */}
        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${goal.color}20` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: goal.color }}
                    ></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{goal.name}</h3>
                    <p className="text-xs text-slate-500">{goal.deadline}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-800">
                  {goal.percentage}%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[10px] text-slate-500 mb-0.5">Saved</p>
                  <p className="text-xs font-semibold text-slate-800">
                    ${goal.saved.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-0.5">Monthly</p>
                  <p className="text-xs font-semibold text-slate-800">
                    ${goal.monthly.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-0.5">Target</p>
                  <p className="text-xs font-semibold text-slate-800">
                    ${goal.target.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${goal.percentage}%`,
                    backgroundColor: goal.color,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>${goal.saved.toLocaleString()} saved</span>
                <span>${goal.target.toLocaleString()} goal</span>
              </div>
            </div>
          ))}

          {/* Add New Goal Button */}
          <button className="w-full bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600">
            <Plus size={16} />
            <span className="text-sm font-medium">Add new goal</span>
          </button>
        </div>

        {/* Available by Market & History */}
        <div className="space-y-4">
          {/* Available by Market */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-3">Available by Market</h3>
            <div className="space-y-2">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: market.color }}
                    >
                      <span className="text-white text-[10px] font-bold">
                        {market.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-800">
                      {market.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    ${market.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-3">History</h3>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 pb-2 border-b border-slate-200 mb-2">
              <div className="text-[10px] font-semibold text-slate-600">Date</div>
              <div className="text-[10px] font-semibold text-slate-600">Wallet</div>
              <div className="text-[10px] font-semibold text-slate-600">Description</div>
              <div className="text-[10px] font-semibold text-slate-600 text-right">Amount</div>
            </div>

            {/* History Items */}
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-2 py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors"
                >
                  <div className="text-[10px] text-slate-600">{item.date}</div>
                  <div className="text-[10px] text-slate-600">{item.wallet}</div>
                  <div className="text-[10px] text-slate-700">{item.description}</div>
                  <div className="text-[10px] font-semibold text-slate-800 text-right">
                    +${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
