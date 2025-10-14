// /**
//  * Settings Hooks
//  * Custom hooks for managing settings state and API calls
//  */

// import { useState, useEffect, useCallback } from 'react';
// import { settingsApiService } from '../services/settings.api.service';
// import { BankAccount, Category, UserProfile } from '../types/settings.types';

// // ========== Bank Accounts Hook ==========

// export const useBankAccounts = () => {
//   const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchBankAccounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await settingsApiService.getBankAccounts();
//       setBankAccounts(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch bank accounts');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createBankAccount = useCallback(async (data: Omit<BankAccount, 'id'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newAccount = await settingsApiService.createBankAccount(data);
//       setBankAccounts((prev) => [...prev, newAccount]);
//       return newAccount;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create bank account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateBankAccount = useCallback(async (id: string, data: Partial<BankAccount>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedAccount = await settingsApiService.updateBankAccount(id, data);
//       setBankAccounts((prev) =>
//         prev.map((account) => (account.id === id ? updatedAccount : account))
//       );
//       return updatedAccount;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update bank account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteBankAccount = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await settingsApiService.deleteBankAccount(id);
//       setBankAccounts((prev) => prev.filter((account) => account.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete bank account');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBankAccounts();
//   }, [fetchBankAccounts]);

//   return {
//     bankAccounts,
//     loading,
//     error,
//     refetch: fetchBankAccounts,
//     createBankAccount,
//     updateBankAccount,
//     deleteBankAccount,
//   };
// };

// // ========== Categories Hook ==========

// export const useCategories = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await settingsApiService.getCategories();
//       setCategories(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch categories');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createCategory = useCallback(async (data: Omit<Category, 'id'>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newCategory = await settingsApiService.createCategory(data);
//       setCategories((prev) => [...prev, newCategory]);
//       return newCategory;
//     } catch (err: any) {
//       setError(err.message || 'Failed to create category');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateCategory = useCallback(async (id: string, data: Partial<Category>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedCategory = await settingsApiService.updateCategory(id, data);
//       setCategories((prev) =>
//         prev.map((category) => (category.id === id ? updatedCategory : category))
//       );
//       return updatedCategory;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update category');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const deleteCategory = useCallback(async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await settingsApiService.deleteCategory(id);
//       setCategories((prev) => prev.filter((category) => category.id !== id));
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete category');
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

// // ========== User Profile Hook ==========

// export const useUserProfile = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProfile = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await settingsApiService.getUserProfile();
//       setProfile(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch user profile');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedProfile = await settingsApiService.updateUserProfile(data);
//       setProfile(updatedProfile);
//       return updatedProfile;
//     } catch (err: any) {
//       setError(err.message || 'Failed to update user profile');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const uploadAvatar = useCallback(async (file: File) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await settingsApiService.uploadAvatar(file);
//       if (profile) {
//         setProfile({ ...profile, avatar: result.avatar });
//       }
//       return result;
//     } catch (err: any) {
//       setError(err.message || 'Failed to upload avatar');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [profile]);

//   const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await settingsApiService.changePassword(oldPassword, newPassword);
//     } catch (err: any) {
//       setError(err.message || 'Failed to change password');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   return {
//     profile,
//     loading,
//     error,
//     refetch: fetchProfile,
//     updateProfile,
//     uploadAvatar,
//     changePassword,
//   };
// };
