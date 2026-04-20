import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';

export function Favorites() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 pt-6 pb-4 flex items-center gap-4 bg-card sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Favorites</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-pink-300" />
        </div>
        <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
        <p className="text-muted-foreground mb-8 max-w-[250px]">
          Tap the heart icon on any activity to save it for later.
        </p>
        <button 
          onClick={() => navigate('/search')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold"
        >
          Explore Activities
        </button>
      </div>
    </div>
  );
}
