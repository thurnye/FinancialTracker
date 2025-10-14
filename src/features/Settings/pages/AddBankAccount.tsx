import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { AppDispatch, RootState } from '../../../app/stores/stores';
import { Landmark, CreditCard, Pencil, Trash2 } from 'lucide-react';
import { Wallet } from '../../Wallet/types/wallet.types';
import { fetchWallets, deleteWallet } from '../../Wallet/redux/wallet.slice';
import AddBankModal from '../components/AddBankModal';
import AddCreditCardModal from '../components/AddCreditCardModal';

export default function AddBankAccount() {
  const dispatch = useDispatch<AppDispatch>();
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    dispatch(fetchWallets());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await dispatch(deleteWallet(id)).unwrap();
        toast.success('Account deleted successfully!');
      } catch (error) {
        console.error('Failed to delete wallet:', error);
        toast.error('Failed to delete account. Please try again.');
      }
    }
  };

  const handleEdit = (wallet: Wallet) => {
    setEditingWallet(wallet);
    if (wallet.walletType === 'Bank') {
      setShowBankModal(true);
    } else if (wallet.walletType === 'Credit') {
      setShowCardModal(true);
    }
  };

  const handleCloseModals = () => {
    setShowBankModal(false);
    setShowCardModal(false);
    setEditingWallet(null);
  };

  return (
    <div className='space-y-4 pb-6'>
      <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
        <h3 className='text-lg font-bold text-slate-900 mb-6'>
          Add Bank Account or Card
        </h3>

        {/* Account List */}
        <div className='space-y-4 mb-6'>
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className='flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center'>
                  {wallet.walletType === 'Bank' ? (
                    <Landmark className='text-white' size={24} />
                  ) : (
                    <CreditCard className='text-white' size={24} />
                  )}
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>
                    {wallet.walletName}
                  </p>
                  <p className='text-xs text-slate-600'>
                    {wallet.walletType} {wallet.accountNumber}
                  </p>
                  {wallet.isActive && (
                    <span className='inline-block mt-1 text-xs font-medium text-emerald-600'>
                      Active
                    </span>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleEdit(wallet)}
                  className='px-3 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium flex items-center gap-1'
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(wallet.id)}
                  className='px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-1'
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-3'>
          <button
            onClick={() => setShowBankModal(true)}
            className='flex-1 min-w-[200px] bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold'
          >
            Add New Bank
          </button>
          <button
            onClick={() => setShowCardModal(true)}
            className='flex-1 min-w-[200px] bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold'
          >
            Add New Card
          </button>
        </div>
      </div>

      {/* Modals */}
      {showBankModal && (
        <AddBankModal
          isOpen={showBankModal}
          onClose={handleCloseModals}
          editingWallet={editingWallet}
        />
      )}
      {showCardModal && (
        <AddCreditCardModal
          isOpen={showCardModal}
          onClose={handleCloseModals}
          editingWallet={editingWallet}
        />
      )}
    </div>
  );
}
