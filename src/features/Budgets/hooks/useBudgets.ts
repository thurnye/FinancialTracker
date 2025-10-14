/**
 * Budgets Hooks
 * Custom hooks for managing budget state and API calls
 */

// import { useState, useEffect, useCallback } from 'react';
// import { budgetsApiService } from '../services/budgets.api.service';
// import { BudgetCategory, BudgetData, SpendingTrendData } from '../types/budgets.types';

// // ========== Budget Categories Hook ==========

// export const useBudgetCategories = () => {
//   const [categories, setCategories] = useState<BudgetCategory[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await budgetsApiService.getCategories();
//       setCategories(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch budget categories');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createCategory = useCallback(async (data: Omit<BudgetCategory, 'id' | 'spent' | 'percentage'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newCategory = await budgetsApiService.createCategory(data);
//       setCategories((prev) => [...prev, newCategory]);
//       return newCategory;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create budget category');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateCategory = useCallback(async (id: string, data: Partial<BudgetCategory>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedCategory = await budgetsApiService.updateCategory(id, data);
//       setCategories((prev) =>
//         prev.map((category) => (category.id === id ? updatedCategory : category))
//       );
//       return updatedCategory;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update budget category');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteCategory = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await budgetsApiService.deleteCategory(id);
//       setCategories((prev) => prev.filter((category) => category.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete budget category');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   return {
//     categories,
//     loading,
//     error,
//     refetch: fetchCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory,
//   };
// };

// // ========== Spending Trend Hook ==========

// export const useSpendingTrend = () => {
//   const [spendingTrend, setSpendingTrend] = useState<SpendingTrendData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchSpendingTrend = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await budgetsApiService.getSpendingTrend();
//       setSpendingTrend(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch spending trend');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSpendingTrend();
//   }, [fetchSpendingTrend]);

//   return {
//     spendingTrend,
//     loading,
//     error,
//     refetch: fetchSpendingTrend,
//   };
// };

// // ========== Complete Budget Data Hook ==========

// export const useBudgetData = () => {
//   const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchBudgetData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await budgetsApiService.getAllBudgetData();
//       setBudgetData(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch budget data');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBudgetData();
//   }, [fetchBudgetData]);

//   return {
//     budgetData,
//     loading,
//     error,
//     refetch: fetchBudgetData,
//   };
// };

// // ========== Budget Summary Hook ==========

// export const useBudgetSummary = () => {
//   const [summary, setSummary] = useState<Pick<BudgetData, 'totalBudget' | 'totalSpent' | 'remaining'> | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchSummary = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await budgetsApiService.getBudgetSummary();
//       setSummary(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch budget summary');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSummary();
//   }, [fetchSummary]);

//   return {
//     summary,
//     loading,
//     error,
//     refetch: fetchSummary,
//   };
// };
