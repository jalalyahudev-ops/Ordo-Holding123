import React, { useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal, Map as MapIcon, List, Star, ChevronLeft, ChevronDown } from 'lucide-react';
import { dummyActivities, dummyCategories } from '@/data/dummy';
import { useStore } from '@/store/useStore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const t = {
  ru: {
    title: 'Поиск',
    searchPlaceholder: 'Активности, центры...',
    all: 'Все',
    resultsFound: 'результатов найдено',
    mapView: 'На карте',
    listView: 'Списком',
    noResults: 'Ничего не найдено',
    tryAdjusting: 'Попробуйте изменить фильтры или поисковый запрос.',
    yrs: 'лет',
    filter: 'Фильтр',
    reset: 'Сбросить',
    sortBy: 'Сортировать',
    sortDefault: 'По умолчанию',
    suitableFor: 'Подойдет для',
    childAge: 'Возраст ребенка',
    category: 'Категория',
    show: 'Показать',
    under1: 'младше 1',
    health: 'Здоровье',
    online: 'Онлайн',
    sport: 'Спорт',
    music: 'Музыка'
  },
  kz: {
    title: 'Іздеу',
    searchPlaceholder: 'Белсенділіктер, орталықтар...',
    all: 'Барлығы',
    resultsFound: 'нәтиже табылды',
    mapView: 'Картада',
    listView: 'Тізіммен',
    noResults: 'Ештеңе табылмады',
    tryAdjusting: 'Сүзгілерді немесе іздеу сұрауын өзгертіп көріңіз.',
    yrs: 'жас',
    filter: 'Сүзгі',
    reset: 'Қалпына келтіру',
    sortBy: 'Сұрыптау',
    sortDefault: 'Әдепкі бойынша',
    suitableFor: 'Кімге сәйкес келеді',
    childAge: 'Баланың жасы',
    category: 'Санат',
    show: 'Көрсету',
    under1: '1-ден кіші',
    health: 'Денсаулық',
    online: 'Онлайн',
    sport: 'Спорт',
    music: 'Музыка'
  },
  uz: {
    title: 'Qidiruv',
    searchPlaceholder: 'Faoliyatlar, markazlar...',
    all: 'Barchasi',
    resultsFound: 'natija topildi',
    mapView: 'Xaritada',
    listView: 'Ro\'yxat',
    noResults: 'Hech narsa topilmadi',
    tryAdjusting: 'Filtrlarni yoki qidiruv so\'rovini o\'zgartirib ko\'ring.',
    yrs: 'yosh',
    filter: 'Filtr',
    reset: 'Tozalash',
    sortBy: 'Saralash',
    sortDefault: 'Standart',
    suitableFor: 'Kimga mos keladi',
    childAge: 'Bolaning yoshi',
    category: 'Kategoriya',
    show: 'Ko\'rsatish',
    under1: '1 yoshdan kichik',
    health: 'Salomatlik',
    online: 'Onlayn',
    sport: 'Sport',
    music: 'Musiqa'
  }
};

// Dummy coordinates for Almaty
const dummyLocations = [
  [43.238949, 76.889709],
  [43.222015, 76.851248],
  [43.25654, 76.92848],
  [43.21543, 76.89432],
];

export function Search() {
  const { language, children } = useStore();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMapView, setIsMapView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Filter states
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const lang = (language as keyof typeof t) || 'ru';
  const text = t[lang];

  const filtered = dummyActivities.filter(a => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase()) || a.center.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory ? a.category === activeCategory : true;
    return matchesQuery && matchesCategory;
  });

  const toggleChild = (id: string) => {
    setSelectedChildren(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const toggleAge = (age: number) => {
    setSelectedAges(prev => prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const resetFilters = () => {
    setSelectedChildren([]);
    setSelectedAges([]);
    setSelectedCategories([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] relative text-black overflow-hidden">
      <div className="px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight">{text.title}</h1>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder={text.searchPlaceholder}
              className="w-full bg-[#F5F5F7] pl-12 pr-5 py-4 rounded-[20px] outline-none font-bold text-black border border-transparent focus:border-[#A2BC3C]/50 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-14 h-14 bg-[#F5F5F7] rounded-[20px] flex items-center justify-center active:scale-95 transition-transform"
          >
            <SlidersHorizontal className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 no-scrollbar">
          <button 
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all active:scale-95",
              !activeCategory ? "bg-[#A2BC3C] text-white shadow-lg shadow-[#A2BC3C]/20" : "bg-[#F5F5F7] text-gray-400"
            )}
          >
            {text.all}
          </button>
          {dummyCategories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all active:scale-95",
                activeCategory === cat.id ? "bg-[#A2BC3C] text-white shadow-lg shadow-[#A2BC3C]/20" : "bg-[#F5F5F7] text-gray-400"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col no-scrollbar pb-32">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400 font-bold text-sm tracking-tight">{filtered.length} {text.resultsFound}</p>
          <button 
            onClick={() => setIsMapView(!isMapView)}
            className="flex items-center gap-2 text-[#A2BC3C] text-sm font-black bg-[#A2BC3C]/10 px-4 py-2.5 rounded-2xl transition-all active:scale-95"
          >
            {isMapView ? (
              <>
                <List className="w-5 h-5" />
                {text.listView}
              </>
            ) : (
              <>
                <MapIcon className="w-5 h-5" />
                {text.mapView}
              </>
            )}
          </button>
        </div>

        {isMapView ? (
          <div className="flex-1 rounded-[32px] overflow-hidden border border-gray-100 relative min-h-[400px] z-0 shadow-inner">
            <MapContainer 
              center={[43.238949, 76.889709]} 
              zoom={12} 
              scrollWheelZoom={true}
              className="w-full h-full absolute inset-0"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((activity, idx) => {
                const position = dummyLocations[idx % dummyLocations.length] as [number, number];
                const priceIcon = L.divIcon({
                  className: 'custom-price-marker',
                  html: `<div class="bg-[#A2BC3C] text-white px-3 py-2 rounded-xl text-xs font-black shadow-xl whitespace-nowrap relative border-2 border-white">
                          ${activity.price} ₸
                          <div class="absolute w-2.5 h-2.5 bg-[#A2BC3C] rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-white"></div>
                         </div>`,
                  iconSize: [80, 40],
                  iconAnchor: [40, 40],
                });

                return (
                  <Marker 
                    key={activity.id} 
                    position={position} 
                    icon={priceIcon}
                    eventHandlers={{ click: () => setSelectedActivity(activity) }}
                  >
                    <Popup>
                      <div className="font-sans p-1">
                        <h3 className="font-black text-[15px] mb-1 text-black">{activity.title}</h3>
                        <p className="text-xs text-gray-500 font-bold">{activity.center}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(activity => (
              <div 
                key={activity.id} 
                onClick={() => setSelectedActivity(activity)}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex h-36 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="w-[120px] h-full relative overflow-hidden">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                     <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                     <span className="text-[10px] font-black">{activity.rating}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-[#A2BC3C] font-black uppercase tracking-widest mb-1">{activity.category}</p>
                    <h4 className="font-black text-lg leading-tight mb-1 line-clamp-1">{activity.title}</h4>
                    <p className="text-xs text-gray-400 font-bold line-clamp-1">{activity.center}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-black text-xl text-black">{activity.price} ₸</span>
                    <span className="text-[11px] font-black text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-100">
                      {activity.ageRange} {text.yrs}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-black/5">
              <SearchIcon className="w-12 h-12 text-gray-200" />
            </div>
            <h3 className="text-2xl font-black mb-3">{text.noResults}</h3>
            <p className="text-gray-500 font-medium leading-relaxed px-10">{text.tryAdjusting}</p>
          </div>
        )}
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedActivity(null)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative w-full max-w-md md:max-w-2xl bg-white rounded-t-[40px] md:rounded-[40px] shadow-2xl overflow-hidden md:my-auto"
            >
               <div className="h-64 relative">
                  <img src={selectedActivity.image} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setSelectedActivity(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95">
                     <ChevronDown className="w-6 h-6" />
                  </button>
                  <div className="absolute top-6 left-6 bg-[#A2BC3C] text-white px-4 py-2 rounded-2xl font-black shadow-xl">
                     {selectedActivity.price} ₸
                  </div>
               </div>
               <div className="p-8 pb-12">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-[#A2BC3C] font-black uppercase text-xs tracking-widest mb-1">{selectedActivity.category}</p>
                        <h2 className="text-3xl font-black leading-tight">{selectedActivity.title}</h2>
                     </div>
                     <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                        <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        <span className="font-black text-amber-900">{selectedActivity.rating}</span>
                     </div>
                  </div>
                  <p className="text-gray-400 font-bold mb-8">{selectedActivity.center}</p>
                  <div className="flex gap-5 mb-10">
                     <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Возраст</p>
                        <p className="font-black text-lg">{selectedActivity.ageRange} {text.yrs}</p>
                     </div>
                     <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Длительность</p>
                        <p className="font-black text-lg">60 мин</p>
                     </div>
                  </div>
                  <button className="w-full bg-[#A2BC3C] text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-[#A2BC3C]/20 active:scale-95 transition-transform" onClick={() => setSelectedActivity(null)}>
                     Записаться
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center p-0">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsFilterOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md md:max-w-2xl bg-[#F5F5F7] rounded-t-[40px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:my-auto"
            >
              {/* Swipe Indicator & Header */}
              <div className="bg-white rounded-t-[40px] pt-4 pb-4 px-6 border-b border-gray-100 flex-shrink-0 z-10 sticky top-0">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black">{text.filter}</h2>
                  <button 
                    onClick={resetFilters} 
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform"
                  >
                    {text.reset}
                  </button>
                </div>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto overscroll-y-contain p-6 space-y-8 bg-[#F5F5F7]">
                {/* Sort */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{text.sortBy}</h3>
                  <button className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center text-left active:scale-[0.98] transition-all shadow-sm">
                    <span className="font-medium">{text.sortDefault}</span>
                    <div className="flex flex-col -space-y-2 text-gray-400">
                      <ChevronLeft className="w-4 h-4 rotate-90" />
                      <ChevronLeft className="w-4 h-4 -rotate-90" />
                    </div>
                  </button>
                </div>

                {/* Suitable For */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{text.suitableFor}</h3>
                  <div className="flex flex-wrap gap-2">
                    {children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => toggleChild(child.id)}
                        className={`px-5 py-3 rounded-full border transition-all active:scale-95 font-medium ${
                          selectedChildren.includes(child.id) 
                            ? 'border-[#A2BC3C] bg-[#A2BC3C]/10 text-[#A2BC3C]' 
                            : 'border-transparent bg-white text-gray-700 shadow-sm'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Child Age */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{text.childAge}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleAge(0)}
                      className={`px-5 py-3 rounded-full border transition-all active:scale-95 font-medium ${
                        selectedAges.includes(0) 
                          ? 'border-[#A2BC3C] bg-[#A2BC3C]/10 text-[#A2BC3C]' 
                          : 'border-transparent bg-white text-gray-700 shadow-sm'
                      }`}
                    >
                      {text.under1}
                    </button>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(age => (
                      <button
                        key={age}
                        onClick={() => toggleAge(age)}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-95 font-medium ${
                          selectedAges.includes(age) 
                            ? 'border-[#A2BC3C] bg-[#A2BC3C]/10 text-[#A2BC3C]' 
                            : 'border-transparent bg-white text-gray-700 shadow-sm'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{text.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'health', label: text.health },
                      { id: 'online', label: text.online },
                      { id: 'sport', label: text.sport },
                      { id: 'music', label: text.music }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-5 py-3 rounded-full border transition-all active:scale-95 font-medium ${
                          selectedCategories.includes(cat.id) 
                            ? 'border-[#A2BC3C] bg-[#A2BC3C]/10 text-[#A2BC3C]' 
                            : 'border-transparent bg-white text-gray-700 shadow-sm'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Button */}
              <div className="bg-white p-6 border-t border-gray-100 flex-shrink-0">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-[#A2BC3C] text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform shadow-lg shadow-[#A2BC3C]/20 text-[18px]"
                >
                  {text.show} ({filtered.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
