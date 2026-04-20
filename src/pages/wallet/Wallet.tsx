import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet as WalletIcon, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Wallet() {
  const navigate = useNavigate();
  const { user, topUpBalance } = useStore();
  const [amount, setAmount] = useState('');

  const presetAmounts = [2000, 5000, 10000, 20000];

  const handleTopUp = () => {
    const val = parseInt(amount);
    if (val >= 100) {
      topUpBalance(val);
      setAmount('');
      // Show success toast here
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7]">
      <div className="px-6 pt-10 pb-5 flex items-center gap-4 bg-white sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-black tracking-tight">Мой кошелек</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-10">
        <div className="bg-gradient-to-br from-[#A2BC3C] to-[#808080] rounded-[32px] p-8 text-white mb-8 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2 text-white/90 relative z-10">
            <WalletIcon className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Текущий баланс</span>
          </div>
          <h2 className="text-4xl font-black relative z-10">{user?.balance.toLocaleString()} ₸</h2>
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
        </div>

        <h3 className="text-lg font-black mb-5 uppercase tracking-wider text-black">Пополнить баланс</h3>
        
        <div className="relative mb-6">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-400">₸</span>
          <input 
            type="number" 
            placeholder="0"
            className="w-full bg-white border border-gray-100 pl-12 pr-6 py-5 rounded-[24px] text-2xl font-black outline-none focus:ring-4 focus:ring-[#A2BC3C]/20 transition-all shadow-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {presetAmounts.map(val => (
            <button 
              key={val}
              onClick={() => setAmount(val.toString())}
              className="bg-white border border-gray-100 py-5 rounded-[24px] font-black text-black active:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              +{val.toLocaleString()} ₸
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-4">Minimum amount is 100 ₸</p>

        <button 
          onClick={handleTopUp}
          disabled={!amount || parseInt(amount) < 100}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Top Up
        </button>
      </div>
    </div>
  );
}
