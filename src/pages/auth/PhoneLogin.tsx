import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { useStore } from '@/store/useStore';

const COUNTRIES = [
  { id: 'KZ', code: '+7', flag: '🇰🇿', mask: '(###) ###-##-##', nationalDigits: 10 },
  { id: 'UZ', code: '+998', flag: '🇺🇿', mask: '## ###-##-##', nationalDigits: 9 },
  { id: 'RU', code: '+7', flag: '🇷🇺', mask: '(###) ###-##-##', nationalDigits: 10 },
  { id: 'AZ', code: '+994', flag: '🇦🇿', mask: '## ###-##-##', nationalDigits: 9 },
  { id: 'UNKNOWN', code: '', flag: '🌍', mask: '################', nationalDigits: 15 },
];

const t = {
  ru: { title: 'Введите номер телефона', sub: 'Мы отправим код подтверждения', btn: 'Продолжить' },
  kz: { title: 'Телефон нөмірін енгізіңіз', sub: 'Біз растау кодын жібереміз', btn: 'Жалғастыру' },
  uz: { title: 'Telefon raqamini kiriting', sub: 'Biz tasdiqlash kodini yuboramiz', btn: 'Davom etish' },
};

export function PhoneLogin() {
  const navigate = useNavigate();
  const { language } = useStore();
  const [countryIdx, setCountryIdx] = useState(4); // Default to UNKNOWN
  const [phone, setPhone] = useState('+');
  const [isLoading, setIsLoading] = useState(false);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const country = COUNTRIES[countryIdx];
  const nationalRaw = phone.replace(/[^\d+]/g, '').slice(country.code.length);
  const isValid = country.id !== 'UNKNOWN' && nationalRaw.length === country.nationalDigits;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/verify', { state: { phone } });
      }, 1000);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let raw = val.replace(/[^\d+]/g, '');

    // Handle backspace on the space after country code
    if (phone.endsWith(' ') && val.length < phone.length) {
      raw = raw.slice(0, -1);
    }

    if (!raw || raw === '+') {
      setPhone('+');
      setCountryIdx(4);
      return;
    }

    // Auto-prefix logic if user starts typing numbers without +
    if (!raw.startsWith('+')) {
      if (raw.startsWith('8')) raw = '+7' + raw.slice(1);
      else if (raw.startsWith('7')) raw = '+7' + raw.slice(1);
      else if (raw.startsWith('9')) raw = '+' + raw;
      else raw = '+' + raw;
    }

    let matchedCountry = COUNTRIES[4];
    if (raw.startsWith('+998')) matchedCountry = COUNTRIES[1];
    else if (raw.startsWith('+994')) matchedCountry = COUNTRIES[3];
    else if (raw.startsWith('+7')) {
      if (raw.length > 2 && raw[2] !== '7') matchedCountry = COUNTRIES[2]; // RU
      else matchedCountry = COUNTRIES[0]; // KZ
    }

    setCountryIdx(COUNTRIES.indexOf(matchedCountry));

    if (matchedCountry.id === 'UNKNOWN') {
      setPhone(raw);
    } else {
      const natRaw = raw.slice(matchedCountry.code.length).replace(/\D/g, '').slice(0, matchedCountry.nationalDigits);
      let i = 0;
      const formattedNational = matchedCountry.mask.replace(/#/g, () => natRaw[i++] || '').replace(/(?:\D+)$/, '');
      
      if (natRaw.length === 0) {
        setPhone(matchedCountry.code + ' ');
      } else {
        setPhone(`${matchedCountry.code} ${formattedNational}`);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted mb-8">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{text.title}</h1>
        <p className="text-muted-foreground mb-8">{text.sub}</p>

        <form onSubmit={handleContinue}>
          <div className="relative mb-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <span className="text-2xl">{country.flag}</span>
            </div>
            <input
              type="tel"
              className="w-full bg-muted pl-14 pr-4 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={phone}
              onChange={handlePhoneChange}
              autoFocus
            />
          </div>

          <CustomButton 
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
          >
            {text.btn}
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
