import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CustomButton } from '@/components/ui/CustomButton';

const t = {
  ru: { title: 'Включить уведомления?', sub: 'Будем напоминать о занятиях, изменениях в расписании и новых акциях.', allow: 'Разрешить', deny: 'Не сейчас' },
  kz: { title: 'Хабарландыруларды қосу?', sub: 'Сабақтар, кестедегі өзгерістер және жаңа акциялар туралы еске саламыз.', allow: 'Рұқсат ету', deny: 'Қазір емес' },
  uz: { title: 'Bildirishnomalarni yoqish?', sub: 'Darslar, jadvaldagi o\'zgarishlar va yangi aksiyalar haqida eslatib turamiz.', allow: 'Ruxsat berish', deny: 'Hozir emas' },
};

export function Notifications() {
  const navigate = useNavigate();
  const { language, setNotificationPermission } = useStore();

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const handleResponse = (allow: boolean) => {
    setNotificationPermission(allow);
    navigate('/location');
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <Bell className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-4">{text.title}</h1>
        <p className="text-muted-foreground">
          {text.sub}
        </p>
      </div>

      <div className="space-y-4 pb-8">
        <CustomButton onClick={() => handleResponse(true)}>
          {text.allow}
        </CustomButton>
        <CustomButton variant="ghost" onClick={() => handleResponse(false)}>
          {text.deny}
        </CustomButton>
      </div>
    </div>
  );
}
