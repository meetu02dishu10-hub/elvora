import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Sparkles, ChefHat } from 'lucide-react';
import { Restaurant, Dish } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  dishes: Dish[];
  onClose: () => void;
  onOpenDishCustom: (dish: Dish) => void;
  onQuickAdd: (name: string, price: number, restaurant: string) => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  dishes,
  onClose,
  onOpenDishCustom,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mains' | 'desserts' | 'drinks'>('all');

  if (!restaurant) return null;

  const restaurantDishes = dishes.filter(
    (d) =>
      d.restaurant.toLowerCase() === restaurant.name.toLowerCase() ||
      (restaurant.name === 'Noir Kitchen' && d.restaurant.includes('Noir')) ||
      (restaurant.name === 'Maison Ember' && d.restaurant.includes('Maison')) ||
      (restaurant.name === 'The Saffron Room' && d.restaurant.includes('Saffron')) ||
      (restaurant.name === 'Atelier 27' && d.restaurant.includes('Atelier 27'))
  );

  const filteredDishes =
    activeCategory === 'all'
      ? restaurantDishes
      : restaurantDishes.filter((d) => d.category === activeCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          id="restaurant-modal-container"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1b1c1e] w-full max-w-xl max-h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden border border-[#343537] shadow-2xl"
        >
          {/* Hero Banner */}
          <div className="relative h-48 sm:h-56 w-full bg-[#121315] shrink-0 overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1e] via-[#1b1c1e]/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all z-10 backdrop-blur-sm"
              aria-label="Close Restaurant Details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] text-[10px] font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3 h-3" />
                {restaurant.highlight}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                {restaurant.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#d1c5b4] mt-1">
                <span className="text-[#e9c176] font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#e9c176]" />
                  {restaurant.rating}
                </span>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {restaurant.time} ({restaurant.distance})
                </span>
                <span>•</span>
                <span>{restaurant.priceForTwo}</span>
              </div>
            </div>
          </div>

          {/* Chef Bar */}
          <div className="px-4 py-2.5 bg-[#1f2022] border-b border-[#292a2c] flex items-center justify-between text-xs text-[#9a8f80]">
            <span className="flex items-center gap-1.5 text-[#e3e2e5]">
              <ChefHat className="w-4 h-4 text-[#e9c176]" />
              {restaurant.chef}
            </span>
            <span className="text-[11px] text-[#e9c176]">Private Dispatch Active</span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1b1c1e] border-b border-[#292a2c] overflow-x-auto no-scrollbar shrink-0">
            {(
              [
                { id: 'all', label: 'All Offerings' },
                { id: 'mains', label: 'Mains & Entrées' },
                { id: 'desserts', label: 'Desserts' },
                { id: 'drinks', label: 'Cellar & Drinks' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#e9c176] text-[#412d00] font-semibold shadow-sm'
                    : 'bg-[#292a2c] text-[#d1c5b4] hover:bg-[#343537]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dishes list */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1">
            {filteredDishes.length === 0 ? (
              <div className="py-12 text-center text-[#9a8f80]">
                <p className="font-serif italic text-base">Chef is refreshing this seasonal chapter.</p>
                <p className="text-xs mt-1">Select all offerings to view active courses.</p>
              </div>
            ) : (
              filteredDishes.map((dish) => (
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
                        {dish.cuisine}
                      </span>
                    </div>
                    <span className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium mt-0.5 truncate">
                      {dish.name}
                    </span>
                    <span className="text-xs text-[#9a8f80] line-clamp-1 mt-0.5">
                      {dish.desc}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-serif text-sm font-semibold text-[#e9c176]">
                        ₹{dish.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#9a8f80]">{dish.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenDishCustom(dish)}
                      className="px-3 py-1.5 rounded-lg bg-[#292a2c] hover:bg-[#343537] text-xs font-medium text-[#e3e2e5] uppercase tracking-wider transition-colors"
                    >
                      Bespoke
                    </button>
                    <button
                      onClick={() => onQuickAdd(dish.name, dish.price, restaurant.name)}
                      className="px-3 py-1.5 rounded-lg bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
