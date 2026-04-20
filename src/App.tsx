import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MobileLayout } from './components/layout/MobileLayout';
import { LanguageSelect } from './pages/onboarding/LanguageSelect';
import { Onboarding } from './pages/onboarding/Onboarding';
import { Notifications } from './pages/onboarding/Notifications';
import { Location } from './pages/onboarding/Location';
import { PhoneLogin } from './pages/auth/PhoneLogin';
import { SmsCode } from './pages/auth/SmsCode';
import { Home } from './pages/home/Home';
import { Search } from './pages/search/Search';
import { Schedule } from './pages/schedule/Schedule';
import { Profile } from './pages/profile/Profile';
import { Wallet } from './pages/wallet/Wallet';
import { Subscriptions } from './pages/subscriptions/Subscriptions';
import { Referral } from './pages/referral/Referral';
import { Favorites } from './pages/favorites/Favorites';
import { History } from './pages/history/History';
import { Children } from './pages/children/Children';
import { Support } from './pages/support/Support';
import { Refund } from './pages/refund/Refund';
import { Kyc } from './pages/kyc/Kyc';
import { SuggestCenter } from './pages/suggest/SuggestCenter';
import { CommunityJoin } from './pages/community/CommunityJoin';
import { CreatePost } from './pages/home/CreatePost';
import { CreateStory } from './pages/home/CreateStory';
import { Shop } from './pages/shop/Shop';
import { Trainers } from './pages/trainers/Trainers';
import { useStore } from './store/useStore';

function InitialRoute() {
  const { language, hasSeenOnboarding, isAuthenticated } = useStore();
  
  if (isAuthenticated) return <Navigate to="/home" replace />;
  if (!language) return <Navigate to="/language" replace />;
  if (!hasSeenOnboarding) return <Navigate to="/onboarding" replace />;
  return <Navigate to="/login" replace />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<InitialRoute />} />
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/location" element={<Location />} />
          <Route path="/login" element={<PhoneLogin />} />
          <Route path="/verify" element={<SmsCode />} />
          
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
          <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/children" element={<ProtectedRoute><Children /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/refund" element={<ProtectedRoute><Refund /></ProtectedRoute>} />
          <Route path="/kyc" element={<ProtectedRoute><Kyc /></ProtectedRoute>} />
          <Route path="/suggest" element={<ProtectedRoute><SuggestCenter /></ProtectedRoute>} />
          <Route path="/community-join" element={<ProtectedRoute><CommunityJoin /></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/create-story" element={<ProtectedRoute><CreateStory /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
