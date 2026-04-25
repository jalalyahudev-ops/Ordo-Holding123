import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Ticket, 
  Gift, 
  MessageCircle, 
  RefreshCcw, 
  Shield, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  Building2, 
  Share2, 
  Plus, 
  Settings,
  Star
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const t = {
  ru: {
    title: 'Профиль',
    children: 'Мои дети',
    promo: 'Промокоды',
    referral: 'Реферальная программа',
    referralBadge: 'Получить 2000 ₸',
    kyc: 'Подтверждение личности',
    suggest: 'Предложить центр',
    support: 'Чат поддержки',
    refund: 'Запрос на возврат',
    privacy: 'Политика конфиденциальности',
    logout: 'Выйти',
    addBio: 'Добавить био',
    addFriends: 'Добавить друзей',
    subscribers: 'Подписчики',
    following: 'Подписки',
    views: 'Просмотры',
    beginner: 'Начальный',
  },
  kz: {
    title: 'Профиль',
    children: 'Менің балаларым',
    promo: 'Промокодтар',
    referral: 'Рефералдық бағдарлама',
    referralBadge: '2000 ₸ алу',
    kyc: 'Жеке басты растау',
    suggest: 'Орталықты ұсыну',
    support: 'Қолдау чаты',
    refund: 'Қайтару сұрауы',
    privacy: 'Құпиялық саясаты',
    logout: 'Шығу',
    addBio: 'Био қосу',
    addFriends: 'Достарды қосу',
    subscribers: 'Жазылушылар',
    following: 'Жазылымдар',
    views: 'Қаралымдар',
    beginner: 'Бастапқы',
  }
};

export function Profile() {
  const { logout, language, user, updateUser } = useStore();
  const navigate = useNavigate();
  const [activeProfileModal, setActiveProfileModal] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = React.useState("https://picsum.photos/seed/aida/200");
  const [tempValue, setTempValue] = React.useState('');

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (modalName: string, initialValue: string = '') => {
    setTempValue(initialValue);
    setActiveProfileModal(modalName);
  };

  const handleSave = (field: 'bio' | 'instagram' | 'tiktok') => {
    updateUser({ [field]: tempValue });
    setActiveProfileModal(null);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Мой профиль Yaya',
          text: 'Присоединяйся ко мне в Yaya!',
          url: window.location.href,
        });
      } else {
        alert('Ссылка скопирована в буфер обмена!');
        // Could do clipboard copy here
      }
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  const renderModalContent = () => {
    switch (activeProfileModal) {
      case 'promo':
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto">
               <Ticket className="w-10 h-10 text-[#A2BC3C]" />
            </div>
            <h2 className="text-2xl font-black">Промокоды</h2>
            <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-[#A2BC3C] mt-4">
               <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2">Ваш активный промокод</p>
               <p className="text-2xl font-black text-[#A2BC3C]">YAYA2024</p>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">Введите промокод для получения скидки на абонемент.</p>
            <div className="flex gap-2">
               <input type="text" placeholder="Введите код" className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 outline-none font-bold" />
               <button onClick={() => setActiveProfileModal(null)} className="bg-[#A2BC3C] text-white px-6 py-4 rounded-2xl font-black active:scale-95 transition-transform">Применить</button>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Политика конфиденциальности</h2>
            <div className="space-y-4 text-sm text-gray-500 font-medium leading-relaxed max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
               <p>Мы серьезно относимся к вашей конфиденциальности. Данный документ описывает правила сбора и использования ваших данных.</p>
               <h4 className="font-black text-black">1. Сбор информации</h4>
               <p>Мы собираем только необходимые данные для обеспечения работы сервиса и безопасности ваших детей. Это включает имя, возраст ребенка и предпочтения в занятиях.</p>
               <h4 className="font-black text-black">2. Использование данных</h4>
               <p>Ваши данные используются исключительно для персонализации рекомендаций и обработки платежей. Мы никогда не передаем данные третьим лицам без вашего согласия.</p>
               <h4 className="font-black text-black">3. Безопасность</h4>
               <p>Мы используем современные методы шифрования SSL для защиты вашей информации. Доступ к данным имеют только авторизованные сотрудники технической поддержки.</p>
               <p>Последнее обновление: 20 апреля 2024 г.</p>
            </div>
          </div>
        );
      case 'bio':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">{text.addBio}</h2>
            <textarea 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-medium text-sm min-h-[120px]" 
              placeholder="Расскажите о себе..."
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button 
              onClick={() => handleSave('bio')}
              className="w-full bg-[#A2BC3C] text-white py-4 rounded-2xl font-black active:scale-95 transition-transform"
            >
              Сохранить
            </button>
          </div>
        );
      case 'instagram':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Instagram</h2>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-medium text-sm" 
              placeholder="@username"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button 
              onClick={() => handleSave('instagram')}
              className="w-full bg-[#A2BC3C] text-white py-4 rounded-2xl font-black active:scale-95 transition-transform"
            >
              Сохранить
            </button>
          </div>
        );
      case 'tiktok':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">TikTok</h2>
            <input 
              type="text"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-medium text-sm" 
              placeholder="@username"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button 
              onClick={() => handleSave('tiktok')}
              className="w-full bg-[#A2BC3C] text-white py-4 rounded-2xl font-black active:scale-95 transition-transform"
            >
              Сохранить
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6 text-center">
             <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto">
               <Settings className="w-10 h-10 text-[#A2BC3C]" />
             </div>
             <h2 className="text-2xl font-black">Настройки</h2>
             <p className="text-gray-500 font-medium">Раздел настроек находится в разработке.</p>
          </div>
        );
      case 'post':
        return (
          <div className="space-y-6 text-center">
             <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto">
               <Plus className="w-10 h-10 text-[#A2BC3C]" />
             </div>
             <h2 className="text-2xl font-black">Новая публикация</h2>
             <p className="text-gray-500 font-medium">Возможность создавать публикации появится скоро!</p>
          </div>
        );
      case 'friends':
        return (
          <div className="space-y-6 text-center">
             <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto">
               <Users className="w-10 h-10 text-[#A2BC3C]" />
             </div>
             <h2 className="text-2xl font-black">Добавить друзей</h2>
             <p className="text-gray-500 font-medium">Раздел добавления друзей находится в разработке.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black no-scrollbar overflow-y-auto pb-24">
      <div className="px-5 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-30 shadow-sm transition-all">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">{text.title}</h1>
        <div className="flex items-center gap-5">
          <button onClick={() => setActiveProfileModal('post')} className="text-black hover:opacity-70 active:scale-95 transition-all">
            <Plus className="w-8 h-8 stroke-[1.5]" />
          </button>
          <button onClick={() => setActiveProfileModal('settings')} className="text-black hover:opacity-70 active:scale-95 transition-all">
            <Settings className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div className="mx-5 mt-6 bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-xl">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-[#A2BC3C] rounded-full border-2 border-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="text-center space-y-1 mb-6">
          <h2 className="text-[28px] font-bold tracking-tight text-black">Аида Азаматкизы</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Hexagon className="w-5 h-5 fill-gray-200 text-gray-200" />
            <span className="text-sm font-bold">{text.beginner}</span>
          </div>
        </div>

        <div className="flex justify-around w-full mb-8">
          <Stat item="1" label={text.subscribers} />
          <div className="border-x border-gray-100 h-8 mt-2" />
          <Stat item="0" label={text.following} />
          <div className="border-x border-gray-100 h-8 mt-2" />
          <Stat item="1" label={text.views} active />
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={() => handleOpenModal('bio', user?.bio || '')} 
            className="w-full bg-[#F5F5F7] text-black hover:bg-gray-100 py-4 rounded-2xl font-bold text-[17px] active:scale-95 transition-all truncate px-4"
          >
            {user?.bio || text.addBio}
          </button>
          <div className="flex gap-4">
            <button 
              onClick={() => handleOpenModal('instagram', user?.instagram || '')}
              className="flex-1 bg-white border border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-2 text-[#A2BC3C] font-bold active:scale-95 transition-all shadow-sm truncate px-2"
            >
              {user?.instagram ? `@${user.instagram}` : 'Instagram'}
            </button>
            <button 
              onClick={() => handleOpenModal('tiktok', user?.tiktok || '')}
              className="flex-1 bg-white border border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-2 text-[#A2BC3C] font-bold active:scale-95 transition-all shadow-sm truncate px-2"
            >
              {user?.tiktok ? `@${user.tiktok}` : 'TikTok'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveProfileModal('friends')}
              className="flex-1 bg-[#A2BC3C] hover:opacity-90 py-5 rounded-3xl text-white font-bold text-[18px] active:scale-95 transition-all shadow-xl shadow-[#A2BC3C]/20"
            >
              {text.addFriends}
            </button>
            <button 
              onClick={handleShare}
              className="w-16 h-16 bg-white border border-gray-100 rounded-3xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
            >
              <Share2 className="w-7 h-7 text-black" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-8 space-y-6">
        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <MenuItem icon={<Users className="text-[#A2BC3C]" />} label={text.children} onClick={() => navigate('/children')} />
          <div className="h-px bg-gray-50 mx-6" />
          <MenuItem icon={<Ticket className="text-[#A2BC3C]" />} label={text.promo} onClick={() => setActiveProfileModal('promo')} />
          <div className="h-px bg-gray-50 mx-6" />
          <MenuItem icon={<Gift className="text-[#A2BC3C]" />} label={text.referral} onClick={() => navigate('/referral')} badge={text.referralBadge} />
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <MenuItem icon={<ShieldCheck className="text-[#A2BC3C]" />} label={text.kyc} onClick={() => navigate('/kyc')} />
          <div className="h-px bg-gray-50 mx-6" />
          <MenuItem icon={<Building2 className="text-[#A2BC3C]" />} label={text.suggest} onClick={() => navigate('/suggest')} />
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <MenuItem icon={<MessageCircle className="text-[#A2BC3C]" />} label={text.support} onClick={() => navigate('/support')} />
          <div className="h-px bg-gray-50 mx-6" />
          <MenuItem icon={<RefreshCcw className="text-[#A2BC3C]" />} label={text.refund} onClick={() => navigate('/refund')} />
          <div className="h-px bg-gray-50 mx-6" />
          <MenuItem icon={<Shield className="text-[#A2BC3C]" />} label={text.privacy} onClick={() => setActiveProfileModal('privacy')} />
        </div>

        <button onClick={handleLogout} className="w-full bg-white text-red-500 py-6 rounded-[32px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform border border-gray-100 shadow-sm">
          <LogOut className="w-6 h-6" />
          {text.logout}
        </button>
      </div>

      <AnimatePresence>
        {activeProfileModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProfileModal(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl overflow-y-auto max-h-[85vh] no-scrollbar">
                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
                {renderModalContent()}
                <button onClick={() => setActiveProfileModal(null)} className="mt-10 w-full py-4 text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-black transition-colors">Закрыть</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ item, label, active = false }: { item: string, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        <span className="text-xl font-bold text-black">{item}</span>
        {active && <div className="w-2 h-2 rounded-full bg-[#A2BC3C]" />}
      </div>
      <span className="text-gray-400 text-sm font-medium">{label}</span>
    </div>
  );
}

function MenuItem({ icon, label, onClick, badge }: { icon: React.ReactNode, label: string, onClick: () => void, badge?: string }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors active:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center">{icon}</div>
        <span className="text-[17px] font-bold text-black tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {badge && <span className="text-[11px] font-black uppercase tracking-wider bg-[#A2BC3C]/10 text-[#A2BC3C] border border-[#A2BC3C]/20 px-3 py-1.5 rounded-full">{badge}</span>}
        <ChevronRight className="w-6 h-6 text-gray-300" />
      </div>
    </button>
  );
}

const Hexagon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.9V17.1L12 22l-9-4.9V6.9z"/></svg>
);
