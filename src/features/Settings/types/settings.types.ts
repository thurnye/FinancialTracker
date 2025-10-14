import * as LucideIcons from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: keyof typeof LucideIcons;
  color: string;
}

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  type: 'bank' | 'card';
  verified: boolean;
}

export interface BankData {
  routingNumber: string;
  accountNumber: string;
  fullName: string;
}

export interface CardData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface ProfileFormData {
  avatar: FileList;
}

export interface SecurityFormData {
  oldPassword: string;
  newPassword: string;
}

export interface PersonalInfoFormData {
  FirstName: string;
  LastName: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
}

export interface UserProfile {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  avatar: string;
}
