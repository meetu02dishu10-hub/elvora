import React from 'react';
import { Award, Utensils, Clock, Wine, PartyPopper, RefreshCw, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  onReorder: (kitchen: string, dishName: string, price: number) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onReorder }) => {
  const privileges = [
    {
      title: 'Zero Delivery Fee',
      desc: 'All houses & Michelin chefs',
      icon: Utensils,
    },
    {
      title: 'Priority Thermal Courier',
      desc: 'Under 35 mins guaranteed',
      icon: Clock,
    },
    {
      title: 'Sommelier Hotline',
      desc: 'Bespoke vintage guidance',
      icon: Wine,
    },
    {
      title: 'Private Tasting Invites',
      desc: 'Quarterly Chef tables',
      icon: PartyPopper,
    },
  ];

  const pastOrders = [
    {
      kitchen: 'Maison Ember',
      courseName: 'Truffle Cream Pasta & Wagyu',
      detail: 'Yesterday · ₹3,450 · Delivered to Bentley Suite',
      price: 3450,
      itemToReorder: 'Truffle Cream Pasta',
      itemPrice: 890,
    },
    {
      kitchen: 'The Saffron Room',
      courseName: 'Royal Awadhi Dum Feast',
      detail: '3 Oct · ₹2,890 · Delivered to Altamount Residence',
      price: 2890,
      itemToReorder: 'Butter Chicken Royale',
      itemPrice: 840,
    },
    {
      kitchen: 'Atelier 27',
      courseName: 'Miso Salmon & Spanish Latte Duet',
      detail: '28 Sep · ₹1,790 · Delivered to BKC Financial Center',
      price: 1790,
      itemToReorder: 'Miso Glazed Salmon',
      itemPrice: 1450,
    },
  ];

  return (
    <div id="view-prive-profile" className="flex flex-col w-full space-y-6 pb-12">
      {/* Black Member Card */}
      <div className="relative bg-gradient-to-br from-[#343537] via-[#1f2022] to-[#0d0e10] rounded-2xl p-6 sm:p-7 border border-[#4e4639]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between h-56 sm:h-60 overflow-hidden">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#e9c176]/15 blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e9c176] to-[#c5a059] text-[#412d00] flex items-center justify-center font-serif text-lg font-bold shadow-[0_0_16px_rgba(233,193,118,0.4)]">
              AD
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium leading-tight">
                Aravind Devan
              </h2>
              <p className="text-xs text-[#e9c176] font-sans tracking-wide">
                Black Card Member · #904-81
              </p>
            </div>
          </div>
          <Award className="w-8 h-8 text-[#e9c176]" />
        </div>

        <div className="flex items-end justify-between relative z-10 pt-4 border-t border-[#343537]/50">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#9a8f80] font-semibold block">
              Elvora Privé Reserve
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-[#e9c349] font-bold mt-0.5">
              ₹42,850 Dining Credits
            </p>
          </div>
          <span className="text-[11px] text-[#9a8f80] uppercase tracking-wider font-mono">
            Valid thru 12/28
          </span>
        </div>
      </div>

      {/* Privileges Grid */}
      <div className="space-y-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold block">
          Tier Advantages
        </span>
        <div className="grid grid-cols-2 gap-3">
          {privileges.map((priv) => {
            const Icon = priv.icon;
            return (
              <div
                key={priv.title}
                className="bg-[#1f2022] rounded-xl p-4 border border-[#343537]/50 flex flex-col gap-1.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#292a2c] flex items-center justify-center text-[#e9c176]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-serif text-sm text-[#e3e2e5] font-medium leading-snug">
                  {priv.title}
                </span>
                <span className="text-xs text-[#9a8f80]">{priv.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Order History */}
      <div className="bg-[#1f2022] rounded-xl p-5 border border-[#343537]/60 shadow-lg flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base sm:text-lg text-[#e3e2e5] font-medium">
            Recent Culinary Records
          </h3>
          <span className="text-xs text-[#9a8f80]">Historical Archives</span>
        </div>

        <div className="divide-y divide-[#292a2c]">
          {pastOrders.map((order, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <p className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium truncate">
                  {order.kitchen} · {order.courseName}
                </p>
                <p className="text-xs text-[#9a8f80] truncate mt-0.5">{order.detail}</p>
              </div>
              <button
                onClick={() => onReorder(order.kitchen, order.itemToReorder, order.itemPrice)}
                className="px-3 py-1.5 bg-[#292a2c] hover:bg-[#e9c176] text-[#e9c176] hover:text-[#412d00] text-[11px] uppercase font-bold tracking-wider rounded-lg transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-order</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
