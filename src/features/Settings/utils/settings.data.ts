import { BankAccount, Category, UserProfile } from '../types/settings.types';
import { categoryColors } from './colors.data';
import { categoryIcons } from './icons.data';

// Re-export colors and icons for convenience
export { categoryColors, categoryIcons };

export const bankAccounts: BankAccount[] = [
  {
    id: '1',
    name: 'Bank of America',
    accountNumber: '************5421',
    type: 'bank',
    verified: true,
  },
  {
    id: '2',
    name: 'Master Card',
    accountNumber: '********5478',
    type: 'card',
    verified: true,
  },
];

export const defaultUserProfile: UserProfile = {
  id: '1',
  FirstName: 'Hafsa',
  LastName: 'Humaira',
  email: 'Hello@example.com',
  address: '123, Central Square, Brooklyn',
  city: 'New York',
  postCode: '25481',
  country: 'United States',
  avatar: 'https://i.pravatar.cc/40',
};

export const countries = [
  { value: 'Select', label: 'Select' },
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
];

export enum CategoryTypes {
  Expense = 'Expense',
  Income = 'Income'
}

export const incomeCategories: Category[] = [
    { id: '1', name: 'Salary', type: 'income', icon: 'Wallet', color: '#10b981' },
    { id: '2', name: 'Business', type: 'income', icon: 'Briefcase', color: '#3b82f6' },
    { id: '3', name: 'Grants', type: 'income', icon: 'Award', color: '#f59e0b' },
    { id: '4', name: 'Gifts', type: 'income', icon: 'Gift', color: '#8b5cf6' },
    { id: '5', name: 'Refund', type: 'income', icon: 'RefreshCw', color: '#ec4899' },
    { id: '6', name: 'Loan', type: 'income', icon: 'HandCoins', color: '#06b6d4' },
    { id: '7', name: 'Other', type: 'income', icon: 'DollarSign', color: '#64748b' },
  ];

export const expenseCategories: Category[] = [
    { id: '1', name: 'Beauty', type: 'expense', icon: 'Sparkles', color: '#06b6d4' },
    { id: '2', name: 'Bills & Fees', type: 'expense', icon: 'Receipt', color: '#3b82f6' },
    { id: '3', name: 'Car', type: 'expense', icon: 'Car', color: '#f59e0b' },
    { id: '4', name: 'Education', type: 'expense', icon: 'GraduationCap', color: '#8b5cf6' },
    { id: '5', name: 'Entertainment', type: 'expense', icon: 'Music', color: '#ec4899' },
    { id: '6', name: 'Family', type: 'expense', icon: 'Users', color: '#10b981' },
    { id: '7', name: 'Food & Drink', type: 'expense', icon: 'Utensils', color: '#ef4444' },
    { id: '8', name: 'Gifts', type: 'expense', icon: 'Gift', color: '#f59e0b' },
    { id: '9', name: 'Insurance', type: 'expense', icon: 'Shield', color: '#3b82f6' },
    { id: '10', name: 'Home', type: 'expense', icon: 'Home', color: '#8b5cf6' },
    { id: '11', name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: '#ec4899' },
    { id: '12', name: 'Sports', type: 'expense', icon: 'Dumbbell', color: '#06b6d4' },
    { id: '13', name: 'Market', type: 'expense', icon: 'ShoppingCart', color: '#10b981' },
    { id: '14', name: 'Travel', type: 'expense', icon: 'Plane', color: '#f59e0b' },
    { id: '15', name: 'Personal', type: 'expense', icon: 'User', color: '#64748b' },
    { id: '16', name: 'Gym', type: 'expense', icon: 'Dumbbell', color: '#ef4444' },
  ];
