import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

export function Refund() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-6 pb-4 flex items-center gap-4 bg-card sticky top-0 z-10">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Refund Request</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold mb-6">Payment Type</h2>
            <div className="space-y-3">
              <button onClick={() => setStep(2)} className="w-full p-4 bg-card border border-border rounded-2xl text-left font-medium active:bg-muted transition-colors">
                Card Payment
              </button>
              <button onClick={() => setStep(2)} className="w-full p-4 bg-card border border-border rounded-2xl text-left font-medium active:bg-muted transition-colors">
                Kaspi.kz
              </button>
              <button onClick={() => setStep(2)} className="w-full p-4 bg-card border border-border rounded-2xl text-left font-medium active:bg-muted transition-colors">
                Wallet Balance
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold mb-6">Personal Info</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                <input type="text" className="w-full bg-muted px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">IIN</label>
                <input type="number" className="w-full bg-muted px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" placeholder="12 digits" />
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-4 active:scale-95 transition-transform">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-2xl font-bold mb-6">Bank Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">IBAN</label>
                <input type="text" className="w-full bg-muted px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" placeholder="KZ..." />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Bank Name</label>
                <input type="text" className="w-full bg-muted px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" placeholder="Kaspi Bank" />
              </div>
              <button onClick={() => navigate('/profile')} className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-4 active:scale-95 transition-transform">
                Submit Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
