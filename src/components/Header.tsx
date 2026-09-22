import React from 'react';
import { Search, ConciergeBell, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentLocation: string;
  activeTab: TabType;
  cartCount: number;
  onTabChange: (tab: TabType) => void;
  onOpenAddressModal: () => void;
  onOpenCartDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  activeTab,
  cartCount,
  onTabChange,
  onOpenAddressModal,
  onOpenCartDrawer
}) => {
  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'discover': return 'Discover';
      case 'curated-search': return 'Explore';
      case 'bespoke-orders': return 'Dispatch';
      case 'private-concierge': return 'Concierge';
      case 'prive-profile': return 'Privé';
      default: return 'Discover';
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#121315]/90 backdrop-blur-xl border-b border-[#292a2c]/60 shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand & Location block */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onTabChange('discover')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
            aria-label="ELVORA Home"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UbpfpbaicZkwgSKxcmcjnk5ui66Sz5aswefKBRd4_2zdq8US8OezQdsu6ZwNR2-KmaxWJFvGu6GOy7FBAyGL-K0jYhNgG6RHLjxB06fQtaj1aUsXHklYNnbT-X3OByqGSdpKp_4d8WpdxsPCvGudsg_pJc0Igd_gW1q3BPbQtPLyzwmaQ5prsYKhd5XZTAamQA9rKKSD6EbWs6LwrQbIb0qmw76yNuB6SmFUDta75B70rgo26sIDjX"
              alt="ELVORA Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-serif font-semibold text-xs tracking-[0.2em] text-[#e9c176] uppercase">
                ELVORA
              </span>
              <span className="text-[10px] tracking-widest text-[#9a8f80] uppercase">
                Haute Gastronomie
              </span>
            </div>
          </button>

          <span className="text-[#4e4639] hidden sm:inline">|</span>

          {/* Location button */}
          <button
            onClick={onOpenAddressModal}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#1f2022] hover:bg-[#292a2c] text-[#e3e2e5] transition-all border border-[#4e4639]/40 min-w-0 max-w-[200px] sm:max-w-xs text-left"
            title="Change Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#e9c176] shrink-0" />
            <div className="flex flex-col min-w-0 truncate">
              <span className="text-[9px] uppercase tracking-wider text-[#9a8f80] font-semibold leading-tight flex items-center gap-1">
                Delivering to
                <span className="text-[#e9c176] font-normal">({getTabLabel(activeTab)})</span>
              </span>
              <span className="text-xs font-medium text-[#e3e2e5] truncate">
                {currentLocation}
              </span>
            </div>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            id="btn-header-search"
            onClick={() => onTabChange('curated-search')}
            aria-label="Search Catalog"
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              activeTab === 'curated-search'
                ? 'bg-[#e9c176]/20 text-[#e9c176]'
                : 'text-[#d1c5b4] hover:text-[#e9c176] hover:bg-[#1f2022]'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            id="btn-header-concierge"
            onClick={() => onTabChange('private-concierge')}
            aria-label="Privé Sommelier Concierge"
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative ${
              activeTab === 'private-concierge'
                ? 'bg-[#e9c176]/20 text-[#e9c176]'
                : 'text-[#d1c5b4] hover:text-[#e9c176] hover:bg-[#1f2022]'
            }`}
          >
            <ConciergeBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e9c176] animate-pulse"></span>
          </button>

          <button
            id="btn-header-cart"
            onClick={onOpenCartDrawer}
            aria-label="Shopping Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#d1c5b4] hover:text-[#e9c176] hover:bg-[#1f2022] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#e9c176] text-[#412d00] font-sans text-[10px] leading-[18px] rounded-full flex items-center justify-center font-bold shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          <button
            id="btn-header-profile"
            onClick={() => onTabChange('prive-profile')}
            aria-label="Privé Member Profile"
            className="w-8 h-8 rounded-full bg-[#c5a059] hover:bg-[#e9c176] text-[#412d00] flex items-center justify-center font-serif text-xs font-bold transition-all ml-1 shadow-[0_0_12px_rgba(233,193,118,0.3)] active:scale-95"
            title="Aravind Devan · Black Card"
          >
            AD
          </button>
        </div>
      </div>
    </header>
  );
};
