import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Image as ImageIcon, Zap, RefreshCw, Send } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion } from 'motion/react';

const t = {
  ru: {
    title: 'Добавить историю',
    share: 'Поделиться',
    gallery: 'Галерея',
    camera: 'Камера',
  },
  kz: {
    title: 'Тарих қосу',
    share: 'Бөлісу',
    gallery: 'Галерея',
    camera: 'Камера',
  },
  uz: {
    title: 'Hikoya qo\'shish',
    share: 'Ulashish',
    gallery: 'Galereya',
    camera: 'Kamera',
  }
};

export function CreateStory() {
  const { language } = useStore();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const handleCapture = () => {
    // Mock camera capture
    setPreview('https://picsum.photos/seed/story/1080/1920');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleShare = () => {
    // In a real app, upload story here
    navigate('/home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col text-white"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full">
            <Zap className="w-6 h-6" />
          </button>
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full">
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-neutral-900 overflow-hidden">
        {preview ? (
          <img src={preview} alt="Story Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center">
              <Camera className="w-10 h-10 text-white/50" />
            </div>
            <p className="text-white/50 font-medium">{text.camera}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-8 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium opacity-70">{text.gallery}</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,video/*" 
            onChange={handleFileSelect}
          />
        </button>

        <button 
          onClick={preview ? handleShare : handleCapture}
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
            preview ? 'bg-[#A2BC3C] border-[#A2BC3C]/40 scale-110' : 'bg-white/20 border-white'
          }`}
        >
          {preview ? (
            <Send className="w-8 h-8 text-white" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white" />
          )}
        </button>

        <div className="w-12 h-12" /> {/* Spacer */}
      </div>

      {preview && (
        <div className="absolute bottom-32 left-0 right-0 flex justify-center">
          <button 
            onClick={() => setPreview(null)}
            className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold border border-white/20"
          >
            {language === 'ru' ? 'Переснять' : language === 'kz' ? 'Қайта түсіру' : 'Qayta suratga olish'}
          </button>
        </div>
      )}
    </motion.div>
  );
}
