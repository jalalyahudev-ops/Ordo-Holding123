import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Plus, 
  CheckCircle2, 
  ChevronRight, 
  HandMetal, 
  HelpingHand, 
  Lock, 
  User2, 
  Star,
  Crosshair,
  BookOpen,
  Calendar,
  ClipboardList,
  Wallet
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';

const upcomingData = [
  { day: 'ПН', value: 0.8 },
  { day: 'ВТ', value: 1.2 },
  { day: 'СР', value: 1.5 },
  { day: 'ЧТ', value: 1.9 },
  { day: 'ПТ', value: 2.2 },
  { day: 'СБ', value: 2.1 },
  { day: 'ВС', value: 1.9 },
];

const pastData = [
  { day: 'ПН', value: 0.4 },
  { day: 'ВТ', value: 0.9 },
  { day: 'СР', value: 1.1 },
  { day: 'ЧТ', value: 1.3 },
  { day: 'ПТ', value: 1.6 },
  { day: 'СБ', value: 1.5 },
  { day: 'ВС', value: 1.2 },
];

const t = {
  ru: {
    title: 'Развитие',
    results: 'Результаты',
    skillsSuccess: 'Навыки освоены 2 дня подряд',
    monitoringStatus: 'Мониторинг 3 функций',
    menuDay: 'Меню дня',
    praise: 'Похвала/Разъяснения',
    chartTitle: 'График развития ребенка',
    distance: 'Ближайший',
    interval: 'Прошедший',
    childName: 'Денис Ранд',
    dob: '15.05.2018',
    dobLabel: 'Дата рождения',
    smart: 'Умник!',
    busyDays: 'Занимался 7 дней',
    monitoringPercent: 'Мониторинг 50%',
    skillsDetail: 'Навыки: дата, урок, тема',
    dailyRoutine: 'Режим дня садика',
    kinderMenu: 'Меню садика',
    attendance: 'Посещаемость (платежи)',
    individualCard: 'Индив. карта развития ребенка',
    monitoringLabel: 'Мониторинг',
  },
};

export function Children() {
  const navigate = useNavigate();
  const { language } = useStore();
  const [chartView, setChartView] = React.useState<'upcoming' | 'past'>('upcoming');
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  
  const text = t[(language as keyof typeof t) || 'ru'];

  const currentChartData = chartView === 'upcoming' ? upcomingData : pastData;

  const renderModalContent = () => {
    switch (activeModal) {
      case 'results':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Результаты</h2>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 p-5 rounded-3xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">Тест №{i}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">12.04.2024</p>
                </div>
                <span className="text-[#A2BC3C] font-black text-xl">9{i}/100</span>
              </div>
            ))}
          </div>
        );
      case 'monitoring':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Мониторинг</h2>
            <div className="grid grid-cols-2 gap-4">
               {['Внимание', 'Логика', 'Память', 'Социум'].map(item => (
                 <div key={item} className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm text-center">
                    <p className="text-gray-400 text-[10px] font-black uppercase mb-1">{item}</p>
                    <p className="text-[#A2BC3C] text-2xl font-black">{(Math.random() * 100).toFixed(0)}%</p>
                 </div>
               ))}
            </div>
            <div className="bg-[#A2BC3C]/5 p-6 rounded-[32px] border border-[#A2BC3C]/10">
               <p className="text-sm font-bold text-[#A2BC3C] leading-relaxed">
                 Ребенок показывает отличные результаты в логических задачах. Рекомендуем уделить внимание социальному взаимодействию.
               </p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Навыки освоения</h2>
            {[
              { date: '14.04', lesson: 'Бассейн', topic: 'Дыхание под водой' },
              { date: '12.04', lesson: 'Английский', topic: 'Цвета и формы' },
              { date: '10.04', lesson: 'Английский', topic: 'Цифры до 10' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 rounded-[28px] shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-[#A2BC3C]/10 text-[#A2BC3C] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{s.date}</span>
                  <span className="text-gray-300 font-black">#{i+1}</span>
                </div>
                <h4 className="font-black text-lg text-black">{s.lesson}</h4>
                <p className="text-gray-500 font-bold text-sm tracking-tight">{s.topic}</p>
              </div>
            ))}
          </div>
        );
      case 'routine':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Режим дня</h2>
            <div className="space-y-4">
               {[
                 { time: '08:30', task: 'Приход в садик' },
                 { time: '09:00', task: 'Завтрак' },
                 { time: '10:00', task: 'Развивающие занятия' },
                 { time: '11:00', task: 'Прогулка' },
                 { time: '13:00', task: 'Обед' },
                 { time: '14:00', task: 'Сон' },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 items-center">
                    <span className="font-black text-[#A2BC3C] min-w-[50px]">{item.time}</span>
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="font-bold text-gray-700">{item.task}</span>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Меню на сегодня</h2>
            <div className="space-y-4">
               {[
                 { meal: 'Завтрак', content: 'Овсяная каша на молоке, чай с лимоном' },
                 { meal: 'Обед', content: 'Борщ, гречка с котлетой, компот' },
                 { meal: 'Полдник', content: 'Фрукты, печенье, сок' },
                 { meal: 'Ужин', content: 'Плов, овощной салат' },
               ].map((item, i) => (
                 <div key={i} className="bg-gray-50 p-5 rounded-[28px] border border-gray-100">
                    <h4 className="font-black text-[#A2BC3C] text-sm uppercase tracking-widest mb-1">{item.meal}</h4>
                    <p className="font-bold text-gray-800 leading-tight">{item.content}</p>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Посещаемость</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-[#A2BC3C] p-5 rounded-3xl text-white">
                  <p className="text-[10px] font-black uppercase opacity-70 mb-1">Посещено</p>
                  <p className="text-3xl font-black">18/22</p>
               </div>
               <div className="bg-orange-500 p-5 rounded-3xl text-white">
                  <p className="text-[10px] font-black uppercase opacity-70 mb-1">Пропущено</p>
                  <p className="text-3xl font-black">4</p>
               </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
               <h4 className="font-black text-gray-400 text-xs uppercase mb-4 tracking-widest">Последние оплаты</h4>
               <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                       <span className="font-bold text-sm">Апрель 2024</span>
                       <span className="font-black text-[#A2BC3C]">Оплачено</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <User2 className="w-12 h-12 text-[#A2BC3C]" />
            </div>
            <h2 className="text-2xl font-black">Карта развития</h2>
            <p className="text-gray-500 font-medium">Здесь вы можете скачать полную индивидуальную карту развития вашего ребенка за год.</p>
            <button className="w-full bg-[#A2BC3C] text-white py-5 rounded-3xl font-black shadow-xl shadow-[#A2BC3C]/20 active:scale-95 transition-all">
               Скачать PDF
            </button>
          </div>
        );
      case 'add_child':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-4">Добавить ребенка</h2>
            <div className="space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center relative shadow-inner">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Имя ребенка" 
                className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl font-bold text-black outline-none border border-transparent focus:border-[#A2BC3C]/50 transition-all placeholder:text-gray-400"
              />
              <input 
                type="date" 
                className="w-full bg-[#F5F5F7] px-5 py-4 rounded-2xl font-bold text-gray-500 outline-none border border-transparent focus:border-[#A2BC3C]/50 transition-all"
              />
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-[#A2BC3C] text-white text-[17px] mt-4 py-4 rounded-[20px] font-black active:scale-95 transition-all shadow-xl shadow-[#A2BC3C]/20"
              >
                Сохранить
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black relative no-scrollbar pb-24">
      {/* Header - White background like Home */}
      <div className="px-5 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-30 shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            {text.title}
          </h1>
        </div>
        <button onClick={() => setActiveModal('add_child')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] active:scale-95 transition-transform">
          <Plus className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="px-5 space-y-6 pt-6 overflow-y-auto no-scrollbar">
        {/* Child Profile Card - White / Integrated */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="flex items-start gap-4">
            {/* Child Image Area */}
            <div className="relative w-40 h-56 shrink-0 z-20 flex items-end justify-center">
               <motion.div 
                 animate={{ y: [0, -6, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-30 w-full h-full flex items-end justify-center"
               >
                 <img 
                    src={`/image.png?v=${Date.now()}`} 
                    alt="Denis" 
                    className="max-w-full max-h-full object-contain filter drop-shadow(0 15px 15px rgba(0,0,0,0.1))"
                    onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"; }}
                 />
               </motion.div>
               <div className="absolute bottom-2 w-24 h-4 bg-black/5 rounded-full blur-[4px] z-10" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 pt-2">
              <h2 className="text-2xl font-black text-black tracking-tight leading-tight mb-2">{text.childName}</h2>
              <div className="space-y-1 mb-4">
                 <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest block">{text.dobLabel}</span>
                 <span className="text-base font-bold text-black">{text.dob}</span>
              </div>

              <div className="space-y-2">
                <StatusItem icon={<Star className="text-yellow-400 w-3 h-3" />} label={text.smart} />
                <StatusItem icon={<Calendar className="text-green-500 w-3 h-3" />} label={text.busyDays} />
                <StatusItem icon={<Crosshair className="text-[#A2BC3C] w-3 h-3" />} label={text.monitoringPercent} active />
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid - Style inspired by Home menu */}
        <section className="grid grid-cols-1 gap-4">
           <DashButton icon={<Star className="text-yellow-500" />} label={text.results} onClick={() => setActiveModal('results')} />
           <DashButton icon={<Crosshair className="text-[#A2BC3C]" />} label={text.monitoringLabel} onClick={() => setActiveModal('monitoring')} />
           <DashButton icon={<BookOpen className="text-indigo-500" />} label={text.skillsDetail} onClick={() => setActiveModal('skills')} />
           
           <div className="grid grid-cols-2 gap-4">
              <DashButton icon={<Calendar className="text-green-500" />} label={text.dailyRoutine} onClick={() => setActiveModal('routine')} small />
              <DashButton icon={<ClipboardList className="text-orange-500" />} label={text.kinderMenu} onClick={() => setActiveModal('menu')} small />
           </div>

           <DashButton icon={<Wallet className="text-purple-500" />} label={text.attendance} onClick={() => setActiveModal('attendance')} />
           <DashButton icon={<User2 className="text-white" />} label={text.individualCard} onClick={() => setActiveModal('card')} primary />
        </section>

        {/* Development Monitoring Status */}
        <section className="bg-white rounded-[32px] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50">
          <h3 className="text-lg font-black uppercase text-black mb-6">{text.results}</h3>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="font-bold text-gray-700 leading-tight">{text.skillsSuccess}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="font-bold text-gray-700 leading-tight">{text.monitoringStatus}</p>
            </div>
          </div>
        </section>

        {/* Development Chart Section */}
        <section className="bg-white rounded-[32px] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase text-black">{text.chartTitle}</h3>
            <div className="flex bg-gray-100 rounded-full p-1 relative min-w-[160px]">
              <motion.div 
                layoutId="chartTab"
                animate={{ x: chartView === 'upcoming' ? 0 : '100%' }}
                className="absolute inset-y-1 w-1/2 bg-[#A2BC3C] rounded-full shadow-sm"
              />
              <button 
                onClick={() => setChartView('upcoming')}
                className={cn(
                  "flex-1 relative z-10 py-1.5 text-[10px] font-black uppercase transition-colors duration-300",
                  chartView === 'upcoming' ? "text-white" : "text-gray-400"
                )}
              >
                {text.distance}
              </button>
              <button 
                onClick={() => setChartView('past')}
                className={cn(
                  "flex-1 relative z-10 py-1.5 text-[10px] font-black uppercase transition-colors duration-300",
                  chartView === 'past' ? "text-white" : "text-gray-400"
                )}
              >
                {text.interval}
              </button>
            </div>
          </div>

          <div className="h-64 w-full -ml-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000008" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#A2BC3C', fontWeight: 700 }}
                />
                <Line 
                  key={chartView}
                  type="monotone" 
                  dataKey="value" 
                  stroke="#A2BC3C" 
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#A2BC3C', strokeWidth: 0 }}
                  activeDot={{ r: 7, fill: '#A2BC3C', stroke: '#fff', strokeWidth: 3 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Action Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setActiveModal(null)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl overflow-y-auto max-h-[85vh] no-scrollbar"
             >
                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
                {renderModalContent()}
                <button 
                  onClick={() => setActiveModal(null)}
                  className="mt-10 w-full py-4 text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-black transition-colors"
                >
                  Закрыть
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatusItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-6 h-6 rounded-full flex items-center justify-center border",
      active ? "bg-[#A2BC3C]/10 border-[#A2BC3C]/30" : "bg-gray-50 border-gray-100"
    )}>
      {icon}
    </div>
    <span className={cn("text-xs font-bold", active ? "text-[#A2BC3C]" : "text-gray-500")}>
      {label}
    </span>
  </div>
);

const DashButton = ({ 
  icon, 
  label, 
  onClick, 
  primary = false,
  small = false 
}: { 
  icon: React.ReactNode, 
  label: string, 
  onClick: () => void,
  primary?: boolean,
  small?: boolean
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-4 px-6 py-5 rounded-[28px] transition-all active:scale-[0.98] group bg-white border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-md",
      primary && "bg-[#A2BC3C] border-none text-white shadow-xl shadow-[#A2BC3C]/30",
      small && "px-4 py-4"
    )}
  >
    <div className={cn(
      "w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-105",
      primary && "bg-white/20",
      small && "w-9 h-9 rounded-xl"
    )}>
      {icon}
    </div>
    <div className="flex-1 text-left">
      <span className={cn(
        "font-bold text-[15px] tracking-tight text-gray-800 leading-tight",
        primary && "text-white text-lg",
        small && "text-[13px]"
      )}>
        {label}
      </span>
    </div>
    <ChevronRight className={cn("w-5 h-5 transition-transform group-hover:translate-x-1", primary ? "text-white/60" : "text-gray-300")} />
  </button>
);

const FloatingIcon = ({ icon, color, className }: { icon: React.ReactNode, color: string, className?: string }) => (
  <motion.div 
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute p-2 bg-white/10 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-2xl ${color} ${className}`}
  >
    {icon}
  </motion.div>
);

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#D7FE51">
      <circle cx={5} cy={5} r={4} fill="#D7FE51" />
      <circle cx={5} cy={5} r={6} stroke="#D7FE51" strokeWidth={1} fill="none" className="animate-ping" />
    </svg>
  );
};
