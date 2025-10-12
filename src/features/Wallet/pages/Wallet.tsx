import { useState } from 'react';
import WalletPortfolio from '../components/WalletPortfolio';
import WalletPortfolioDetails from '../components/WalletPortfolioDetails';
import WalletPortfolioTransactions from '../components/WalletPortfolioTransactions';

export default function Wallet() {
  const [walletPortfolioId, setWalletPortfolioId] = useState<string>('1')
  return (
    <div className='space-y-4 pb-6'>
      {/* Accounts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        {/* Left Side - Account List */}
        <div className='lg:col-span-3'>
          <WalletPortfolio setWalletPortfolioId={setWalletPortfolioId}/>
        </div>

        {/* Right Side - Credit Cards */}
        <div className='lg:col-span-9'>
          <WalletPortfolioDetails id={walletPortfolioId}/>
        </div>
      </div>

      {/* Transaction History */}
      <WalletPortfolioTransactions />
    </div>
  );
}
