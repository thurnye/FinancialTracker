export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'individual' | 'restaurant';
  location: string;
  avatar: string;
  completedTrades: number;
  rating: number;
  bio?:string;
}

export interface IUserLoginInfo {
    email: string;
    password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: 'INDIVIDUAL' | 'RESTAURANT';
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  restaurantName?: string;
  businessRegistrationNumber?: string;
  contactPersonFirstName?: string;
  contactPersonLastName?: string;
  contactPersonPhone?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  preferredCategories?: string[];
  preferredTradeTypes?: string[];
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
