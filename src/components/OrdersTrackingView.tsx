import React, { useState, useEffect } from 'react';
import {
  Bike,
  Sparkles,
  Check,
  CheckCheck,
  Phone,
  MessageSquare,
  Gamepad2,
  RotateCcw,
  UtensilsCrossed,
  Wine,
  Cake,
  Sandwich,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface OrdersTrackingViewProps {
  onShowToast: (msg: string) => void;
}

interface MemoryCard {
  id: number;
  iconName: 'utensils' | 'wine' | 'cake' | 'sandwich';
  isFlipped: boolean;
  isMatched: boolean;
}

export const OrdersTrackingView: React.FC<OrdersTrackingViewProps> = ({ onShowToast }) => {
  // 15. Food Memory Mini-Game State
  const initialCards: MemoryCard[] = [
    { id: 1, iconName: 'utensils', isFlipped: false, isMatched: false },
    { id: 2, iconName: 'wine', isFlipped: false, isMatched: false },
    { id: 3, iconName: 'cake', isFlipped: false, isMatched: false },
    { id: 4, iconName: 'sandwich', isFlipped: false, isMatched: false },
    { id: 5, iconName: 'utensils', isFlipped: false, isMatched: false },
    { id: 6, iconName: 'wine', isFlipped: false, isMatched: false },
    { id: 7, iconName: 'cake', isFlipped: false, isMatched: false },
    { id: 8, iconName: 'sandwich', isFlipped: false, isMatched: false },
  ];

  const [cards, setCards] = useState<MemoryCard[]>(() =>
    [...initialCards].sort(() => Math.random() - 0.5)
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [gameTime, setGameTime] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [matches, setMatches] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (!gameActive || gameTime <= 0) return;
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          onShowToast("Time's up! Your thermal courier is still racing ahead.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive, gameTime]);

  const restartGame = () => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatches(0);
    setGameTime(30);
    setGameActive(true);
  };

  const handleCardClick = (index: number) => {
    if (!gameActive || selectedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      if (newCards[firstIdx].iconName === newCards[secondIdx].iconName) {
        // Matched!
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setMatches((prev) => {
            const nextMatch = prev + 1;
            if (nextMatch === 4) {
              setGameActive(false);
              onShowToast('Mastered! 100 bonus Privé credits unlocked.');
            }
            return nextMatch;
          });
          setSelectedCards([]);
        }, 300);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  const renderCardIcon = (name: string) => {
    switch (name) {
      case 'utensils': return <UtensilsCrossed className="w-5 h-5 text-[#e9c176]" />;
      case 'wine': return <Wine className="w-5 h-5 text-[#e9c176]" />;
      case 'cake': return <Cake className="w-5 h-5 text-[#e9c176]" />;
      case 'sandwich': return <Sandwich className="w-5 h-5 text-[#e9c176]" />;
      default: return null;
    }
  };

  return (
    <div id="view-bespoke-orders" className="flex flex-col w-full space-y-6 pb-12">
      {/* Trajectory Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold font-sans">
            Active Dispatch
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
            Order Trajectory
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#e9c176]/15 border border-[#e9c176]/30 text-[#e9c176] text-xs font-semibold flex items-center gap-1.5 font-sans">
          <span className="w-2 h-2 rounded-full bg-[#e9c176] animate-pulse" />
          Order #ELV-9842
        </span>
      </div>

      {/* Live Tracking Map Card */}
      <div className="bg-[#1f2022] rounded-xl overflow-hidden border border-[#343537]/60 shadow-xl p-5 flex flex-col gap-5">
        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-[#343537]/50 bg-[#121315]">
          {/* Mumbai Worli Sea Link Night Texture */}
          <img
            src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=900&auto=format&fit=crop"
            alt="Bandra to Worli Sea Link Route"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2022] via-[#1f2022]/40 to-transparent" />

          {/* Animated Route Line */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#292a2c] via-[#e9c176] to-[#e9c176]/30 rounded-full" />

          {/* Live Courier Pin Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-[#e9c176]/30 animate-ping absolute" />
              <div className="w-11 h-11 rounded-full bg-[#e9c176] text-[#412d00] flex items-center justify-center shadow-[0_0_20px_rgba(233,193,118,0.5)] z-10">
                <Bike className="w-5 h-5 stroke-[2.2px]" />
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-[#0d0e10]/90 text-[9px] uppercase tracking-wider text-[#e9c176] font-semibold border border-[#e9c176]/30">
              Thermal Courier #4
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#e3e2e5]">
            <span className="font-serif text-base sm:text-lg font-semibold">ETA: 14 Minutes</span>
            <span className="text-xs text-[#e9c176] font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              Worli Sea Link · 62 km/h
            </span>
          </div>
        </div>

        {/* Playful Butler Note */}
        <div className="p-3.5 bg-[#292a2c]/60 rounded-xl border border-[#4e4639]/30 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#e9c176] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#e9c176] font-semibold">
              Butler Note
            </span>
            <span className="text-xs text-[#d1c5b4] italic">
              “Almost there. Prepare absolutely nothing.”
            </span>
          </div>
        </div>

        {/* Route Stepper Timeline */}
        <div className="flex flex-col gap-4 px-1 pt-1">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#e9c176] text-[#412d00] flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
              <div className="w-0.5 h-8 bg-[#e9c176]" />
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium">
                Order Confirmed
              </p>
              <p className="text-xs text-[#9a8f80]">
                Atelier 27 accepted your tasting curation
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#e9c176] text-[#412d00] flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
              <div className="w-0.5 h-8 bg-[#e9c176]" />
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium">
                Kitchen Assembly
              </p>
              <p className="text-xs text-[#9a8f80]">
                Chef Laurent plating with custom temperature seals
              </p>
            </div>
          </div>

          {/* Step 3 (Active) */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#c5a059] text-[#412d00] flex items-center justify-center ring-2 ring-[#e9c176]/50 animate-pulse">
                <Bike className="w-3.5 h-3.5" />
              </div>
              <div className="w-0.5 h-8 bg-[#343537]" />
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base text-[#e9c176] font-medium">
                Courier in Transit
              </p>
              <p className="text-xs text-[#d1c5b4]">
                Passing Worli Gateway · Thermal Chamber #4
              </p>
            </div>
          </div>

          {/* Step 4 (Pending) */}
          <div className="flex items-start gap-3 opacity-50">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#343537] text-[#9a8f80] flex items-center justify-center">
                <CheckCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium">
                White-Glove Arrival
              </p>
              <p className="text-xs text-[#9a8f80]">
                Doorstep placement at The Bentley Suite
              </p>
            </div>
          </div>
        </div>

        {/* Courier Contact Details Card */}
        <div className="flex items-center justify-between p-3.5 bg-[#1b1c1e] rounded-xl border border-[#343537]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#292a2c] flex items-center justify-center text-[#e9c176] border border-[#4e4639]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-[#e3e2e5] font-medium">Rohan Verma</span>
              <span className="text-xs text-[#9a8f80]">Dedicated Courier · 4.98 ★</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Calling Rohan via encrypted voice gateway...')}
              className="w-9 h-9 rounded-full bg-[#292a2c] hover:bg-[#38393b] flex items-center justify-center text-[#e9c176] transition-all active:scale-95 cursor-pointer"
              title="Call Courier"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShowToast('Encrypted dispatch messaging channel open.')}
              className="w-9 h-9 rounded-full bg-[#292a2c] hover:bg-[#38393b] flex items-center justify-center text-[#e9c176] transition-all active:scale-95 cursor-pointer"
              title="Message Courier"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 15. "WHILE YOU WAIT" FOOD MEMORY MINI-GAME */}
      <div className="bg-[#1f2022] rounded-xl p-5 border border-[#343537]/60 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e9c349]/20 flex items-center justify-center text-[#e9c349]">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg text-[#e3e2e5] font-medium">
                While You Wait
              </h3>
              <p className="text-xs text-[#9a8f80]">The 30-Second Gastronomy Match</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase font-mono font-bold text-[#e9c176]">
              Time: {gameTime}s
            </span>
            <p className="text-xs text-[#d1c5b4]">Matches: {matches}/4</p>
          </div>
        </div>

        {/* 8 Memory Cards Grid */}
        <div className="grid grid-cols-4 gap-2.5 pt-1">
          {cards.map((card, idx) => {
            const isShown = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all border ${
                  card.isMatched
                    ? 'bg-[#e9c176]/25 border-[#e9c176] shadow-sm'
                    : isShown
                    ? 'bg-[#1b1c1e] border-[#e9c176]'
                    : 'bg-[#343537] border-transparent hover:bg-[#38393b]'
                }`}
                aria-label={`Memory card ${idx + 1}`}
              >
                {isShown ? (
                  renderCardIcon(card.iconName)
                ) : (
                  <span className="text-[#9a8f80] text-xs font-serif">?</span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={restartGame}
          className="w-full py-2.5 bg-[#292a2c] hover:bg-[#343537] text-[#d1c5b4] hover:text-[#e3e2e5] text-xs uppercase font-semibold tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Memory Match</span>
        </button>
      </div>
    </div>
  );
};
