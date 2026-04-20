import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, QrCode, ChevronRight, Calendar, Bookmark } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion } from 'motion/react';

const t = {
  ru: {
    hello: 'Привет',
    enterGym: 'Войти в зал',
    qrSub: 'Нажмите на QR-код, чтобы увеличить его',
    leaderboard: 'Лидерборд',
    notInLeague: 'Вы не в лиге',
    points: 'баллов',
    leagueParticipation: 'Для участия в лиге нужно одно посещение',
    menu: 'Меню',
    schedule: 'Расписание',
    myRecords: 'Мои записи',
    waitingToday: 'Мы ждем тебя сегодня!',
    strengthMessage: 'Любовь — это сила, давайте проверим?...'
  },
  kz: {
    hello: 'Сәлем',
    enterGym: 'Залға кіру',
    qrSub: 'Үлкейту үшін QR-кодты басыңыз',
    leaderboard: 'Лидерборд',
    notInLeague: 'Сіз лигада емессіз',
    points: 'ұпай',
    leagueParticipation: 'Лигаға қатысу үшін бір рет келу керек',
    menu: 'Мәзір',
    schedule: 'Кесте',
    myRecords: 'Менің жазбаларым',
    waitingToday: 'Біз сені бүгін күтеміз!',
    strengthMessage: 'Махаббат — бұл күш, тексерейік па?...'
  },
  uz: {
    hello: 'Salom',
    enterGym: 'Zalga kirish',
    qrSub: 'Kattalashtirish uchun QR-kodni bosing',
    leaderboard: 'Liderbord',
    notInLeague: 'Siz ligada emassiz',
    points: 'ball',
    leagueParticipation: 'Ligada qatnashish uchun bitta tashrif kerak',
    menu: 'Menyu',
    schedule: 'Jadval',
    myRecords: 'Mening yozuvlarim',
    waitingToday: 'Biz seni bugun kutmoqdamiz!',
    strengthMessage: 'Sevgi — bu kuch, tekshirib ko\'ramizmi?...'
  }
};

export function Subscriptions() {
  const { language, user } = useStore();
  const navigate = useNavigate();

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];
  const userName = user?.name || 'Aizhan';

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F7] overflow-hidden">
      {/* Main Content (Light theme part) */}
      <div className="px-6 relative z-20 space-y-6 pt-12 pb-20 overflow-y-auto no-scrollbar flex-1">
        <h1 className="text-3xl font-black text-black mb-2">{text.hello}, {userName}!</h1>
        
        {/* QR Code Card - White with Green Accents */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-[32px] p-7 flex items-center justify-between text-black shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div className="space-y-1">
            <h3 className="text-[#A2BC3C] text-2xl font-black leading-tight">{text.enterGym}</h3>
            <p className="text-gray-400 text-xs font-semibold">{text.qrSub}</p>
          </div>
          <div className="bg-[#A2BC3C]/10 p-4 rounded-2xl transition-transform group-hover:scale-105">
            <QrCode className="w-10 h-10 text-[#A2BC3C]" />
          </div>
        </motion.div>

        {/* Leaderboard Section - White */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-black px-1 uppercase tracking-wider">{text.leaderboard}</h2>
          <div className="bg-white rounded-[32px] p-8 text-black relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50">
             <div className="flex gap-3 mb-6 relative z-10">
               <div className="bg-[#F5F5F7] px-5 py-2.5 rounded-full flex items-center gap-2 border border-gray-100">
                 <div className="w-4 h-4 rounded-full bg-gray-300" />
                 <span className="text-xs font-black text-gray-500 uppercase tracking-tight">{text.notInLeague}</span>
               </div>
               <div className="bg-[#A2BC3C]/10 px-5 py-2.5 rounded-full border border-[#A2BC3C]/20">
                 <span className="text-xs font-black text-[#A2BC3C]">0 {text.points.toUpperCase()}</span>
               </div>
             </div>
             <div className="space-y-2 relative z-10">
               <h3 className="text-black text-2xl font-black leading-tight">Для участия в лиге<br />нужно одно посещение</h3>
             </div>
             {/* Background Decoration */}
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#A2BC3C]/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Menu Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-black px-1 uppercase tracking-wider">{text.menu}</h2>
          <div className="space-y-4">
            <MenuItem 
              icon={<div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#A2BC3C]"><Calendar className="w-6 h-6 text-[#A2BC3C]" /></div>}
              label={text.schedule}
              onClick={() => navigate('/schedule')}
            />
            <MenuItem 
              icon={<div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#A2BC3C]"><Bookmark className="w-6 h-6 text-[#A2BC3C]" /></div>}
              label={text.myRecords}
              onClick={() => navigate('/history')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white p-6 rounded-[28px] flex items-center justify-between shadow-sm border border-gray-100 active:scale-[0.98] transition-all hover:shadow-md group"
    >
      <div className="flex items-center gap-5">
        {icon}
        <span className="font-bold text-gray-800 text-lg tracking-tight">{label}</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 transition-transform group-hover:translate-x-1">
        <ChevronRight className="w-6 h-6" />
      </div>
    </button>
  );
}
