import * as LucideIcons from 'lucide-react';

export interface IconOption {
  value: keyof typeof LucideIcons;
  label: string;
}

export const categoryIcons: IconOption[] = [
  { value: 'ShoppingCart', label: 'Shopping' },
  { value: 'Utensils', label: 'Food' },
  { value: 'Car', label: 'Transportation' },
  { value: 'Home', label: 'Home' },
  { value: 'Heart', label: 'Health' },
  { value: 'Briefcase', label: 'Work' },
  { value: 'GraduationCap', label: 'Education' },
  { value: 'Plane', label: 'Travel' },
  { value: 'Gamepad2', label: 'Entertainment' },
  { value: 'Gift', label: 'Gifts' },
  { value: 'Shirt', label: 'Clothing' },
  { value: 'Dumbbell', label: 'Fitness' },
  { value: 'Music', label: 'Music' },
  { value: 'Film', label: 'Movies' },
  { value: 'Book', label: 'Books' },
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Smartphone', label: 'Phone' },
  { value: 'Laptop', label: 'Computer' },
  { value: 'Wallet', label: 'Wallet' },
  { value: 'CreditCard', label: 'Card' },
];
