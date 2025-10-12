export interface WalletAccount {
  id: string;
  type: 'savings' | 'checking' | 'investment' | 'emergency';
  name: string;
  balance: number;
  icon: string;
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
  icon: string;
  color: string;
}

export interface WalletData {
  accounts: WalletAccount[];
  creditCards: ICreditCard[];
  transactions: TransactionItem[];
}
