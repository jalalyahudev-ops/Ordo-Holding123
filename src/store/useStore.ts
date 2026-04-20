import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dummyUser, dummyChildren } from '../data/dummy';

interface AppState {
  language: string | null;
  hasSeenOnboarding: boolean;
  hasNotificationPermission: boolean | null;
  city: string | null;
  isAuthenticated: boolean;
  phone: string | null;
  user: typeof dummyUser | null;
  children: typeof dummyChildren;
  
  setLanguage: (lang: string) => void;
  setHasSeenOnboarding: (val: boolean) => void;
  setNotificationPermission: (val: boolean) => void;
  setCity: (city: string) => void;
  login: (phone: string) => void;
  logout: () => void;
  addChild: (child: any) => void;
  topUpBalance: (amount: number) => void;
  updateUser: (data: Partial<typeof dummyUser>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: null,
      hasSeenOnboarding: false,
      hasNotificationPermission: null,
      city: null,
      isAuthenticated: false,
      phone: null,
      user: null,
      children: dummyChildren,
      
      setLanguage: (lang) => set({ language: lang }),
      setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
      setNotificationPermission: (val) => set({ hasNotificationPermission: val }),
      setCity: (city) => set({ city }),
      login: (phone) => set({ isAuthenticated: true, phone, user: { ...dummyUser, phone } }),
      logout: () => set({ 
        isAuthenticated: false, 
        phone: null, 
        user: null,
        language: null,
        hasSeenOnboarding: false,
        hasNotificationPermission: null,
        city: null
      }),
      addChild: (child) => set((state) => ({ children: [...state.children, child] })),
      topUpBalance: (amount) => set((state) => ({
        user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
      })),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'ordo-storage',
    }
  )
);
