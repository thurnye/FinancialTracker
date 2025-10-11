export interface ItemInterface {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  type: Array<'barter' | 'auction'>;
  currentBid?: number;
  timeLeft?: string;
  owner?: {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
    rating?:string;
    completedTrades?:string

  };
  ownerId: string;
  createdAt: string;
  status: 'available' | 'traded' | 'reserved' | 'active' | 'completed' | 'pending'; // Extended to include our constants
  isLiked: boolean;
  trending?: boolean;
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor'; // Using our constants
}

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

export interface Trade {
  id: string;
  itemId: string;
  proposedItemId: string;
  proposerId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  itemId: string;
  bidderId: string;
  amount: number;
  timestamp: string;
  status: 'active' | 'winning' | 'outbid';
}