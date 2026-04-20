import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const dummyClasses = [
  { id: '1', title: 'Swimming Lesson', trainer: 'Coach Anna', time: '14:00 - 15:00', location: 'City Pool', date: 'Today', childId: '1' },
  { id: '2', title: 'English for Beginners', trainer: 'Alice Smith', time: '16:30 - 17:30', location: 'Language Center', date: 'Today', childId: '1' },
  { id: '3', title: 'Robotics', trainer: 'Max Volt', time: '10:00 - 11:30', location: 'Tech Hub', date: 'Tomorrow', childId: '2' },
];

export function Schedule() {
  const { children, language } = useStore();
  const navigate = useNavigate();
  const [activeChildId, setActiveChildId] = useState(children[0]?.id);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming'>('today');

  const filteredClasses = dummyClasses.filter(c => 
    c.childId === activeChildId && 
    (activeTab === 'today' ? c.date === 'Today' : c.date !== 'Today')
  );

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm transition-all">
        <div className="flex items-center gap-4 mb-6">
           <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
             <ChevronLeft className="w-6 h-6" />
           </button>
           <h1 className="text-3xl font-black text-black">Расписание</h1>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {children.map(child => (
            <button 
              key={child.id}
              onClick={() => setActiveChildId(child.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all active:scale-95",
                activeChildId === child.id 
                  ? "bg-[#A2BC3C] text-white shadow-lg shadow-[#A2BC3C]/20" 
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {child.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Day Selector */}
        <div className="flex bg-white rounded-3xl p-1.5 mb-8 shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('today')}
            className={cn(
              "flex-1 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all",
              activeTab === 'today' ? "bg-[#A2BC3C] text-white shadow-lg shadow-[#A2BC3C]/20" : "text-gray-400"
            )}
          >
            Сегодня
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              "flex-1 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all",
              activeTab === 'upcoming' ? "bg-[#A2BC3C] text-white shadow-lg shadow-[#A2BC3C]/20" : "text-gray-400"
            )}
          >
            Предстоящие
          </button>
        </div>

        {filteredClasses.length > 0 ? (
          <div className="space-y-4">
            {filteredClasses.map(cls => (
              <div key={cls.id} className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-[#A2BC3C] rounded-full" />
                    <div>
                      <h4 className="font-black text-xl text-black leading-none mb-1">{cls.title}</h4>
                      <p className="text-gray-400 font-bold text-sm tracking-tight">{cls.trainer}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <Clock className="w-4 h-4 text-[#A2BC3C]" />
                      <span className="text-xs font-black">{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <MapPin className="w-4 h-4 text-[#A2BC3C]" />
                      <span className="text-xs font-black">{cls.location}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-[#A2BC3C] transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center text-center px-10">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/5">
              <CalendarIcon className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-black mb-3">Занятий нет</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              На этот период у ребенка пока нет запланированных тренировок.
            </p>
            <button 
              onClick={() => navigate('/search')}
              className="mt-10 bg-[#A2BC3C] text-white px-8 py-4 rounded-3xl font-black shadow-xl shadow-[#A2BC3C]/20 active:scale-95 transition-transform"
            >
              Найти занятия
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
