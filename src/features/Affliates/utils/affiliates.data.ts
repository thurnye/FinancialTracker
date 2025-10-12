import { AffiliatesData } from '../types/affiliates.types';

export const affiliatesData: AffiliatesData = {
  credit: 50,
  earnings: 311,
  referralLink: 'https://www.donatetrack.com/ref/emily-johnson',

  levels: [
    { id: '1', level: 'Bronze', members: 102, earnings: 50, status: 'active' },
    { id: '2', level: 'Silver', members: 75, earnings: 100, status: 'active' },
    { id: '3', level: 'Gold', members: 45, earnings: 150, status: 'active' },
  ],
};
