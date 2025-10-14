import { BudgetData } from '../types/budgets.types';

export const budgetsData: BudgetData = {
  totalBudget: 850,
  totalSpent: 650.75,
  remaining: 199.25,

  categories: [
    {
      Id: '1',
      name: 'Food & Dining',
      icon: 'Utensils',
      color: '#4f46e5',
      spent: 650.75,
      total: 850,
      percentage: 76.5,
      period:'Weekly',
    },
    {
      Id: '2',
      name: 'Shopping',
      icon: 'ShoppingCart',
      color: '#8b5cf6',
      spent: 320,
      total: 500,
      percentage: 64,
      period:'Monthly',
    },
    {
      Id: '3',
      name: 'Transportation',
      icon: 'Car',
      color: '#ec4899',
      spent: 820.5,
      total: 1000,
      percentage: 82,
      period:'Monthly',
    },
    {
      Id: '4',
      name: 'Entertainment',
      icon: 'Film',
      color: '#06b6d4',
      spent: 180,
      total: 300,
      percentage: 60,
      period:'Weekly',
    },
  ],

  spendingTrend: [
    { month: '1 Jan', amount: 120 },
    { month: '3 Jan', amount: 180 },
    { month: '5 Jan', amount: 160 },
    { month: '7 Jan', amount: 220 },
    { month: '9 Jan', amount: 190 },
    { month: '11 Jan', amount: 280 },
    { month: '13 Jan', amount: 240 },
    { month: '15 Jan', amount: 320 },
  ],
};
