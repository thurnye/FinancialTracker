import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { fetchWallets } from '../redux/wallet.slice';
import WalletPortfolio from '../components/WalletPortfolio';
import WalletPortfolioDetails from '../components/WalletPortfolioDetails';
import WalletPortfolioTransactions from '../components/WalletPortfolioTransactions';
import { Spinner, Alert } from 'react-bootstrap';

export default function WalletOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const { wallets, loading, error } = useSelector((state: RootState) => state.wallet);
  const [walletPortfolioId, setWalletPortfolioId] = useState<string>('1');

  useEffect(() => {
    dispatch(fetchWallets());
  }, [dispatch]);

  if (loading && wallets.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <div className='space-y-4 pb-6'>
      {error && (
        <Alert variant='danger' dismissible>
          {error}
        </Alert>
      )}
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
      <WalletPortfolioTransactions walletId={walletPortfolioId} />
    </div>
  );
}
