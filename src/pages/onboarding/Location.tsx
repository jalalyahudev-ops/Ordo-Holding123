import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CustomButton } from '@/components/ui/CustomButton';

const t = {
  ru: { title: 'Вы в городе Шымкент?', sub: 'Мы подобрали лучшие занятия в вашем городе.', yes: 'Да, всё верно', change: 'Изменить город' },
  kz: { title: 'Сіз Шымкент қаласындасыз ба?', sub: 'Біз сіздің қалаңыздағы ең жақсы сабақтарды таңдадық.', yes: 'Иә, дұрыс', change: 'Қаланы өзгерту' },
  uz: { title: 'Siz Shymkent shahridamisiz?', sub: 'Biz sizning shahringizdagi eng yaxshi mashg\'ulotlarni tanladik.', yes: 'Ha, to\'g\'ri', change: 'Shaharni o\'zgartirish' },
};

export function Location() {
  const navigate = useNavigate();
  const { language, setCity, setHasSeenOnboarding } = useStore();

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const handleConfirm = () => {
    setCity('Шымкент');
    setHasSeenOnboarding(true);
    navigate('/login');
  };

  const handleChange = () => {
    setCity('Алматы');
    setHasSeenOnboarding(true);
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <MapPin className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-4">{text.title}</h1>
        <p className="text-muted-foreground">
          {text.sub}
        </p>
      </div>

      <div className="space-y-4 pb-8">
        <CustomButton onClick={handleConfirm}>
          {text.yes}
        </CustomButton>
        <CustomButton variant="secondary" onClick={handleChange}>
          {text.change}
        </CustomButton>
      </div>
    </div>
  );
}
