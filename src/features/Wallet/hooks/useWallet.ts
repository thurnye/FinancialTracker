// /**
//  * Wallet Hooks
//  * Custom hooks for managing wallet state and API calls
//  */

// import { useState, useEffect, useCallback } from 'react';
// import { walletApiService } from '../services/wallet.api.service';
// import { WalletAccount, ICreditCard, TransactionItem, WalletData } from '../types/wallet.types';

// // ========== Wallet Accounts Hooks ==========

// export const useWalletAccounts = () => {
//   const [accounts, setAccounts] = useState<WalletAccount[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAccounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await walletApiService.getAccounts();
//       setAccounts(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch wallet accounts');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createAccount = useCallback(async (data: Omit<WalletAccount, 'id'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newAccount = await walletApiService.createAccount(data);
//       setAccounts((prev) => [...prev, newAccount]);
//       return newAccount;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create wallet account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateAccount = useCallback(async (id: string, data: Partial<WalletAccount>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedAccount = await walletApiService.updateAccount(id, data);
//       setAccounts((prev) =>
//         prev.map((account) => (account.id === id ? updatedAccount : account))
//       );
//       return updatedAccount;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update wallet account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteAccount = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await walletApiService.deleteAccount(id);
//       setAccounts((prev) => prev.filter((account) => account.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete wallet account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   return {
//     accounts,
//     loading,
//     error,
//     refetch: fetchAccounts,
//     createAccount,
//     updateAccount,
//     deleteAccount,
//   };
// };

// // ========== Credit Cards Hooks ==========

// export const useCreditCards = () => {
//   const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCreditCards = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await walletApiService.getCreditCards();
//       setCreditCards(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch credit cards');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createCreditCard = useCallback(async (data: Omit<ICreditCard, 'id'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newCard = await walletApiService.createCreditCard(data);
//       setCreditCards((prev) => [...prev, newCard]);
//       return newCard;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create credit card');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateCreditCard = useCallback(async (id: string, data: Partial<ICreditCard>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedCard = await walletApiService.updateCreditCard(id, data);
//       setCreditCards((prev) =>
//         prev.map((card) => (card.id === id ? updatedCard : card))
//       );
//       return updatedCard;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update credit card');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteCreditCard = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await walletApiService.deleteCreditCard(id);
//       setCreditCards((prev) => prev.filter((card) => card.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete credit card');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCreditCards();
//   }, [fetchCreditCards]);

//   return {
//     creditCards,
//     loading,
//     error,
//     refetch: fetchCreditCards,
//     createCreditCard,
//     updateCreditCard,
//     deleteCreditCard,
//   };
// };

// // ========== Transactions Hooks ==========

// export const useTransactions = () => {
//   const [transactions, setTransactions] = useState<TransactionItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTransactions = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await walletApiService.getTransactions();
//       setTransactions(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch transactions');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createTransaction = useCallback(async (data: Omit<TransactionItem, 'id'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newTransaction = await walletApiService.createTransaction(data);
//       setTransactions((prev) => [newTransaction, ...prev]);
//       return newTransaction;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create transaction');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateTransaction = useCallback(async (id: string, data: Partial<TransactionItem>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedTransaction = await walletApiService.updateTransaction(id, data);
//       setTransactions((prev) =>
//         prev.map((transaction) => (transaction.id === id ? updatedTransaction : transaction))
//       );
//       return updatedTransaction;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update transaction');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteTransaction = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await walletApiService.deleteTransaction(id);
//       setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete transaction');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   return {
//     transactions,
//     loading,
//     error,
//     refetch: fetchTransactions,
//     createTransaction,
//     updateTransaction,
//     deleteTransaction,
//   };
// };

// // ========== Combined Wallet Data Hook ==========

// export const useWalletData = () => {
//   const [walletData, setWalletData] = useState<WalletData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchWalletData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await walletApiService.getAllWalletData();
//       setWalletData(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch wallet data');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchWalletData();
//   }, [fetchWalletData]);

//   return {
//     walletData,
//     loading,
//     error,
//     refetch: fetchWalletData,
//   };
// };
