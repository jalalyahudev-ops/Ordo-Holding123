import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Support() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Здравствуйте! Чем я могу вам помочь сегодня?', sender: 'support', time: '10:00' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: message, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Специалист ответит вам в ближайшее время.', sender: 'support', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black">
      <div className="px-6 pt-10 pb-5 flex items-center gap-4 bg-white sticky top-0 z-30 shadow-sm transition-all">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-black text-black leading-none mb-1">Чат поддержки</h1>
          <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Онлайн</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 no-scrollbar pb-32">
        {messages.map(msg => (
          <div key={msg.id} className={cn(
            "max-w-[85%] rounded-[28px] p-4 shadow-sm relative group",
            msg.sender === 'user' 
              ? 'self-end bg-[#A2BC3C] text-white rounded-br-none' 
              : 'self-start bg-white text-black rounded-bl-none border border-gray-50'
          )}>
            <p className="font-bold text-[15px] leading-relaxed">{msg.text}</p>
            <p className={cn(
              "text-[9px] font-black mt-2 uppercase opacity-50",
              msg.sender === 'user' ? 'text-right' : 'text-left'
            )}>{msg.time}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-gray-100 pb-10">
        <form onSubmit={handleSend} className="flex gap-4">
          <div className="flex-1 bg-gray-50 rounded-3xl p-1 flex items-center border border-gray-100 shadow-inner">
            <input 
              type="text" 
              placeholder="Введите сообщение..." 
              className="flex-1 bg-transparent px-5 py-4 outline-none font-bold text-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            disabled={!message.trim()}
            className="w-14 h-14 bg-[#A2BC3C] text-white rounded-2xl flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all shadow-xl shadow-[#A2BC3C]/20"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
