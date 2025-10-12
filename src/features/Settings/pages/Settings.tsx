import React, { useState } from 'react';
import { Edit2, Trash2, Check, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('categories');

  const tabs = [
    'Account',
    'General',
    'Profile',
    'Add Bank',
    'Security',
    'Session',
    'Categories',
    'Connection',
    'API',
    'Support',
  ];

  const incomeCategories: Category[] = [
    { id: '1', name: 'Salary', type: 'income', color: '#10b981' },
    { id: '2', name: 'Business', type: 'income', color: '#3b82f6' },
    { id: '3', name: 'Grants', type: 'income', color: '#f59e0b' },
    { id: '4', name: 'Gifts', type: 'income', color: '#8b5cf6' },
    { id: '5', name: 'Refund', type: 'income', color: '#ec4899' },
    { id: '6', name: 'Loan', type: 'income', color: '#06b6d4' },
    { id: '7', name: 'Other', type: 'income', color: '#64748b' },
  ];

  const expenseCategories: Category[] = [
    { id: '1', name: 'Beauty', type: 'expense', color: '#06b6d4' },
    { id: '2', name: 'Bills & Fees', type: 'expense', color: '#3b82f6' },
    { id: '3', name: 'Car', type: 'expense', color: '#f59e0b' },
    { id: '4', name: 'Education', type: 'expense', color: '#8b5cf6' },
    { id: '5', name: 'Entertainment', type: 'expense', color: '#ec4899' },
    { id: '6', name: 'Family', type: 'expense', color: '#10b981' },
    { id: '7', name: 'Food & Drink', type: 'expense', color: '#ef4444' },
    { id: '8', name: 'Gifts', type: 'expense', color: '#f59e0b' },
    { id: '9', name: 'Insurance', type: 'expense', color: '#3b82f6' },
    { id: '10', name: 'Home', type: 'expense', color: '#8b5cf6' },
    { id: '11', name: 'Shopping', type: 'expense', color: '#ec4899' },
    { id: '12', name: 'Sports', type: 'expense', color: '#06b6d4' },
    { id: '13', name: 'Market', type: 'expense', color: '#10b981' },
    { id: '14', name: 'Travel', type: 'expense', color: '#f59e0b' },
    { id: '15', name: 'Personal', type: 'expense', color: '#64748b' },
    { id: '16', name: 'Gym', type: 'expense', color: '#ef4444' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Tabs */}
      <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Create Category Form */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-3">Create a new categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="category name"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
            <select className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Icon</label>
            <select className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Income</option>
              <option>Shopping</option>
              <option>Food</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Color</label>
            <select className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Green</option>
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>
        </div>
        <button className="mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
          Create new category
        </button>
      </div>

      {/* Income Categories */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-3">Income Categories</h3>
        <div className="space-y-2">
          {incomeCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <span className="text-white font-bold text-xs">{category.name.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-slate-800">{category.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-emerald-100 rounded-lg transition-colors">
                  <Check size={14} className="text-emerald-600" />
                </button>
                <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
                  <Edit2 size={14} className="text-blue-600" />
                </button>
                <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-3">Expense Categories</h3>
        <div className="space-y-2">
          {expenseCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <span className="text-white font-bold text-xs">{category.name.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-slate-800">{category.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-emerald-100 rounded-lg transition-colors">
                  <Check size={14} className="text-emerald-600" />
                </button>
                <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
                  <Edit2 size={14} className="text-blue-600" />
                </button>
                <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
