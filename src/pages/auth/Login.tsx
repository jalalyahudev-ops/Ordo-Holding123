import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 9) {
      navigate('/verify', { state: { phone } });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted mb-8">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Enter your phone</h1>
        <p className="text-muted-foreground mb-8">We will send you a 4-digit verification code.</p>

        <form onSubmit={handleContinue}>
          <div className="flex gap-3 mb-6">
            <div className="bg-muted px-4 py-4 rounded-2xl flex items-center justify-center font-medium">
              +7
            </div>
            <input
              type="tel"
              placeholder="700 000 0000"
              className="flex-1 bg-muted px-4 py-4 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />
          </div>

          <button 
            type="submit"
            disabled={phone.length < 10}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
