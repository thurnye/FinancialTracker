export interface IDonationData {
  id?: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
}

export interface IDonation extends IDonationData {
  id: string;
}
