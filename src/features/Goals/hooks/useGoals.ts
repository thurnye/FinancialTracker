// /**
//  * Goals Hooks
//  * Custom hooks for managing goals state and API calls
//  */

// import { useState, useEffect, useCallback } from 'react';
// import { goalsApiService } from '../services/goals.api.service';
// import { Goal, GoalMarket, GoalHistory, GoalsData } from '../types/goals.types';

// export const useGoals = () => {
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchGoals = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await goalsApiService.getGoals();
//       setGoals(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch goals');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createGoal = useCallback(async (data: Omit<Goal, 'id' | 'saved' | 'percentage'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newGoal = await goalsApiService.createGoal(data);
//       setGoals((prev) => [...prev, newGoal]);
//       return newGoal;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create goal');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateGoal = useCallback(async (id: string, data: Partial<Goal>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedGoal = await goalsApiService.updateGoal(id, data);
//       setGoals((prev) => prev.map((goal) => (goal.id === id ? updatedGoal : goal)));
//       return updatedGoal;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update goal');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteGoal = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await goalsApiService.deleteGoal(id);
//       setGoals((prev) => prev.filter((goal) => goal.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete goal');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchGoals();
//   }, [fetchGoals]);

//   return {
//     goals,
//     loading,
//     error,
//     refetch: fetchGoals,
//     createGoal,
//     updateGoal,
//     deleteGoal,
//   };
// };

// export const useGoalMarkets = () => {
//   const [markets, setMarkets] = useState<GoalMarket[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchMarkets = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await goalsApiService.getMarkets();
//       setMarkets(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch markets');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMarkets();
//   }, [fetchMarkets]);

//   return { markets, loading, error, refetch: fetchMarkets };
// };

// export const useGoalHistory = () => {
//   const [history, setHistory] = useState<GoalHistory[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchHistory = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await goalsApiService.getHistory();
//       setHistory(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch history');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHistory();
//   }, [fetchHistory]);

//   return { history, loading, error, refetch: fetchHistory };
// };

// export const useGoalsData = () => {
//   const [goalsData, setGoalsData] = useState<GoalsData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchGoalsData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await goalsApiService.getAllGoalsData();
//       setGoalsData(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch goals data');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchGoalsData();
//   }, [fetchGoalsData]);

//   return { goalsData, loading, error, refetch: fetchGoalsData };
// };
