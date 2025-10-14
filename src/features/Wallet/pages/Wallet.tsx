import { useState } from 'react';
import WalletPortfolio from '../components/WalletPortfolio';
import WalletPortfolioDetails from '../components/WalletPortfolioDetails';
import WalletPortfolioTransactions from '../components/WalletPortfolioTransactions';
import { Outlet } from 'react-router-dom';

export default function Wallet() {
  return (
    <div className='space-y-4 pb-6'>
      <Outlet/>
    </div>
  );
}
