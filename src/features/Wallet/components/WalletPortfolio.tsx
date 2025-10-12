import React,{useState} from 'react';
import { Plus,  Landmark} from 'lucide-react';
import { walletData } from '../utils/wallet.data';
import IconStyle from '../../../components/ui/IconStyle';

interface IWalletPortfolio{
    setWalletPortfolioId: (id: string) => void;
}

export default function WalletPortfolio({setWalletPortfolioId}:IWalletPortfolio) {
  const { accounts } = walletData;
  const [wallet, setWallet] = useState<string>('1')
  
  
  
  return (
    <div className='space-y-3'>
      
      {accounts.map((account) => (
        <div
          key={account.id}
          onClick={() => {
            setWallet(account.id)
            setWalletPortfolioId(account.id)
          }}
          className={`
            ${wallet === account.id ? 'bg-green-100': 'bg-white'}
            rounded-lg p-3 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center'
                style={{ backgroundColor: `${account.color}20` }}
              >
                {/* <div
                  className='w-2 h-2 rounded-full'
                  style={{ backgroundColor: account.color }}
                ></div> */}
                <IconStyle backgroundColor={account.color} shape={<Landmark size={18} />} />

              </div>
              <div>
                <p className='text-xs text-slate-600 mb-0.5'>{account.type}</p>
                <p className='text-base font-semibold text-slate-800'>
                  ${account.balance.toLocaleString()}
                </p>
              </div>
            </div>
            <span className='text-[10px] text-slate-500'>{account.name}</span>
          </div>
        </div>
      ))}

      {/* Add New Account Button */}
      <button className='w-full bg-white rounded-lg p-3 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600'>
        <Plus size={16} />
        <span className='text-sm font-medium'>Add new account</span>
      </button>
    </div>
  );
}