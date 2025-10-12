import React, { useEffect, useState } from 'react';
import { CreditCard, TrendingDown, TrendingUp } from 'lucide-react';
import { walletData } from '../utils/wallet.data';
import { ICreditCard } from '../types/wallet.types';

interface IWalletPortfolioDetails {
  id: string;
}

export default function WalletPortfolioDetails({
  id,
}: IWalletPortfolioDetails) {
  const { creditCards } = walletData;
  const [card, setCard] = useState<ICreditCard | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const foundCard = creditCards.find((el) => el.id === id);
      setCard(foundCard);
    }
  }, [id, creditCards]);

  return (
    <div className='space-y-3'>
      {card && (
        <>
          <div className='rounded-xl p-2 px-4  shadow-sm hover:shadow-xl transition-shadow'>
            <h3 className='text-xl font-bold'>{card.name}</h3>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {/* Left Side - Account List */}
            <div className='lg:col-span-6'>
              <div
                className={`relative rounded-xl p-4 mb-3 shadow-md hover:shadow-xl transition-shadow `}
              >
                {/* Total Balance */}
                <div className='mb-3'>
                  <p className='text-[10px] opacity-80 mb-0.5'>Total Balance</p>
                  <h3 className='text-xl font-bold'>
                    ${card.balance.toLocaleString()}
                  </h3>
                </div>

                {/* Card Footer */}
                {/* Available Balance Section */}
                <div className='mt-3 pt-3 border-t border-white/20'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-[10px] opacity-70'>
                        Available Balance
                      </p>
                      <p className='text-sm font-semibold'>
                        ${(card.limit - card.balance).toLocaleString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-[10px] opacity-70'>
                        This Month's Spending
                      </p>
                      <p className='text-sm font-semibold'>$3,287.45</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Credit Cards */}
            <div className='lg:col-span-6'>
              <div
                className={`relative rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow ${'bg-gradient-to-br from-indigo-600 to-purple-700'}`}
              >
                {/* Card Type Badge */}
                <div className='flex justify-between items-start mb-4'>
                  <div className='bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-medium'>
                    {card.isVisa ? 'VISA' : 'MASTERCARD'}
                  </div>
                  <CreditCard size={24} className='opacity-80' />
                </div>

                {/* Card Number */}
                <div className='mb-4'>
                  <p className='text-xs tracking-wider font-mono'>
                    {card.cardNumber}
                  </p>
                </div>

                {/* Card Footer */}
                <div className='flex justify-between items-center '>
                  <div>
                    <p className='text-[10px] opacity-70 mb-0.5'>
                      Cardholder Name
                    </p>
                    <p className='text-xs font-medium'>{card.cardholderName}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] opacity-70 mb-0.5'>Exp. Date</p>
                    <p className='text-xs font-medium'>{card.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {/* Left Side - Account List */}
            {/* <div className='lg:col-span-6'>
              <div
                className={`relative rounded-xl p-4 mb-3 shadow-md hover:shadow-xl transition-shadow `}
              >
              
              </div>
            </div> */}
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {card.meta.map((card) => (
              <div
                key={card.id}
                className=' lg:col-span-6 bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
              >
                <p className='text-xs text-slate-600 mb-1'>{card.title}</p>
                <h3 className='text-xl font-bold text-slate-800 mb-1 py-3'>
                  {typeof card.amount === 'number'
                    ? `$${card.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : card.amount || ''}
                </h3>

                <div className='flex items-center gap-1 border-top py-2'>
                  {card.change >= 0 ? (
                    <>
                      <TrendingUp size={16} className='text-emerald-600' />
                      <span className='text-sm text-emerald-600'>
                        +${Math.abs(card.change).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={16} className='text-red-600' />
                      <span className='text-sm text-red-600'>
                        -${Math.abs(card.change).toFixed(2)}
                      </span>
                    </>
                  )}
                  <span className='text-xs text-slate-500 ml-1'>
                    last month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
