import React, { useState } from 'react';
import { X, CreditCard, Landmark, QrCode, Banknote, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  destination: string;
  totalAmount: number;
  onClose: () => void;
  onPlaceOrder: (paymentMethod: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  destination,
  totalAmount,
  onClose,
  onPlaceOrder,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'credits' | 'upi' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder(selectedMethod);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          id="checkout-modal-container"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1b1c1e] w-full max-w-lg max-h-[90vh] rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto border border-[#343537] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#292a2c]">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
                Final Orchestration
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
                Discreet Delivery & Settlement
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1f2022] hover:bg-[#292a2c] flex items-center justify-center text-[#d1c5b4] hover:text-white transition-colors"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Destination */}
          <div className="bg-[#1f2022] p-4 rounded-xl border border-[#343537]/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#e9c176] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Destination Confirmed
              </span>
              <span className="text-[11px] text-[#9a8f80]">White-Glove Courier</span>
            </div>
            <p className="font-serif text-base text-[#e3e2e5] font-medium">
              {destination}
            </p>
            <p className="text-xs text-[#9a8f80]">
              4th Floor, Tower B, Bandra Kurla Complex, Mumbai · Thermal Hand-off
            </p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold block">
              Select Preferred Settlement
            </label>

            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                selectedMethod === 'card'
                  ? 'bg-[#292a2c] border-[#e9c176] text-white shadow-md'
                  : 'bg-[#1f2022] border-[#343537]/40 text-[#9a8f80] hover:border-[#4e4639]'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#e9c176]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#e3e2e5]">Black Amex / Elite Card</span>
                  <span className="text-xs text-[#9a8f80]">•••• 8829 · Concierge Direct Bill</span>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'card'
                    ? 'border-[#e9c176] bg-[#e9c176]'
                    : 'border-[#4e4639]'
                }`}
              >
                {selectedMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-[#412d00]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('credits')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                selectedMethod === 'credits'
                  ? 'bg-[#292a2c] border-[#e9c176] text-white shadow-md'
                  : 'bg-[#1f2022] border-[#343537]/40 text-[#9a8f80] hover:border-[#4e4639]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#e9c176]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#e3e2e5]">Privé Reserve Credits</span>
                  <span className="text-xs text-[#e9c176]">₹42,850 available</span>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'credits'
                    ? 'border-[#e9c176] bg-[#e9c176]'
                    : 'border-[#4e4639]'
                }`}
              >
                {selectedMethod === 'credits' && <div className="w-1.5 h-1.5 rounded-full bg-[#412d00]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('upi')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                selectedMethod === 'upi'
                  ? 'bg-[#292a2c] border-[#e9c176] text-white shadow-md'
                  : 'bg-[#1f2022] border-[#343537]/40 text-[#9a8f80] hover:border-[#4e4639]'
              }`}
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-[#e9c176]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#e3e2e5]">Instant UPI / Apple Pay</span>
                  <span className="text-xs text-[#9a8f80]">Secure 256-bit tokenized gateway</span>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'upi'
                    ? 'border-[#e9c176] bg-[#e9c176]'
                    : 'border-[#4e4639]'
                }`}
              >
                {selectedMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-[#412d00]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('cod')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                selectedMethod === 'cod'
                  ? 'bg-[#292a2c] border-[#e9c176] text-white shadow-md'
                  : 'bg-[#1f2022] border-[#343537]/40 text-[#9a8f80] hover:border-[#4e4639]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-[#e9c176]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#e3e2e5]">Curated Cash on Arrival</span>
                  <span className="text-xs text-[#9a8f80]">Discreet envelope settlement with courier</span>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'cod'
                    ? 'border-[#e9c176] bg-[#e9c176]'
                    : 'border-[#4e4639]'
                }`}
              >
                {selectedMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-[#412d00]" />}
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#9a8f80] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#e9c176] shrink-0" />
            <span>Encrypted transmission · Temperature guarantee under 35 mins</span>
          </div>

          {/* Confirm Button */}
          <button
            id="btn-confirm-place-order"
            disabled={isProcessing}
            onClick={handleExecute}
            className="w-full py-4 bg-gradient-to-r from-[#e9c176] via-[#f3d389] to-[#c5a059] text-[#412d00] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.99] cursor-pointer"
          >
            {isProcessing ? 'Securing Kitchen Slot...' : `Place Order · ₹${totalAmount.toLocaleString('en-IN')}`}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
