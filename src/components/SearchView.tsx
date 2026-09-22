import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Star, Clock, Plus, Sparkles } from 'lucide-react';
import { Restaurant, Dish } from '../types';

interface SearchViewProps {
  restaurants: Restaurant[];
  dishes: Dish[];
  onOpenRestaurantModal: (restaurant: Restaurant) => void;
  onOpenDishCustom: (dish: Dish) => void;
  onQuickAdd: (name: string, price: number, restaurant: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  restaurants,
  dishes,
  onOpenRestaurantModal,
  onOpenDishCustom,
  onQuickAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState<'all' | 'veg' | 'rating' | 'fast' | 'french' | 'awadhi'>('all');

  const filterChips: { id: 'all' | 'veg' | 'rating' | 'fast' | 'french' | 'awadhi'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Pure Veg' },
    { id: 'rating', label: 'Rating 4.9+ ★' },
    { id: 'fast', label: 'Under 30 Min' },
    { id: 'french', label: 'French' },
    { id: 'awadhi', label: 'Awadhi' },
  ];

  const { filteredRestaurants, filteredDishes } = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    let rList = restaurants;
    let dList = dishes;

    // Apply Chip Filter
    if (activeChip === 'veg') {
      dList = dList.filter((d) => d.veg);
      rList = rList.filter((r) => r.cuisine.toLowerCase().includes('plant') || r.cuisine.toLowerCase().includes('table'));
    } else if (activeChip === 'rating') {
      dList = dList.filter((d) => d.rating.includes('4.9') || d.rating.includes('5.0'));
      rList = rList.filter((r) => r.rating.includes('4.9') || r.rating.includes('5.0'));
    } else if (activeChip === 'fast') {
      rList = rList.filter((r) => r.time.includes('20') || r.time.includes('25'));
    } else if (activeChip === 'french') {
      dList = dList.filter((d) => d.cuisine.toLowerCase().includes('french') || d.restaurant.toLowerCase().includes('maison'));
      rList = rList.filter((r) => r.cuisine.toLowerCase().includes('french'));
    } else if (activeChip === 'awadhi') {
      dList = dList.filter((d) => d.cuisine.toLowerCase().includes('awadhi') || d.cuisine.toLowerCase().includes('nizam'));
      rList = rList.filter((r) => r.cuisine.toLowerCase().includes('awadhi') || r.name.toLowerCase().includes('saffron'));
    }

    // Apply Text Search Query
    if (q) {
      rList = rList.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.chef.toLowerCase().includes(q)
      );
      dList = dList.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.restaurant.toLowerCase().includes(q) ||
          d.cuisine.toLowerCase().includes(q) ||
          d.desc.toLowerCase().includes(q)
      );
    }

    return { filteredRestaurants: rList, filteredDishes: dList };
  }, [searchQuery, activeChip, restaurants, dishes]);

  return (
    <div id="view-curated-search" className="flex flex-col w-full space-y-6 pb-12">
      {/* Search Bar & Chips */}
      <div className="bg-[#1f2022] rounded-xl p-5 border border-[#343537]/60 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
            Intelligence Search
          </span>
          <span className="text-xs text-[#9a8f80]">Real-time Culinary Index</span>
        </div>

        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#e9c176]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you craving? (e.g., Wagyu, Saffron, Noir Kitchen, Truffle...)"
            className="w-full pl-11 pr-4 py-3 bg-[#343537] rounded-xl text-sm text-[#e3e2e5] placeholder:text-[#9a8f80] border border-[#4e4639]/40 focus:outline-none focus:ring-1 focus:ring-[#e9c176]"
          />
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveChip(chip.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeChip === chip.id
                  ? 'bg-[#e9c176] text-[#412d00] font-bold shadow-sm'
                  : 'bg-[#343537] hover:bg-[#38393b] text-[#d1c5b4]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Dynamic Feed */}
      <div className="flex flex-col gap-4">
        {/* Restaurants match */}
        {filteredRestaurants.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold block">
              Kitchens & Houses ({filteredRestaurants.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredRestaurants.map((r) => (
                <div
                  key={r.id}
                  onClick={() => onOpenRestaurantModal(r)}
                  className="bg-[#1f2022] hover:bg-[#292a2c] p-3.5 rounded-xl border border-[#343537]/50 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium">
                        {r.name}
                      </span>
                      <span className="text-xs text-[#9a8f80]">
                        {r.cuisine} · {r.rating}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#292a2c] flex items-center justify-center text-[#e9c176]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dishes match */}
        {filteredDishes.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold block">
              Dishes & Preparations ({filteredDishes.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-[#1f2022] hover:bg-[#292a2c] p-3.5 rounded-xl border border-[#343537]/50 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex flex-col pr-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.veg ? 'bg-emerald-400' : 'bg-rose-500'
                        }`}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-[#9a8f80]">
                        {dish.restaurant}
                      </span>
                    </div>
                    <span className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium truncate mt-0.5">
                      {dish.name}
                    </span>
                    <span className="text-xs text-[#9a8f80] line-clamp-1">{dish.desc}</span>
                    <span className="font-serif text-xs font-semibold text-[#e9c176] mt-1">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenDishCustom(dish)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#292a2c] hover:bg-[#343537] text-[10px] font-semibold text-[#e3e2e5] uppercase tracking-wider transition-colors"
                    >
                      Bespoke
                    </button>
                    <button
                      onClick={() => onQuickAdd(dish.name, dish.price, dish.restaurant)}
                      className="px-3 py-1.5 rounded-lg bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] text-xs uppercase font-bold tracking-wider shadow-sm transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredRestaurants.length === 0 && filteredDishes.length === 0 && (
          <div className="bg-[#1f2022] p-8 rounded-xl border border-[#343537]/50 text-center flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#e9c176]/50" />
            <p className="font-serif text-base text-[#e3e2e5]">
              No direct culinary match found for your selection.
            </p>
            <p className="text-xs text-[#9a8f80] max-w-sm">
              Our Privé Sommelier can arrange custom off-menu sourcing or bespoke pairings for your table.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
