import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStore();
  const phone = location.state?.phone || '7000000000';
  
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every(v => v !== '')) {
      // Simulate verification
      setTimeout(() => {
        login(`+7 ${phone}`);
        navigate('/home');
      }, 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted mb-8">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Verify code</h1>
        <p className="text-muted-foreground mb-8">Code sent to +7 {phone}</p>

        <div className="flex gap-4 justify-center mb-8">
          {code.map((v, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              type="text"
              maxLength={1}
              className="w-16 h-16 bg-muted rounded-2xl text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        <div className="text-center">
          <button className="text-primary font-medium">Resend code in 0:59</button>
        </div>
      </div>
    </div>
  );
}
