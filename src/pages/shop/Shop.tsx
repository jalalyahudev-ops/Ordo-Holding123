import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, ShoppingCart, Star } from 'lucide-react';

const dummyProducts = [
  { id: '1', name: 'Детские очки для плавания', price: '4 500 ₸', image: 'https://picsum.photos/seed/googles/400' },
  { id: '2', name: 'Спортивная форма YAYA', price: '12 900 ₸', image: 'https://picsum.photos/seed/uniform/400' },
  { id: '3', name: 'Набор для рисования', price: '8 200 ₸', image: 'https://picsum.photos/seed/art/400' },
  { id: '4', name: 'Бутылка для воды 0.5л', price: '2 800 ₸', image: 'https://picsum.photos/seed/bottle/400' },
];

export function Shop() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] text-black pb-24 overflow-y-auto no-scrollbar">
      <div className="px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F7] text-black active:scale-95 transition-transform">
             <ChevronLeft className="w-6 h-6" />
           </button>
           <h1 className="text-2xl font-black text-black">Магазин</h1>
        </div>
        <button className="w-12 h-12 flex items-center justify-center bg-[#A2BC3C]/10 text-[#A2BC3C] rounded-2xl relative active:scale-95 transition-all">
           <ShoppingCart className="w-6 h-6" />
           <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">0</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-2 gap-5">
        {dummyProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col active:scale-[0.98] transition-all cursor-pointer">
            <div className="h-40 overflow-hidden bg-gray-50 relative">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
               <h4 className="font-bold text-sm leading-tight text-gray-800 line-clamp-2 mb-3">{product.name}</h4>
               <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-black text-[#A2BC3C]">{product.price}</span>
                  <div className="w-10 h-10 bg-[#A2BC3C] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#A2BC3C]/20">
                     <ShoppingBag className="w-5 h-5" />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
