import { Goal, GoalsData } from '../types/goals.types';

// Legacy data structure for visualization - these components will need to be updated
// to fetch from the API instead of using static data
export const goalsData: GoalsData = {
  goals: [
    {
      id: '1',
      goalName: 'New Car',
      targetValue: 25000,
      progress: 40,
      deadline: '2025-06-01',
      isActive: true,
    } as Goal,
    {
      id: '2',
      goalName: 'Starting PC',
      targetValue: 2000,
      progress: 70,
      deadline: '2025-03-01',
      isActive: true,
    } as Goal,
    {
      id: '3',
      goalName: 'Vacation',
      targetValue: 5000,
      progress: 33,
      deadline: '2025-08-01',
      isActive: true,
    } as Goal,
    {
      id: '4',
      goalName: 'Home Renovation',
      targetValue: 15000,
      progress: 22,
      deadline: '2025-12-01',
      isActive: true,
    } as Goal,
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
