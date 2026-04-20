import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Building2 } from 'lucide-react';

export function SuggestCenter() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7]">
      <div className="px-6 pt-10 pb-5 flex items-center gap-4 bg-white sticky top-0 z-30 shadow-sm transition-all text-black">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-black">Предложить центр</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-24">
        <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-[#A2BC3C]" />
          </div>
          <h2 className="text-2xl font-black mb-3">Знаете отличное место?</h2>
          <p className="text-gray-500 font-medium leading-relaxed">Расскажите нам о детском центре, который вы хотели бы видеть на YAYA, и мы постараемся его добавить.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-2 rounded-[28px] shadow-sm border border-gray-100">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 block px-5 pt-3">Название центра</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent px-5 py-4 rounded-xl outline-none font-bold text-black" 
              placeholder="Напр. Академия супер детей" 
            />
          </div>
          
          <div className="bg-white p-2 rounded-[28px] shadow-sm border border-gray-100">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 block px-5 pt-3">Ссылка (Inst, Web, 2GIS)</label>
            <input 
              type="text" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-transparent px-5 py-4 rounded-xl outline-none font-bold text-black" 
              placeholder="https://..." 
            />
          </div>

          <button 
            type="submit" 
            disabled={!name.trim()}
            className="w-full bg-[#A2BC3C] text-white py-5 rounded-[28px] font-black text-lg mt-8 active:scale-95 transition-transform disabled:opacity-50 shadow-xl shadow-[#A2BC3C]/20"
          >
            Предложить
          </button>
        </form>
      </div>
    </div>
  );
}
