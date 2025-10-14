import * as LucideIcons from 'lucide-react';

// Main Wallet interface matching backend
export interface Wallet {
  id: string;
  userId?: string;
  categoryId?: string | null;
  walletName: string;
  walletType: string; // e.g. "Bank", "Credit", "Digital"
  accountNumber: string;
  bankName: string;
  currency?: string;
  balance?: number | null;
  creditLimit?: number | null;
  interestRate?: number | null;
  lastTransactionDate?: string | null;
  paymentDueDate?: string | null;
  cardType?: string | null; // e.g. "Visa", "Mastercard"
  expiryDate?: string | null;
  cvv?: number | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: string;
    type: string;
    name: string;
    icon: string;
    color: string;
  };
}

// Legacy interface for UI components
export interface WalletAccount {
  id: string;
  type: 'savings' | 'checking' | 'investment' | 'emergency';
  name: string;
  balance: number;
  icon: keyof typeof LucideIcons;
  color: string;
}

export interface ICreditCard {
  id: string;
  name: string;
  cardNumber: string;
  balance: number;
  limit: number;
  expiryDate: string;
  cardholderName: string;
  isVisa?: boolean;
  meta: {
    id: string;
    title: string;
    amount: number | string;
    change: number;
    changePercentage: number;
  }[];
}

export interface TransactionItem {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  icon: keyof typeof LucideIcons;
  color: string;
}

export interface WalletData {
  accounts: WalletAccount[];
  creditCards: ICreditCard[];
  transactions: TransactionItem[];
}
