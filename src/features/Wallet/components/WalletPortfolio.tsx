import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import { Plus, Inbox } from 'lucide-react';
import IconStyle from '../../../components/ui/IconStyle';
import { Link } from 'react-router-dom';

interface IWalletPortfolio {
  setWalletPortfolioId: (id: string) => void;
}

export default function WalletPortfolio({
  setWalletPortfolioId,
}: IWalletPortfolio) {
  const { wallets, loading } = useSelector((state: RootState) => state.wallet);
  const [wallet, setWallet] = useState<string>('');

  // Set first wallet as selected when wallets load
  useEffect(() => {
    if (wallets.length > 0 && !wallet) {
      setWallet(wallets[0].id);
      setWalletPortfolioId(wallets[0].id);
    }
  }, [wallets, wallet, setWalletPortfolioId]);

  // Empty state
  if (!loading && wallets.length === 0) {
    return (
      <div className='space-y-4'>
        <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200 text-center'>
          <div className='flex justify-center mb-3'>
            <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center'>
              <Inbox size={32} className='text-slate-400' />
            </div>
          </div>
          <h3 className='text-lg font-semibold text-slate-700 mb-2'>No Wallets Yet</h3>
          <p className='text-sm text-slate-500 mb-4'>
            Create your first wallet to start managing your finances
          </p>
          <Link
            to={'/settings/bank-account'}
            className='inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium'
          >
            <Plus size={16} />
            Create Wallet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {wallets.map((walletItem) => (
        <div
          key={walletItem.id}
          onClick={() => {
            setWallet(walletItem.id);
            setWalletPortfolioId(walletItem.id);
          }}
          className={`
            ${wallet === walletItem.id ? 'bg-green-100' : 'bg-white'}
            rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center'
                style={{ backgroundColor: walletItem.category?.color ? `${walletItem.category.color}20` : '#3b82f620' }}
              >
                <IconStyle
                  backgroundColor={walletItem.category?.color || '#3b82f6'}
                  iconName={(walletItem.category?.icon as keyof typeof import('lucide-react')) || 'Wallet'}
                  size={18}
                />
              </div>
              <div>
                <p className='text-xs text-slate-600 mb-0.5'>{walletItem.walletType}</p>
                <p className='text-base font-semibold text-slate-800'>
                  ${(walletItem.balance || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <span className='text-[10px] text-slate-500'>{walletItem.walletName}</span>
          </div>
        </div>
      ))}

      {/* Add New Wallet Button */}
      <Link
        to={'/wallet/add-wallet'}
        className='w-full bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600'
      >
        <Plus size={16} />
        <span className='text-sm font-medium'>Add new wallet</span>
      </Link>
    </div>
  );
}
