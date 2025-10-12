export interface ReferralLevel {
  id: string;
  level: string;
  members: number;
  earnings: number;
  status: 'active' | 'inactive';
}

export interface AffiliatesData {
  credit: number;
  earnings: number;
  referralLink: string;
  levels: ReferralLevel[];
}
