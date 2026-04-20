import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy, Share2, Gift } from 'lucide-react';

export function Referral() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-6 pb-4 flex items-center gap-4 bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Referral Program</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gradient-to-br from-[#A2BC3C] to-[#808080] rounded-[32px] p-8 text-white text-center mb-8 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
            <Gift className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Invite & Earn</h2>
          <p className="text-white/90 mb-6 font-medium">Get 2000 ₸ for each friend who joins and makes their first purchase.</p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
            <span className="font-mono text-xl font-bold tracking-widest uppercase">YAYA2024</span>
            <button className="w-10 h-10 bg-white text-[#A2BC3C] rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-lg">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-sm">
            <p className="text-muted-foreground text-sm mb-1">Earned</p>
            <p className="text-2xl font-bold text-primary">0 ₸</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-sm">
            <p className="text-muted-foreground text-sm mb-1">Invited</p>
            <p className="text-2xl font-bold text-primary">0</p>
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-primary/20">
          <Share2 className="w-5 h-5" />
          Share Link
        </button>
      </div>
    </div>
  );
}
