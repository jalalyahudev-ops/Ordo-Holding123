import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, CreditCard, Baby, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const t = {
  ru: { home: 'Главная', search: 'Поиск', subscription: 'Абонемент', kids: 'Дети', profile: 'Профиль' },
  kz: { home: 'Басты бет', search: 'Іздеу', subscription: 'Абонемент', kids: 'Балалар', profile: 'Профиль' },
  uz: { home: 'Asosiy', search: 'Qidiruv', subscription: 'Abonement', kids: 'Bolalar', profile: 'Profil' },
};

export function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useStore();

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const hideNavPaths = ['/', '/language', '/onboarding', '/notifications', '/location', '/login', '/verify'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white relative shadow-2xl overflow-hidden flex flex-col h-screen border-x border-gray-100">
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar bg-white">
          <Outlet />
        </main>
        
        {showNav && (
          <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            <NavItem icon={<Home />} label={text.home} active={location.pathname === '/home'} onClick={() => navigate('/home')} />
            <NavItem icon={<Search />} label={text.search} active={location.pathname === '/search'} onClick={() => navigate('/search')} />
            <NavItem icon={<CreditCard />} label={text.subscription} active={location.pathname.startsWith('/subscriptions')} onClick={() => navigate('/subscriptions')} />
            <NavItem icon={<Baby />} label={text.kids} active={location.pathname === '/children'} onClick={() => navigate('/children')} />
            <NavItem icon={<User />} label={text.profile} active={location.pathname.startsWith('/profile')} onClick={() => navigate('/profile')} />
          </nav>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 transition-all active:scale-95",
        active ? "text-primary" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <div className={cn("[&>svg]:w-6 [&>svg]:h-6 transition-colors", active && "[&>svg]:stroke-[2.5px]")}>
        {icon}
      </div>
      <span className="text-[10px] font-medium transition-colors">{label}</span>
    </button>
  );
}
