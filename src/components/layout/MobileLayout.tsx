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
    <div className="min-h-screen bg-[#F5F5F7] flex justify-center md:justify-start">
      {/* Desktop Sidebar */}
      {showNav && (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0 py-8 shrink-0 shadow-sm z-50">
          <div className="text-3xl font-black text-[#A2BC3C] mb-12 px-8 uppercase tracking-tighter cursor-pointer" onClick={() => navigate('/home')}>Orda</div>
          <nav className="flex flex-col gap-2 px-4">
            <SideNavItem icon={<Home />} label={text.home} active={location.pathname === '/home'} onClick={() => navigate('/home')} />
            <SideNavItem icon={<Search />} label={text.search} active={location.pathname === '/search'} onClick={() => navigate('/search')} />
            <SideNavItem icon={<CreditCard />} label={text.subscription} active={location.pathname.startsWith('/subscriptions')} onClick={() => navigate('/subscriptions')} />
            <SideNavItem icon={<Baby />} label={text.kids} active={location.pathname === '/children'} onClick={() => navigate('/children')} />
            <SideNavItem icon={<User />} label={text.profile} active={location.pathname.startsWith('/profile')} onClick={() => navigate('/profile')} />
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className={cn(
        "w-full bg-white relative flex flex-col h-screen overflow-hidden",
        !showNav ? "max-w-md mx-auto shadow-2xl border-x border-gray-100" : "md:flex-1 md:bg-[#F5F5F7]"
      )}>
        <main className={cn(
          "flex-1 overflow-y-auto no-scrollbar bg-white",
          showNav ? "pb-20 md:pb-0 md:bg-[#F5F5F7]" : ""
        )}>
          <div className={cn(
            "w-full bg-white h-full relative",
            showNav ? "md:max-w-5xl md:mx-auto md:my-8 md:rounded-[40px] md:shadow-sm md:h-auto md:min-h-[800px] md:border md:border-gray-100" : ""
          )}>
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Nav */}
        {showNav && (
          <nav className="md:hidden absolute bottom-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
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
        active ? "text-[#A2BC3C]" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <div className={cn("[&>svg]:w-6 [&>svg]:h-6 transition-colors", active && "[&>svg]:stroke-[2.5px]")}>
        {icon}
      </div>
      <span className="text-[10px] font-medium transition-colors">{label}</span>
    </button>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all active:scale-95 text-left w-full",
        active ? "bg-[#A2BC3C]/10 text-[#A2BC3C] font-black" : "text-gray-500 hover:bg-gray-50 font-bold hover:text-gray-800"
      )}
    >
      <div className={cn("[&>svg]:w-6 [&>svg]:h-6 transition-colors", active ? "text-[#A2BC3C]" : "text-gray-400")}>
        {icon}
      </div>
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );
}
