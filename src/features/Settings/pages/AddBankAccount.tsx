import React, { useState } from 'react';
import { Landmark, CreditCard, Pencil, Trash2 } from 'lucide-react';
import { bankAccounts as initialBankAccounts } from '../utils/settings.data';
import { BankAccount } from '../types/settings.types';
import AddBankModal from '../components/AddBankModal';
import AddCreditCardModal from '../components/AddCreditCardModal';

export default function AddBankAccount() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialBankAccounts);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setBankAccounts(bankAccounts.filter(account => account.id !== id));
    }
  };

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    if (account.type === 'bank') {
      setShowBankModal(true);
    } else {
      setShowCardModal(true);
    }
  };

  const handleCloseModals = () => {
    setShowBankModal(false);
    setShowCardModal(false);
    setEditingAccount(null);
  };

  return (
    <div className='space-y-4 pb-6'>
      <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
        <h3 className='text-lg font-bold text-slate-900 mb-6'>
          Add Bank Account or Card
        </h3>

        {/* Account List */}
        <div className='space-y-4 mb-6'>
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className='flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center'>
                  {account.type === 'bank' ? (
                    <Landmark className='text-white' size={24} />
                  ) : (
                    <CreditCard className='text-white' size={24} />
                  )}
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>
                    {account.name}
                  </p>
                  <p className='text-xs text-slate-600'>
                    {account.type === 'bank' ? 'Bank' : 'Credit Card'} {account.accountNumber}
                  </p>
                  {account.verified && (
                    <span className='inline-block mt-1 text-xs font-medium text-emerald-600'>
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleEdit(account)}
                  className='px-3 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium flex items-center gap-1'
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
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
          editingAccount={editingAccount}
        />
      )}
      {showCardModal && (
        <AddCreditCardModal
          isOpen={showCardModal}
          onClose={handleCloseModals}
          editingAccount={editingAccount}
        />
      )}
    </div>
  );
}
