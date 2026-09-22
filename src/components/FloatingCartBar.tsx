import React from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingCartBarProps {
  itemCount: number;
  totalAmount: number;
  onOpenCartDrawer: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  totalAmount,
  onOpenCartDrawer,
}) => {
  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          id="floating-cart-bar"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40 bg-gradient-to-r from-[#e9c176] via-[#f3d389] to-[#e9c176] text-[#412d00] rounded-xl p-3.5 shadow-[0_12px_36px_rgba(233,193,118,0.25)] flex items-center justify-between border border-[#ffdea5]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#412d00] text-[#e9c176] flex items-center justify-center font-bold text-xs shadow-inner">
              {itemCount}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#412d00]/80">
                Your Table Is Prepared
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-[#261900] leading-tight">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            id="btn-view-table-float"
            onClick={onOpenCartDrawer}
            className="flex items-center gap-1.5 bg-[#121315] hover:bg-[#1f2022] text-[#e9c176] px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>View Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
