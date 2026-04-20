import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon, MapPin, Users, Globe, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion } from 'motion/react';

const t = {
  ru: {
    title: 'Создать пост',
    placeholder: 'О чем вы думаете?',
    publish: 'Опубликовать',
    addPhoto: 'Фото/видео',
    tagPeople: 'Отметить людей',
    location: 'Местоположение',
    visibility: 'Видно всем',
  },
  kz: {
    title: 'Пост жасау',
    placeholder: 'Не ойлап отырсыз?',
    publish: 'Жариялау',
    addPhoto: 'Фото/видео',
    tagPeople: 'Адамдарды белгілеу',
    location: 'Орналасқан жері',
    visibility: 'Барлығына көрінеді',
  },
  uz: {
    title: 'Post yaratish',
    placeholder: 'Nima haqida o\'ylayapsiz?',
    publish: 'Chop etish',
    addPhoto: 'Foto/video',
    tagPeople: 'Odamlarni belgilash',
    location: 'Manzil',
    visibility: 'Hammaga ko\'rinadi',
  }
};

export function CreatePost() {
  const { language, user } = useStore();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const handlePublish = () => {
    // In a real app, we would save the post here
    navigate('/home');
  };

  const handleImageUpload = () => {
    // Mock image upload
    setImage('https://picsum.photos/seed/post/800/600');
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">{text.title}</h2>
        <button 
          onClick={handlePublish}
          disabled={!content.trim()}
          className="bg-[#A2BC3C] text-white px-6 py-2 rounded-full text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#A2BC3C]/20 active:scale-95 transition-all"
        >
          {text.publish}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
            <img src={(user as any)?.avatar || 'https://i.pravatar.cc/150?u=me'} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm">{user?.name || 'User'}</p>
            <button className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md mt-0.5">
              <Globe className="w-3 h-3" />
              {text.visibility}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={text.placeholder}
          className="w-full h-40 bg-transparent text-lg outline-none resize-none"
          autoFocus
        />

        {/* Image Preview */}
        {image && (
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img src={image} alt="Preview" className="w-full h-64 object-cover" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="p-4 border-t border-border bg-card pb-safe">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleImageUpload} className="flex flex-col items-center gap-1 text-green-500">
              <div className="p-2 bg-green-50 rounded-full">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{text.addPhoto}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-blue-500">
              <div className="p-2 bg-blue-50 rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{text.tagPeople}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-red-500">
              <div className="p-2 bg-red-50 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{text.location}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
