export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  birthdate: string;
  gender: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isActive?: boolean;
  // Legacy fields for backward compatibility
  name?: string;
  role?: 'individual' | 'restaurant';
  location?: string;
  completedTrades?: number;
  rating?: number;
  bio?: string;
}

export interface IUserLoginInfo {
    email: string;
    password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  birthdate: string;
  gender: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
