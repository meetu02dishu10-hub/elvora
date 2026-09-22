import React from 'react';
import { ConciergeBell, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderNumber: string;
  onGoToTracking: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderNumber,
  onGoToTracking,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          id="order-success-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1f2022] rounded-2xl p-6 sm:p-8 text-center max-w-sm w-full border border-[#4e4639]/50 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-[#e9c176]/20 border border-[#e9c176]/40 text-[#e9c176] flex items-center justify-center shadow-[0_0_24px_rgba(233,193,118,0.3)]">
            <ConciergeBell className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#e9c176] font-semibold">
              Order Dispatched · #{orderNumber}
            </span>
            <h2 className="font-serif text-2xl text-[#e3e2e5] font-semibold mt-1">
              Your evening is officially sorted.
            </h2>
            <p className="text-xs text-[#d1c5b4] mt-2 leading-relaxed">
              The kitchen has received your notes. Relax while our thermal courier navigates the night with vacuum-sealed temperature care.
            </p>
          </div>

          <div className="w-full pt-2">
            <button
              id="btn-success-track"
              onClick={onGoToTracking}
              className="w-full py-3.5 bg-gradient-to-r from-[#e9c176] to-[#c5a059] text-[#412d00] rounded-xl text-xs uppercase font-bold tracking-wider shadow-lg hover:from-[#f3d389] hover:to-[#e9c176] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Thermal Courier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
