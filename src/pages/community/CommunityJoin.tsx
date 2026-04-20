import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { useStore } from '@/store/useStore';

const t = {
  ru: {
    title: 'Вступайте в сообщество анфиттеров',
    sub: 'С абонементом вы сможете публиковать истории, посты и писать комментарии',
    desc: 'Давайте-давайте уже. Вас не хватает',
    btn: 'Выбрать абонемент'
  },
  kz: {
    title: 'Анфиттерлер қауымдастығына қосылыңыз',
    sub: 'Абонементпен сіз тарихтар, посттар жариялап, пікірлер жаза аласыз',
    desc: 'Келіңіздер. Бізге сіз жетіспейсіз',
    btn: 'Абонементті таңдау'
  },
  uz: {
    title: 'Anfitterlar hamjamiyatiga qo\'shiling',
    sub: 'Abonement bilan siz tarixlar, postlar nashr etishingiz va sharhlar yozishingiz mumkin',
    desc: 'Kelinglar. Bizga siz yetishmayapsiz',
    btn: 'Abonementni tanlash'
  }
};

export function CommunityJoin() {
  const navigate = useNavigate();
  const { language } = useStore();

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-48 h-48 mb-8 relative">
          {/* High Five Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute left-0 top-4 w-16 h-24 bg-[#A2BC3C]/20 rounded-3xl transform -rotate-12 z-10 border-4 border-white shadow-xl shadow-black/5"></div>
              <div className="absolute right-0 top-0 w-16 h-24 bg-[#A2BC3C] rounded-3xl transform rotate-12 shadow-2xl shadow-[#A2BC3C]/40"></div>
              
              {/* Sparkles */}
              <div className="absolute -top-4 left-4 text-[#A2BC3C] text-2xl animate-pulse">✦</div>
              <div className="absolute top-8 -right-8 text-[#A2BC3C] text-3xl animate-bounce">✦</div>
              <div className="absolute bottom-4 -left-6 text-[#A2BC3C] text-xl animate-pulse">✦</div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-black mb-4 leading-tight text-black">{text.title}</h1>
        <p className="text-gray-500 mb-6 leading-relaxed font-medium">
          {text.sub}
        </p>
        <p className="text-black font-black uppercase tracking-widest text-sm">
          {text.desc}
        </p>
      </div>

      <div className="p-8 pb-10">
        <CustomButton onClick={() => navigate('/subscriptions')} className="bg-[#A2BC3C] hover:bg-[#8da333] text-white shadow-xl shadow-[#A2BC3C]/30 py-6 text-lg font-black rounded-[24px]">
          {text.btn}
        </CustomButton>
      </div>
    </div>
  );
}
