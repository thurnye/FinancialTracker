import { GoalsData } from '../types/goals.types';

export const goalsData: GoalsData = {
  goals: [
    {
      id: '1',
      name: 'New Car',
      target: 25000,
      saved: 10000,
      monthly: 500,
      deadline: 'June 2025',
      percentage: 40,
      icon: 'car',
      color: '#4f46e5',
    },
    {
      id: '2',
      name: 'Starting PC',
      target: 2000,
      saved: 1400,
      monthly: 200,
      deadline: 'March 2025',
      percentage: 70,
      icon: 'monitor',
      color: '#8b5cf6',
    },
    {
      id: '3',
      name: 'Vacation',
      target: 5000,
      saved: 1650,
      monthly: 150,
      deadline: 'August 2025',
      percentage: 33,
      icon: 'plane',
      color: '#06b6d4',
    },
    {
      id: '4',
      name: 'Home Renovation',
      target: 15000,
      saved: 3350,
      monthly: 400,
      deadline: 'December 2025',
      percentage: 22,
      icon: 'home',
      color: '#ec4899',
    },
  ],

  markets: [
    { id: '1', name: 'First Bank', value: 3586, color: '#f59e0b' },
    { id: '2', name: 'Cache App', value: 1686, color: '#8b5cf6' },
    { id: '3', name: 'Capital One', value: 4586, color: '#3b82f6' },
  ],

  history: [
    {
      id: '1',
      date: '07.01.2024',
      wallet: 'Visa',
      description: 'Down Payment',
      amount: 10000,
      status: '01 Visa',
    },
    {
      id: '2',
      date: '07.01.2024',
      wallet: 'Bank Transfer',
      description: 'Savings Contribution',
      amount: 2000,
      status: '02 Visa',
    },
    {
      id: '3',
      date: '07.01.2024',
      wallet: 'Cash',
      description: 'Part time Job',
      amount: 3000,
      status: '03 Visa',
    },
  ],
};
