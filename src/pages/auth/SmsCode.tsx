import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { useStore } from '@/store/useStore';

const t = {
  ru: { title: 'Введите код', sub: 'Код отправлен на', resend: 'Отправить код повторно через', resendBtn: 'Отправить код еще раз', error: 'Неверный код. Попробуйте еще раз.' },
  kz: { title: 'Кодты енгізіңіз', sub: 'Код мына нөмірге жіберілді', resend: 'Кодты қайта жіберу уақыты', resendBtn: 'Кодты қайта жіберу', error: 'Қате код. Қайта көріңіз.' },
  uz: { title: 'Kodni kiriting', sub: 'Kod quyidagi raqamga yuborildi', resend: 'Kodni qayta yuborish vaqti', resendBtn: 'Kodni qayta yuborish', error: 'Noto\'g\'ri kod. Qaytadan urinib ko\'ring.' },
};

export function SmsCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, language } = useStore();
  const phone = location.state?.phone || '+7 700 000 0000';
  
  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const int = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(int);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError(false);
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every(v => v !== '')) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyCode = (fullCode: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (fullCode === '1111') {
        setError(true);
        setCode(['', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        login(phone);
        navigate('/home');
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted mb-8">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{text.title}</h1>
        <p className="text-muted-foreground mb-8">{text.sub} {phone}</p>

        <div className="flex gap-4 justify-center mb-8">
          {code.map((v, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`w-16 h-16 bg-muted rounded-2xl text-center text-2xl font-bold outline-none focus:ring-2 transition-all ${error ? 'ring-2 ring-red-500 text-red-500' : 'focus:ring-primary/50'}`}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              disabled={isLoading}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium animate-in fade-in slide-in-from-top-2">
            {text.error}
          </p>
        )}

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-muted-foreground font-medium">
              {text.resend} 0:{timer.toString().padStart(2, '0')}
            </p>
          ) : (
            <button 
              onClick={() => setTimer(60)}
              className="text-primary font-bold active:scale-95 transition-transform"
            >
              {text.resendBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
