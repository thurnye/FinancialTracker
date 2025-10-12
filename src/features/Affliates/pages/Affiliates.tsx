import React from 'react';
import { Copy, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { affiliatesData } from '../utils/affiliates.data';

export default function Affiliates() {
  const { credit, earnings, referralLink, levels } = affiliatesData;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Your Credit</p>
          <h3 className="text-2xl font-bold text-slate-800">${credit}</h3>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Earnings</p>
          <h3 className="text-2xl font-bold text-slate-800">${earnings}</h3>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-3">Referral Link</h3>
        <p className="text-xs text-slate-600 mb-3">
          Earn 10% of the Extra you refer through the online form when they upgrade to a Plus or Pay-as-you-go plan. Only applies to new referrals that are not yet started.
        </p>

        {/* Link Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Copy size={14} />
            Copy
          </button>
        </div>

        {/* Social Share */}
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Facebook size={16} />
          </button>
          <button className="w-10 h-10 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center">
            <Twitter size={16} />
          </button>
          <button className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center">
            <Instagram size={16} />
          </button>
          <button className="w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
            <MessageCircle size={16} />
          </button>
        </div>
      </div>

      {/* Referral Levels */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-4">Referral Level</h3>

        <div className="flex justify-between items-center mb-6">
          {levels.map((level, index) => (
            <React.Fragment key={level.id}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1">
                    {level.level.charAt(0)}
                  </div>
                  <span className="text-[10px] text-slate-600 absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    {level.members} {level.level}
                  </span>
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-800">{level.level}</p>
                  <p className="text-[10px] text-slate-600">${level.earnings}</p>
                </div>
              </div>
              {index < levels.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 mb-8"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Current Bonus: <span className="font-semibold text-emerald-600">5%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
