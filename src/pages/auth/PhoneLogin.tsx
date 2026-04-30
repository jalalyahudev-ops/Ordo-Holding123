import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
  ru: { 
    titlePhone: 'Введите номер телефона', 
    titleEmail: 'Войдите по Email',
    subPhone: 'Мы отправим код подтверждения', 
    subEmail: 'Введите email и пароль',
    btnPhone: 'Получить код',
    btnEmail: 'Войти',
    tabPhone: 'Телефон',
    tabEmail: 'Почта',
    emailPlaceholder: 'Ваш email',
    passPlaceholder: 'Пароль'
  },
  kz: { 
    titlePhone: 'Телефон нөмірін енгізіңіз', 
    titleEmail: 'Email арқылы кіріңіз',
    subPhone: 'Біз растау кодын жібереміз', 
    subEmail: 'Email мен құпия сөзді енгізіңіз',
    btnPhone: 'Код алу',
    btnEmail: 'Кіру',
    tabPhone: 'Телефон',
    tabEmail: 'Пошта',
    emailPlaceholder: 'Сіздің email',
    passPlaceholder: 'Құпия сөз'
  },
  uz: { 
    titlePhone: 'Telefon raqamini kiriting', 
    titleEmail: 'Email orqali kiring',
    subPhone: 'Biz tasdiqlash kodini yuboramiz', 
    subEmail: 'Email va parolni kiriting',
    btnPhone: 'Kodni olish',
    btnEmail: 'Kirish',
    tabPhone: 'Telefon',
    tabEmail: 'Pochta',
    emailPlaceholder: 'Sizning email',
    passPlaceholder: 'Parol'
  },
};

export function PhoneLogin() {
  const navigate = useNavigate();
  const { language, login } = useStore();
  
  const [view, setView] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Login State
  const [countryIdx, setCountryIdx] = useState(4); // Default to UNKNOWN
  const [phone, setPhone] = useState('+');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const country = COUNTRIES[countryIdx];
  const nationalRaw = phone.replace(/[^\d+]/g, '').slice(country.code.length);
  const isValidPhone = country.id !== 'UNKNOWN' && nationalRaw.length === country.nationalDigits;
  const isValidEmail = email.includes('@') && password.length >= 4;
  
  const isValidRegister = regName.trim().length > 2 && regPhone.length > 10 && regEmail.includes('@');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidRegister) {
      setIsLoading(true);
      // Simulate registration delay
      setTimeout(() => {
        setIsLoading(false);
        setEmail(regEmail);
        setPassword('123456');
        alert(`Регистрация (симуляция) успешна!\n\nЛогин: ${regEmail}\nПароль: 123456\n\nТеперь вы можете войти.`);
        setView('login');
        setLoginMethod('email');
      }, 1000);
    }
  };

  const handlePhoneContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPhone) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/verify', { state: { phone } });
      }, 1000);
    }
  };

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      setIsLoading(true);
      
      // Simulate independent login without external site integration
      setTimeout(() => {
        setIsLoading(false);
        // Using a persistent dummy token for local session
        const fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbCIsImlhdCI6MTY5NTMxMDg1MiwKZXhwIjoxNjk1MzE0NDUyfQ.local_dev_token";
        login(email, fakeToken); 
        navigate('/home');
      }, 800);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    let raw = val.replace(/[^\d+]/g, '');

    if (phone.endsWith(' ') && val.length < phone.length) {
      raw = raw.slice(0, -1);
    }

    if (!raw || raw === '+') {
      setPhone('+');
      setCountryIdx(4);
      return;
    }

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
      <button onClick={() => {
        if (view === 'register') setView('login');
        else navigate(-1);
      }} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted mb-6">
        <ChevronLeft className="w-6 h-6" />
      </button>

      {view === 'login' ? (
        <>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {text.titleEmail}
            </h1>
            <p className="text-muted-foreground mb-8">
              {text.subEmail}
            </p>

            <form onSubmit={handleEmailContinue}>
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder={text.emailPlaceholder}
                  className="w-full bg-muted pl-12 pr-4 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
                
                <div className="relative mb-8">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={text.passPlaceholder}
                    className="w-full bg-muted pl-12 pr-12 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <CustomButton 
                  type="submit"
                  disabled={!isValidEmail}
                  isLoading={isLoading}
                >
                  {text.btnEmail}
                </CustomButton>

                <div className="mt-8 text-center text-muted-foreground text-sm">
                  {'Нет аккаунта? '}
                  <button type="button" onClick={() => setView('register')} className="text-primary font-bold">
                    Зарегистрируйтесь сейчас
                  </button>
                </div>
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
          <p className="text-muted-foreground mb-8">Создайте аккаунт, чтобы продолжить. Пароль будет отправлен на вашу почту.</p>
          
          <form onSubmit={handleRegister}>
            {/* ФИО */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="ФИО"
                className="w-full bg-muted px-4 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Телефон */}
            <div className="relative mb-4">
              <input
                type="tel"
                placeholder="Телефон (например, +7 700 000 00 00)"
                className="w-full bg-muted px-4 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
              />
            </div>

            {/* Почта */}
            <div className="relative mb-8">
              <input
                type="email"
                placeholder="Email почта"
                className="w-full bg-muted px-4 py-4 rounded-2xl font-medium text-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <CustomButton 
              type="submit"
              disabled={!isValidRegister}
              isLoading={isLoading}
            >
              Зарегистрироваться
            </CustomButton>
            
            <div className="mt-8 text-center text-muted-foreground text-sm">
              {'Уже есть аккаунт? '}
              <button type="button" onClick={() => setView('login')} className="text-primary font-bold">
                Вернуться ко входу
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
