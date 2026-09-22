import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          id="toast-notification"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#343537]/95 backdrop-blur-xl border border-[#4e4639]/60 shadow-[0_12px_36px_rgba(0,0,0,0.7)] text-[#e3e2e5] max-w-sm w-auto mx-auto"
        >
          <CheckCircle2 className="w-4 h-4 text-[#e9c176] shrink-0" />
          <span className="text-xs sm:text-sm font-medium tracking-wide font-sans">{message}</span>
          <button
            onClick={onClose}
            className="p-1 hover:text-[#e9c176] transition-colors ml-1 text-[#9a8f80]"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
