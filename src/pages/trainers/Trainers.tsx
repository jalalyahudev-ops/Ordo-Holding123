import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, Star, MapPin } from 'lucide-react';

const dummyTrainers = [
  { id: '1', name: 'Анна Иванова', rating: 4.9, bio: 'Специалист по раннему плаванию с 10-летним стажем.', photo: 'https://picsum.photos/seed/anna/200' },
  { id: '2', name: 'Дмитрий Петров', rating: 4.8, bio: 'Мастер спорта по гимнастике, работает с детьми от 3 лет.', photo: 'https://picsum.photos/seed/dmitry/200' },
  { id: '3', name: 'Мария Сидорова', rating: 5.0, bio: 'Преподаватель английского языка, методика погружения.', photo: 'https://picsum.photos/seed/maria/200' },
];

export function Trainers() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black pb-24 overflow-y-auto no-scrollbar">
      <div className="px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-black uppercase tracking-tight">Тренеры</h1>
      </div>

      <div className="p-6 space-y-6">
        {dummyTrainers.map(trainer => (
          <div key={trainer.id} className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-5 active:scale-[0.98] transition-all cursor-pointer">
            <img src={trainer.photo} alt={trainer.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-lg leading-tight">{trainer.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#A2BC3C] text-[#A2BC3C]" />
                  <span className="text-sm font-bold">{trainer.rating}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed">{trainer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
