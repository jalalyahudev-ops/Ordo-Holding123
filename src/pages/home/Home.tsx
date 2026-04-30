import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Bookmark, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share, 
  Eye, 
  MoreHorizontal, 
  SquarePlus, 
  Percent, 
  ChevronRight, 
  SquarePen, 
  Star,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { dummyPosts } from '@/data/dummy';
import { motion, AnimatePresence } from 'motion/react';

const t = {
  ru: {
    title: 'Главная',
    add: 'Добавить',
    recPosts: 'Рекомендуемые посты',
    subscribe: 'Подписаться',
    readAll: 'Читать всё',
    yearlySub: 'Годовой абонемент по специальной цене',
    select: 'Выбрать',
    evaluateManager: 'Оцените менеджера',
    writePost: 'Написать пост',
    addStory: 'Добавить историю',
    aiGrowth: 'AI Анализ роста: Ваш ребенок проявляет талант в логике!',
    viewInsights: 'Узнать больше',
  },
};

export function Home() {
  const { language } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHomeModal, setActiveHomeModal] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang] || t.ru;

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black pb-10 no-scrollbar overflow-y-auto">
      {/* Header - White background */}
      <div className="px-5 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-30 shadow-sm transition-all">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">{text.title}</h1>
        <div className="flex items-center gap-5 relative">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="active:scale-95 transition-transform relative z-40 p-1"
            >
              <SquarePlus className="w-8 h-8 text-black" strokeWidth={1.5} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-3 w-72 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden py-3 border border-gray-100"
                >
                  <button 
                    onClick={() => { navigate('/create-post'); setIsMenuOpen(false); }}
                    className="w-full px-7 py-5 flex items-center justify-between text-black hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-xl font-bold tracking-tight">{text.writePost}</span>
                    <SquarePen className="w-7 h-7 text-black" strokeWidth={1.5} />
                  </button>
                  <div className="mx-7 h-px bg-gray-100"></div>
                  <button 
                    onClick={() => { navigate('/create-story'); setIsMenuOpen(false); }}
                    className="w-full px-7 py-5 flex items-center justify-between text-black hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-xl font-bold tracking-tight">{text.addStory}</span>
                    <div className="w-7 h-7 rounded-full border-[1.5px] border-dashed border-black flex items-center justify-center">
                      <Plus className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="active:scale-95 transition-transform p-1">
            <Bookmark className="w-8 h-8 text-black" strokeWidth={1.5} />
          </button>
          <button className="relative active:scale-95 transition-transform p-1">
            <Bell className="w-8 h-8 text-black" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-8 bg-white pt-6 transition-all no-scrollbar overflow-x-hidden">
        {/* Stories Section */}
        <div className="px-5 flex gap-5 overflow-x-auto no-scrollbar py-2">
          <div className="flex flex-col items-center gap-3 min-w-[80px]">
            <button 
              onClick={() => navigate('/create-story')}
              className="w-20 h-20 rounded-full border-[2.5px] border-dashed border-[#A2BC3C] flex items-center justify-center active:scale-95 transition-transform bg-white"
            >
              <Plus className="w-10 h-10 text-[#A2BC3C]" strokeWidth={2} />
            </button>
            <span className="text-sm font-semibold tracking-wide text-gray-500">{text.add}</span>
          </div>
          {/* Mock stories */}
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
              <div className="w-20 h-20 rounded-full p-[3px] ring-2 ring-[#A2BC3C] active:scale-95 transition-transform cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/story${i}/200`} 
                  alt="" 
                  className="w-full h-full rounded-full object-cover border-2 border-white" 
                />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate w-20 text-center">User_{i}</span>
            </div>
          ))}
        </div>

        {/* AI Growth Tip Banner */}
        <div className="px-5 max-w-3xl mx-auto w-full">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/children')}
            className="bg-white border-2 border-[#A2BC3C]/20 rounded-[32px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm relative overflow-hidden group transition-all gap-4"
          >
            <div className="flex items-center gap-5 relative z-10 w-full">
              <div className="w-14 h-14 shrink-0 bg-[#A2BC3C]/10 rounded-2xl flex items-center justify-center text-[#A2BC3C] group-hover:rotate-12 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-sm text-gray-400 uppercase tracking-widest mb-1">AI Совет дня</h4>
                <p className="font-bold text-gray-800 leading-tight">
                  {text.aiGrowth}
                </p>
              </div>
            </div>
            <button className="bg-[#A2BC3C] shrink-0 w-full md:w-auto text-white px-4 py-3 rounded-xl text-xs font-black active:scale-95 transition-all shadow-lg shadow-[#A2BC3C]/20 z-10">
              {text.viewInsights}
            </button>
            <div className="absolute top-0 right-0 w-32 h-full bg-[#A2BC3C]/5 -skew-x-12 translate-x-12" />
          </motion.div>
        </div>

        {/* Promo Banner */}
        <div className="px-5 max-w-3xl mx-auto w-full">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/subscriptions')}
            className="w-full bg-gradient-to-r from-[#7a8d2d] to-[#A2BC3C] rounded-[32px] p-7 flex flex-col justify-between relative overflow-hidden shadow-xl active:opacity-90 transition-all cursor-pointer text-white"
          >
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-2xl font-bold leading-[1.2] max-w-[200px]">{text.yearlySub}</h3>
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                <Percent className="w-7 h-7 text-[#ffffff]" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-lg font-bold text-white/90">21 250 ₸ x 12 мес.</p>
                <p className="text-2xl font-black tracking-tight">254 990 ₸</p>
              </div>
              <button className="bg-white/10 border border-white/20 backdrop-blur-md px-8 py-3.5 rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform">
                {text.select}
              </button>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
          </motion.div>
        </div>

        {/* Recommended Posts Header */}
        <div className="px-5 max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold tracking-tight text-black">{text.recPosts}</h2>
        </div>

        {/* Posts Feed with Modal triggers */}
        <div className="space-y-8 pb-10 px-5 max-w-2xl mx-auto w-full">
          {dummyPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              text={text} 
              onEvaluate={() => setActiveHomeModal('evaluate')}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeHomeModal === 'evaluate' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setActiveHomeModal(null)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative bg-white rounded-[40px] p-8 w-full max-w-sm shadow-2xl text-center"
             >
                <div className="w-20 h-20 bg-[#A2BC3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Star className="w-10 h-10 text-[#A2BC3C] fill-[#A2BC3C]" />
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight">Оцените работу менеджера</h3>
                <p className="text-gray-500 font-bold mb-8 leading-snug">Ваша оценка поможет нам стать лучше!</p>
                <div className="flex justify-center gap-2 mb-8">
                   {[1, 2, 3, 4, 5].map(star => (
                     <Star key={star} className="w-8 h-8 text-gray-200 cursor-pointer hover:text-[#A2BC3C] transition-colors" strokeWidth={2} />
                   ))}
                </div>
                <button 
                  onClick={() => setActiveHomeModal(null)}
                  className="w-full bg-[#A2BC3C] text-white py-5 rounded-3xl font-black shadow-xl shadow-[#A2BC3C]/20 active:scale-95 transition-transform"
                >
                  Отправить
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PostCard: React.FC<{ post: any, text: any, onEvaluate: () => void }> = ({ post, text, onEvaluate }) => {
  return (
    <div className="relative">
      <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        {/* Post Header */}
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={post.author.avatar || "https://picsum.photos/seed/maia/200"} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#A2BC3C]/10" />
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-lg leading-none tracking-tight text-black">Maia_Sha</h4>
                <button className="text-[#A2BC3C] text-sm font-bold active:opacity-50 transition-opacity">
                  {text.subscribe}
                </button>
              </div>
              <p className="text-sm text-gray-400 font-medium mt-1">8 апреля</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
            <MoreHorizontal className="w-7 h-7" />
          </button>
        </div>

        {/* Post Content */}
        <div className="px-5 pb-5">
          <p className="text-lg leading-[1.5] font-medium text-gray-700">
            У меня назрел вопрос. Обращаюсь к тем, кто тренируется в тренажерных залах... <span className="text-[#A2BC3C] cursor-pointer hover:underline font-bold">Читать всё</span>
          </p>
        </div>

        {/* Post Image */}
        <div className="relative group overflow-hidden">
          <img 
            src={post.image || `https://picsum.photos/1080/1080?seed=${post.id}`} 
            alt="" 
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
        </div>
        
        {/* Post Actions */}
        <div className="p-6 flex justify-between items-center text-gray-400">
           <div className="flex items-center gap-8">
             <Heart className="w-7 h-7 hover:text-red-500 cursor-pointer transition-colors" />
             <MessageCircle className="w-7 h-7 hover:text-blue-500 cursor-pointer transition-colors" />
             <Share className="w-7 h-7 hover:text-[#A2BC3C] cursor-pointer transition-colors" />
           </div>
           <div className="flex items-center gap-2">
             <Eye className="w-6 h-6" />
             <span className="text-xs font-bold font-mono">1.2K</span>
           </div>
        </div>
      </div>

      {/* Vertical Floating Badge: Evaluate Manager */}
      <div 
        onClick={onEvaluate}
        className="absolute top-1/2 -right-1 translate-y-24 origin-bottom-right group cursor-pointer"
      >
        <div className="bg-[#A2BC3C] text-white text-[10px] font-black py-4 px-3 rounded-l-2xl shadow-xl flex flex-col items-center justify-center gap-1 active:bg-[#8da333] transition-all -rotate-90 origin-right whitespace-nowrap group-hover:-translate-x-1">
           {text.evaluateManager}
        </div>
      </div>
    </div>
  );
}
