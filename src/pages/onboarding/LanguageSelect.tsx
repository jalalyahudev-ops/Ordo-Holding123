import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { CustomButton } from '@/components/ui/CustomButton';

const t = {
  ru: { title: 'Выберите язык', sub: 'Тілді таңдаңыз / Tilni tanlang', btn: 'Продолжить' },
  kz: { title: 'Тілді таңдаңыз', sub: 'Выберите язык / Tilni tanlang', btn: 'Жалғастыру' },
  uz: { title: 'Tilni tanlang', sub: 'Выберите язык / Тілді таңдаңыз', btn: 'Davom etish' },
};

export function LanguageSelect() {
  const navigate = useNavigate();
  const { setLanguage } = useStore();
  const [selected, setSelected] = useState<string>('ru');

  useEffect(() => {
    // Auto-detect language from browser/device
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('kk') || browserLang.includes('kz')) {
      setSelected('kz');
    } else if (browserLang.includes('uz')) {
      setSelected('uz');
    } else {
      setSelected('ru');
    }
  }, []);

  const handleContinue = () => {
    setLanguage(selected);
    navigate('/onboarding');
  };

  const text = t[selected as keyof typeof t] || t.ru;

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
          <span className="text-4xl font-bold text-primary">O</span>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{text.title}</h1>
        <h2 className="text-lg text-center text-muted-foreground mb-12">{text.sub}</h2>

        <div className="w-full space-y-4">
          <CustomButton 
            variant={selected === 'ru' ? 'primary' : 'secondary'} 
            onClick={() => setSelected('ru')} 
            className="justify-start px-6"
          >
            <span className="text-2xl mr-4">🇷🇺</span> Русский
          </CustomButton>
          <CustomButton 
            variant={selected === 'kz' ? 'primary' : 'secondary'} 
            onClick={() => setSelected('kz')} 
            className="justify-start px-6"
          >
            <span className="text-2xl mr-4">🇰🇿</span> Қазақша
          </CustomButton>
          <CustomButton 
            variant={selected === 'uz' ? 'primary' : 'secondary'} 
            onClick={() => setSelected('uz')} 
            className="justify-start px-6"
          >
            <span className="text-2xl mr-4">🇺🇿</span> O‘zbekcha
          </CustomButton>
        </div>
      </div>
      <div className="pb-8">
        <CustomButton onClick={handleContinue}>
          {text.btn}
        </CustomButton>
      </div>
    </div>
  );
}
