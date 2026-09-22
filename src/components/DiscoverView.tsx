import React, { useRef } from 'react';
import {
  Sparkles,
  MapPin,
  Navigation,
  Flame,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Compass,
  Utensils
} from 'lucide-react';
import { Restaurant, Dish, Combo, FastSellingItem } from '../types';

interface DiscoverViewProps {
  currentLocation: string;
  restaurants: Restaurant[];
  mains: Dish[];
  combos: Combo[];
  fastSelling: FastSellingItem[];
  drinks: Dish[];
  desserts: Dish[];
  onSelectLocationPill: (label: string) => void;
  onTriggerGps: () => void;
  onOpenAddressModal: () => void;
  onOpenRestaurantModal: (restaurant: Restaurant) => void;
  onOpenDishCustom: (dish: Dish) => void;
  onQuickAdd: (name: string, price: number, restaurant: string) => void;
  onShowToast: (msg: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  currentLocation,
  restaurants,
  mains,
  combos,
  fastSelling,
  drinks,
  desserts,
  onSelectLocationPill,
  onTriggerGps,
  onOpenAddressModal,
  onOpenRestaurantModal,
  onOpenDishCustom,
  onQuickAdd,
  onShowToast,
}) => {
  const mainsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const combosRef = useRef<HTMLDivElement>(null);
  const drinksRef = useRef<HTMLDivElement>(null);
  const dessertsRef = useRef<HTMLDivElement>(null);
  const fastSellingRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = React.useState('mains');

  const scrollToSection = (target: string) => {
    setActiveCategory(target);
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      mains: mainsRef,
      restaurants: restaurantsRef,
      combos: combosRef,
      drinks: drinksRef,
      desserts: dessertsRef,
      'fast-selling': fastSellingRef,
    };

    if (map[target]?.current) {
      map[target]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onShowToast(`Filtering catalogue for: ${target}`);
    }
  };

  const categoryPills = [
    { id: 'mains', label: 'Mains' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'combos', label: 'Combos' },
    { id: 'fast-selling', label: 'Fast Selling' },
    { id: 'chefs-picks', label: "Chef's Picks" },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'late-night', label: 'Late Night' },
    { id: 'healthy', label: 'Healthy' },
    { id: 'premium', label: 'Premium' },
  ];

  const locationPills = [
    { label: 'The Bentley Suite · Mumbai', display: 'Home · Suite 402' },
    { label: 'BKC Financial Center · Mumbai', display: 'Office · Executive Floor' },
    { label: 'Taj Mahal Palace · Colaba', display: 'Hotel · Royal Tower' },
    { label: 'Altamount Penthouse · Mumbai', display: 'Penthouse / Other' },
  ];

  return (
    <div id="view-discover" className="flex flex-col w-full space-y-8 pb-12">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#1f2022] shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-6 sm:p-10 border border-[#343537]/50">
        <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-[#1f2022]/70 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out opacity-35"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWnH8-14HoWeqwodZlIVWSU51uCdxQme2S5XarzSCubnOGSPJ-svcr-QiM29yRUfVGZ3EE2Z4oWNcjNwnFKuGbzjXI9RbPb4kJMgPfH7wobluEpLBK2rS7PPMJ_MZc6Qx5NarnveU-yUAeJpdas1oAlxxPPJy2l210rWgvwaRNrGSKmmA_KinOV3ifzLcIYIHavst5B4kUMYIxtsz3XGGXAZgSrfsHg9ooIJHu7QRjsTLO3ZH4Hqc')`,
          }}
        />

        <div className="relative z-20 flex flex-col space-y-4 pt-2 max-w-xl">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#343537]/90 backdrop-blur-md rounded-full border border-[#4e4639]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176] animate-ping" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold font-sans">
              Chef's Selection · 4.9 ★ · 25–30 min
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e3e2e5] tracking-tight leading-[1.15]">
            Some meals fill your stomach.{' '}
            <span className="italic font-light text-[#e9c176]">Some stay with you.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#d1c5b4] leading-relaxed">
            Discover exceptional dishes from remarkable kitchens, delivered to wherever the evening finds you.
          </p>

          <p className="text-xs sm:text-sm text-[#9a8f80] italic">
            “Because cooking is wonderful. Until you're the one doing the dishes.”
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('mains')}
              className="px-5 py-3 bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] font-sans text-xs uppercase font-bold tracking-wider rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Explore the menu
            </button>
            <button
              onClick={() => scrollToSection('restaurants')}
              className="px-5 py-3 bg-[#343537] hover:bg-[#38393b] text-[#e3e2e5] font-sans text-xs uppercase font-semibold tracking-wider rounded-lg border border-[#4e4639]/40 transition-all active:scale-95 cursor-pointer"
            >
              Find a restaurant
            </button>
          </div>
        </div>
      </section>

      {/* 2. LOCATION CONCIERGE SELECTOR */}
      <section className="bg-[#1b1c1e] rounded-xl p-5 border border-[#343537]/60 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl text-[#e3e2e5]">
              Where should we deliver tonight?
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-[#e9c176] font-semibold font-sans">
            Privé Express
          </span>
        </div>

        {/* Location Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {locationPills.map((loc) => {
            const isSelected = currentLocation.includes(loc.label.split('·')[0].trim());
            return (
              <button
                key={loc.label}
                onClick={() => onSelectLocationPill(loc.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-[#e9c176] text-[#412d00] font-bold shadow-sm'
                    : 'bg-[#1f2022] hover:bg-[#292a2c] text-[#d1c5b4] border border-[#343537]/40'
                }`}
              >
                {loc.display}
              </button>
            );
          })}
        </div>

        {/* Location Card */}
        <div className="relative rounded-xl overflow-hidden bg-[#1f2022] h-24 flex items-center p-4 border border-[#343537]/40">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f2022] via-[#1f2022]/90 to-transparent" />

          <div className="relative z-10 flex flex-col justify-center gap-1 w-2/3">
            <div className="flex items-center gap-1.5 text-[#e9c176]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-xs uppercase font-semibold tracking-wider truncate">
                {currentLocation}
              </span>
            </div>
            <span className="text-[11px] text-[#9a8f80] truncate">
              Estimated arrival: 28 mins via Thermal Courier
            </span>
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-2">
            <button
              onClick={onTriggerGps}
              className="p-2.5 rounded-lg bg-[#292a2c] hover:bg-[#343537] text-[#e9c176] transition-all active:scale-95 cursor-pointer"
              title="Detect GPS Location"
            >
              <Navigation className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAddressModal}
              className="px-3 py-2 rounded-lg bg-[#c5a059] hover:bg-[#e9c176] text-[#412d00] text-[11px] uppercase font-bold tracking-wider active:scale-95 transition-all cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* 3. CULINARY CHAPTERS (Category Ribbon) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#9a8f80] font-semibold">
            Culinary Chapters
          </span>
          <span className="text-xs text-[#e9c176]">Curated for 8:00 PM</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categoryPills.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#e9c176] text-[#412d00] font-bold'
                  : 'bg-[#1f2022] hover:bg-[#292a2c] text-[#d1c5b4] border border-[#343537]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. CURATED HOUSES (6 GRAND KITCHENS) */}
      <section ref={restaurantsRef} id="featured-restaurants" className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
              Grand Kitchens
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              Curated Houses
            </h2>
          </div>
          <span className="text-xs text-[#9a8f80]">{restaurants.length} Selected Tonight</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((rest) => (
            <div
              key={rest.id}
              onClick={() => onOpenRestaurantModal(rest)}
              className="bg-[#1f2022] rounded-xl overflow-hidden border border-[#343537]/50 shadow-md cursor-pointer group hover:border-[#e9c176]/50 transition-all flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2022] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0d0e10]/80 backdrop-blur-md text-[#e9c176] text-[10px] font-semibold uppercase tracking-wider border border-[#e9c176]/30">
                  {rest.highlight}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg text-[#e3e2e5] group-hover:text-[#e9c176] transition-colors">
                      {rest.name}
                    </h3>
                    <span className="text-xs text-[#e9c176] font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#e9c176]" />
                      {rest.rating}
                    </span>
                  </div>
                  <p className="text-xs text-[#9a8f80]">
                    {rest.cuisine} · {rest.reviews}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[#9a8f80] text-[11px] pt-2 border-t border-[#343537]/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#e9c176]" />
                    {rest.time} ({rest.distance})
                  </span>
                  <span>{rest.priceForTwo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EXACT 10 SIGNATURE MAINS */}
      <section ref={mainsRef} id="section-mains" className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
              Courses & Entrées
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              The 10 Master Mains
            </h2>
          </div>
          <span className="px-2.5 py-1 bg-[#1f2022] text-[#9a8f80] text-[10px] uppercase tracking-wider rounded-full border border-[#343537]">
            Artisanal Selection
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {mains.map((m) => (
            <div
              key={m.id}
              className="bg-[#1f2022] hover:bg-[#292a2c] rounded-xl p-4 flex items-center justify-between border border-[#343537]/50 shadow-sm transition-all gap-3"
            >
              <div className="flex flex-col gap-1 pr-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      m.veg ? 'bg-emerald-400' : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-[10px] text-[#9a8f80] uppercase tracking-wider">
                    {m.restaurant} · {m.cuisine}
                  </span>
                </div>
                <h4 className="font-serif text-base text-[#e3e2e5] font-medium truncate">
                  {m.name}
                </h4>
                <p className="text-xs text-[#9a8f80] line-clamp-1">{m.desc}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-serif text-base text-[#e9c176] font-semibold">
                    ₹{m.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#9a8f80]">{m.rating}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenDishCustom(m)}
                  className="px-3.5 py-2 bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] text-xs uppercase font-bold tracking-wider rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer text-center"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EXACT 10 COMBOS (Curated Pairings & Savings Badge) */}
      <section ref={combosRef} id="section-combos" className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c349] font-semibold">
              Curated Pairings
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              Tasting Experiences & Combos
            </h2>
          </div>
          <span className="text-[11px] text-[#e9c349] font-semibold tracking-wider uppercase">
            Save up to ₹650
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-[#1f2022] hover:bg-[#292a2c] rounded-xl p-4 flex flex-col justify-between gap-3 border border-[#343537]/50 shadow-sm transition-all"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#e9c349] font-semibold">
                    {combo.restaurant}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#e9c349]/20 text-[#e9c349] text-[10px] uppercase font-bold tracking-wider">
                    {combo.savings}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg text-[#e3e2e5] font-medium">
                  {combo.name}
                </h4>
                <p className="text-xs text-[#9a8f80] leading-relaxed">{combo.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#343537]/40">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-[#e9c176] font-bold">
                    ₹{combo.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#9a8f80] line-through">
                    ₹{combo.original.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => onQuickAdd(combo.name, combo.price, combo.restaurant)}
                  className="px-3.5 py-1.5 bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Order Combo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. EXACT 10 FAST SELLING (Live Momentum) */}
      <section ref={fastSellingRef} id="section-fast-selling" className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
              Live Momentum
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              Fastest Moving Plates
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#e9c176]">
            <Flame className="w-4 h-4 text-[#e9c176] animate-pulse" />
            <span className="text-[11px] uppercase font-semibold tracking-wider font-sans">
              High Demand
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fastSelling.map((f, i) => (
            <div
              key={f.id}
              className="bg-[#1b1c1e] hover:bg-[#1f2022] rounded-xl p-3 flex items-center justify-between border border-[#343537]/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="text-xs font-bold text-[#e9c176] font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-sm text-[#e3e2e5] font-medium truncate">
                    {f.name}
                  </span>
                  <span className="text-[11px] text-[#9a8f80]">
                    {f.restaurant} · <span className="text-[#e9c349] font-medium">{f.count}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-serif font-semibold text-[#e9c176]">
                  ₹{f.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => onQuickAdd(f.name, f.price, f.restaurant)}
                  className="w-8 h-8 rounded-lg bg-[#292a2c] hover:bg-[#e9c176] text-[#e9c176] hover:text-[#412d00] flex items-center justify-center transition-all cursor-pointer"
                  aria-label={`Add ${f.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXACT 10 SIGNATURE DRINKS */}
      <section ref={drinksRef} id="section-drinks" className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
              Cellar & Alchemy
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              Beverages & Mocktails
            </h2>
          </div>
          <span className="text-xs text-[#9a8f80]">Crafted Cold</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {drinks.map((d) => (
            <div
              key={d.id}
              className="bg-[#1f2022] hover:bg-[#292a2c] rounded-xl p-3.5 flex flex-col justify-between gap-2 border border-[#343537]/50 shadow-sm transition-all"
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#e9c176] font-semibold block truncate">
                  {d.cuisine}
                </span>
                <h4 className="font-serif text-sm text-[#e3e2e5] font-medium truncate mt-0.5">
                  {d.name}
                </h4>
                <p className="text-[11px] text-[#9a8f80] line-clamp-1 mt-0.5">{d.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#343537]/30">
                <span className="font-serif text-xs font-semibold text-[#e9c176]">
                  ₹{d.price}
                </span>
                <button
                  onClick={() => onQuickAdd(d.name, d.price, d.restaurant)}
                  className="w-7 h-7 rounded-lg bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                  aria-label={`Add ${d.name}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. EXACT 10 SIGNATURE DESSERTS */}
      <section ref={dessertsRef} id="section-desserts" className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
              The Confectionery
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
              Sweet Finales
            </h2>
          </div>
          <span className="text-xs text-[#9a8f80]">10 Delicacies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {desserts.map((ds) => (
            <div
              key={ds.id}
              className="bg-[#1f2022] hover:bg-[#292a2c] rounded-xl p-3.5 flex items-center justify-between border border-[#343537]/50 shadow-sm transition-all gap-3"
            >
              <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                <span className="text-[10px] text-[#e9c349] uppercase tracking-wider font-semibold">
                  {ds.restaurant}
                </span>
                <h4 className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium truncate">
                  {ds.name}
                </h4>
                <p className="text-[11px] text-[#9a8f80] line-clamp-1">{ds.desc}</p>
                <span className="font-serif text-xs font-semibold text-[#e9c176] mt-1">
                  ₹{ds.price}
                </span>
              </div>

              <button
                onClick={() => onQuickAdd(ds.name, ds.price, ds.restaurant)}
                className="px-3 py-1.5 rounded-lg bg-[#e9c176] hover:bg-[#f3d389] text-[#412d00] text-[11px] uppercase font-bold tracking-wider active:scale-95 shadow-sm transition-all cursor-pointer shrink-0"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
