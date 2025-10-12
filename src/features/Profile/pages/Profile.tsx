import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const paymentMethods = [
    { id: '1', name: 'Chase Bank', type: 'Bank', last4: '****', isDefault: true },
    { id: '2', name: 'American Express', type: 'Card', last4: '1234', isDefault: false },
    { id: '3', name: 'Visa Card', type: 'Card', last4: '5678', isDefault: false },
    { id: '4', name: 'PayPal', type: 'Digital', last4: 'user@mail.com', isDefault: false },
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

      
    </div>
  );
}
