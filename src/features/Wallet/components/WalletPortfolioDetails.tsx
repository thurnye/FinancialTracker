import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores/stores';
import { CreditCard, Inbox } from 'lucide-react';
import { Wallet } from '../types/wallet.types';
import { useNavigate } from 'react-router-dom';

interface IWalletPortfolioDetails {
  id: string;
}

export default function WalletPortfolioDetails({
  id,
}: IWalletPortfolioDetails) {
  const navigate = useNavigate();
  const { wallets, loading } = useSelector((state: RootState) => state.wallet);
  const [walletItem, setWalletItem] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const foundWallet = wallets.find((el) => el.id === id);
      setWalletItem(foundWallet);
    }
  }, [id, wallets]);





  // Empty state when no wallet is selected
  if (!walletItem && !loading && wallets.length > 0) {
    return (
      <div className='bg-white rounded-lg p-8 shadow-sm border border-slate-200 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center'>
            <Inbox size={40} className='text-slate-400' />
          </div>
        </div>
        <h3 className='text-xl font-semibold text-slate-700 mb-2'>Select a Wallet</h3>
        <p className='text-sm text-slate-500'>
          Choose a wallet from the list to view its details
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {walletItem && (
        <>
          <div className='d-flex align-center justify-between bg-white rounded-xl p-2 px-4 mb-3 shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{walletItem.walletName}</h3>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => navigate(`/settings/bank-account`)}
                className='p-1.5 hover:bg-blue-100 rounded-lg transition-colors'
                title='Edit goal'
              >
                Manage Wallet
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {/* Left Side - Balance Info */}
            <div className='lg:col-span-6'>
              <div className='relative rounded-xl p-4 mb-3 bg-white shadow-md hover:shadow-xl transition-shadow'>
                {/* Total Balance */}
                <div className='mb-3'>
                  <p className='text-[10px] text-slate-600 mb-0.5'>Total Balance</p>
                  <h3 className='text-xl font-bold text-slate-800'>
                    ${(walletItem.balance || 0).toLocaleString()}
                  </h3>
                </div>

                {/* Additional Info */}
                <div className='mt-3 pt-3 border-t border-slate-200'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-[10px] text-slate-500'>Bank Name</p>
                      <p className='text-sm font-semibold text-slate-800'>
                        {walletItem.bankName}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-[10px] text-slate-500'>Wallet Type</p>
                      <p className='text-sm font-semibold text-slate-800'>
                        {walletItem.walletType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Wallet Card */}
            <div className='lg:col-span-6'>
              <div className='relative rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-indigo-600 to-purple-700'>
                {/* Card Type Badge */}
                <div className='flex justify-between items-start mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-medium'>
                    {walletItem.cardType || 'CARD'}
                  </div>
                  <CreditCard size={24} className='opacity-80' />
                </div>

                {/* Account Number */}
                <div className='mb-4'>
                  <p className='text-xs tracking-wider font-mono'>
                    {walletItem.accountNumber}
                  </p>
                </div>

                {/* Card Footer */}
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-[10px] opacity-70 mb-0.5'>Currency</p>
                    <p className='text-xs font-medium'>{walletItem.currency || 'USD'}</p>
                  </div>
                  {walletItem.creditLimit && (
                    <div className='text-right'>
                      <p className='text-[10px] opacity-70 mb-0.5'>Credit Limit</p>
                      <p className='text-xs font-medium'>
                        ${walletItem.creditLimit.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {walletItem.creditLimit && (
              <div className='lg:col-span-6 bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'>
                <p className='text-xs text-slate-600 mb-1'>Available Credit</p>
                <h3 className='text-xl font-bold text-slate-800 mb-1 py-3'>
                  ${((walletItem.creditLimit || 0) - (walletItem.balance || 0)).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
                <div className='flex items-center gap-1 border-top py-2'>
                  <span className='text-xs text-slate-500'>
                    of ${walletItem.creditLimit.toLocaleString()} limit
                  </span>
                </div>
              </div>
            )}

            {walletItem.interestRate && (
              <div className='lg:col-span-6 bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'>
                <p className='text-xs text-slate-600 mb-1'>Interest Rate</p>
                <h3 className='text-xl font-bold text-slate-800 mb-1 py-3'>
                  {walletItem.interestRate}%
                </h3>
                <div className='flex items-center gap-1 border-top py-2'>
                  <span className='text-xs text-slate-500'>Annual Rate</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
