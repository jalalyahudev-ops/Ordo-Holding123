import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '@/components/ui/CustomButton';
import { useStore } from '@/store/useStore';

const t = {
  ru: { title: 'Найдите лучшие занятия для детей рядом с вами', btn: 'Продолжить', skip: 'Пропустить' },
  kz: { title: 'Жаныңыздағы балаларға арналған ең жақсы сабақтарды табыңыз', btn: 'Жалғастыру', skip: 'Өткізіп жіберу' },
  uz: { title: 'Yaqiningizdagi bolalar uchun eng yaxshi mashg\'ulotlarni toping', btn: 'Davom etish', skip: 'O\'tkazib yuborish' },
};

export function Onboarding() {
  const navigate = useNavigate();
  const { language } = useStore();
  
  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-end pt-4">
        <button onClick={() => navigate('/notifications')} className="text-muted-foreground font-medium px-4 py-2">
          {text.skip}
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          {/* Placeholder for illustration */}
          <span className="text-6xl">🎯</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">ORDO 360</h1>
        <p className="text-lg text-muted-foreground max-w-[280px]">
          {text.title}
        </p>
      </div>

      <div className="pb-8">
        <CustomButton onClick={() => navigate('/notifications')}>
          {text.btn}
        </CustomButton>
      </div>
    </div>
  );
}
