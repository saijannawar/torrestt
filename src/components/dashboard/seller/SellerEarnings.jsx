import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

const SellerEarnings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h1>
      
      {/* Balance Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign size={32} />
        </div>
        <p className="text-gray-500 font-medium">Available Balance</p>
        <h2 className="text-5xl font-bold text-gray-900 my-4">$0.00</h2>
        <button disabled className="bg-gray-100 text-gray-400 px-6 py-2 rounded-lg font-bold cursor-not-allowed">
            Withdraw Funds
        </button>
        <p className="text-xs text-gray-400 mt-4">Minimum withdrawal amount is $50.00</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
        <AlertCircle className="text-blue-600 shrink-0" />
        <div>
            <h4 className="font-bold text-blue-900 text-sm">Payout System Update</h4>
            <p className="text-sm text-blue-800 mt-1">
                We are currently upgrading our payout system to support direct bank transfers. 
                Your earnings are safe and tracking normally. Withdrawals will be enabled soon.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SellerEarnings;