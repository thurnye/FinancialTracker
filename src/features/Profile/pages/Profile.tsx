import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const paymentMethods = [
    { id: '1', name: 'Chase Bank', type: 'Bank', last4: '****', isDefault: true },
    { id: '2', name: 'American Express', type: 'Card', last4: '1234', isDefault: false },
    { id: '3', name: 'Visa Card', type: 'Card', last4: '5678', isDefault: false },
    { id: '4', name: 'PayPal', type: 'Digital', last4: 'user@mail.com', isDefault: false },
  ];

  const chartData = [
    { month: '1 Jan', amount: 500 },
    { month: '5 Jan', amount: 800 },
    { month: '9 Jan', amount: 1200 },
    { month: '13 Jan', amount: 1000 },
    { month: '17 Jan', amount: 1500 },
    { month: '21 Jan', amount: 1800 },
    { month: '25 Jan', amount: 2100 },
    { month: '29 Jan', amount: 2345 },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-emerald-500"
          />
          <div>
            <h2 className="text-lg font-bold text-slate-800">Emily Rose Thompson</h2>
            <p className="text-xs text-slate-600">emily.thompson@email.com</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Member since March 2023</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-600 mb-0.5">Account Type</p>
            <p className="text-sm font-semibold text-slate-800">Premium</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-0.5">Spent</p>
            <p className="text-sm font-semibold text-slate-800">$2,345.67</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-0.5">Budget</p>
            <p className="text-sm font-semibold text-slate-800">$3,800.00</p>
          </div>
        </div>
      </div>

      {/* Payment Methods & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-3">Payment Methods</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {method.type.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">{method.name}</p>
                    <p className="text-[10px] text-slate-500">{method.last4}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Spending Chart */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-3">Chase Bank</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
