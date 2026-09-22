import React from 'react';
import { Star, Compass, Receipt, ConciergeBell, Award } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'discover', label: 'Discover', icon: Star },
    { id: 'curated-search', label: 'Search', icon: Compass },
    { id: 'bespoke-orders', label: 'Orders', icon: Receipt },
    { id: 'private-concierge', label: 'Concierge', icon: ConciergeBell },
    { id: 'prive-profile', label: 'Privé', icon: Award },
  ];

  return (
    <nav
      id="bottom-app-navigation"
      className="fixed bottom-0 left-0 w-full z-40 bg-[#121315]/95 backdrop-blur-xl border-t border-[#292a2c] shadow-[0_-4px_24px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-all duration-200 relative ${
                isActive
                  ? 'text-[#e9c176] font-semibold scale-105'
                  : 'text-[#9a8f80] hover:text-[#d1c5b4]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.2px]' : 'stroke-[1.5px]'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#e9c176] shadow-[0_0_8px_#e9c176]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
