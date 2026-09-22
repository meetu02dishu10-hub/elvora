import React, { useState } from 'react';
import { X, Plus, Minus, Sparkles, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  appliedDiscount: number;
  promoCode: string;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onApplyPromo: (code: string) => { success: boolean; message: string; discount: number };
  onQuickAdd: (name: string, price: number, restaurant: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  appliedDiscount,
  promoCode,
  onClose,
  onUpdateQty,
  onApplyPromo,
  onQuickAdd,
  onProceedToCheckout,
}) => {
  const [inputCode, setInputCode] = useState(promoCode);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal + tax - appliedDiscount);

  const handleApplyPromo = () => {
    if (!inputCode.trim()) {
      setPromoMessage({ text: 'Please enter a voucher code', isError: true });
      return;
    }
    const result = onApplyPromo(inputCode.trim().toUpperCase());
    setPromoMessage({ text: result.message, isError: !result.success });
  };

  const recommendations = [
    { name: 'Belgian Chocolate Fondant', price: 520, restaurant: 'Maison Ember' },
    { name: 'Signature Elvora Tonic', price: 390, restaurant: 'Elvora Cellar' },
    { name: 'Truffle Mushroom Risotto', price: 920, restaurant: 'Noir Kitchen' },
    { name: 'Pistachio Tiramisu', price: 490, restaurant: 'Atelier 27' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          id="cart-drawer-container"
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
                Fine Dining Tray
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
                Your Table is Ready
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1f2022] hover:bg-[#292a2c] flex items-center justify-center text-[#d1c5b4] hover:text-white transition-colors"
              aria-label="Close Tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            {cart.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-2 text-[#9a8f80]">
                <p className="font-serif italic text-base">Your table is empty.</p>
                <p className="text-xs">Select master mains, pairings, or signature cellar items.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 bg-[#1f2022] rounded-xl border border-[#343537]/50"
                >
                  <div className="flex flex-col pr-2">
                    <span className="font-serif text-sm sm:text-base text-[#e3e2e5] font-medium">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#9a8f80]">
                      {item.restaurant} · ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.customization && (
                      <span className="text-[10px] text-[#e9c176]/90 mt-0.5">
                        Spice: {item.customization.spiceLevel}
                        {item.customization.extraTruffle ? ' • Extra Truffle' : ''}
                        {item.customization.glutenFree ? ' • Gluten-Free' : ''}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-[#292a2c] px-2.5 py-1.5 rounded-lg border border-[#4e4639]/40">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-[#e9c176] hover:text-white font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-[#e3e2e5] px-1 min-w-[16px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#e9c176] hover:text-white font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sommelier Recommendations */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 text-[#e9c176]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">
                Sommelier Recommends
              </span>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {recommendations.map((rec) => (
                <div
                  key={rec.name}
                  className="min-w-[190px] bg-[#1f2022] p-3 rounded-xl border border-[#343537]/50 flex flex-col justify-between shrink-0"
                >
                  <span className="font-serif text-xs text-[#e3e2e5] truncate font-medium">
                    {rec.name}
                  </span>
                  <span className="text-xs font-semibold text-[#e9c176] mt-0.5">
                    ₹{rec.price}
                  </span>
                  <button
                    onClick={() => onQuickAdd(rec.name, rec.price, rec.restaurant)}
                    className="mt-2 py-1 px-2.5 bg-[#e9c176]/15 hover:bg-[#e9c176] text-[#e9c176] hover:text-[#412d00] rounded text-[10px] uppercase font-semibold tracking-wider transition-all"
                  >
                    + Add Pairing
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="bg-[#1f2022] p-3.5 rounded-xl border border-[#343537]/50 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8f80]" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="WELCOME250, TWO20, PRIVE15"
                  className="w-full pl-9 pr-3 py-2 bg-[#292a2c] rounded-lg text-xs uppercase tracking-wider text-[#e3e2e5] placeholder:text-[#9a8f80] focus:outline-none focus:ring-1 focus:ring-[#e9c176]"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-[#c5a059] hover:bg-[#e9c176] text-[#412d00] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Apply
              </button>
            </div>
            {promoMessage ? (
              <p
                className={`text-[11px] ${
                  promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {promoMessage.text}
              </p>
            ) : (
              <p className="text-[11px] text-[#9a8f80]">
                Try code{' '}
                <button
                  onClick={() => {
                    setInputCode('WELCOME250');
                    onApplyPromo('WELCOME250');
                  }}
                  className="text-[#e9c176] font-semibold underline underline-offset-2"
                >
                  WELCOME250
                </button>{' '}
                for ₹250 dining credit.
              </p>
            )}
          </div>

          {/* Bill Breakdown */}
          <div className="bg-[#1f2022] p-4 rounded-xl border border-[#343537]/60 space-y-2">
            <div className="flex justify-between text-xs text-[#9a8f80]">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-[#9a8f80]">
              <span>Thermal Concierge Delivery</span>
              <span className="text-[#e9c176] uppercase tracking-wider text-[10px] font-semibold">
                Complimentary (Privé)
              </span>
            </div>
            <div className="flex justify-between text-xs text-[#9a8f80]">
              <span>Culinary Taxes & Packaging (5%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-xs text-[#e9c176] font-semibold">
                <span>Privé Privilege Deduction</span>
                <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#343537] flex justify-between font-serif text-base text-[#e3e2e5] font-semibold">
              <span>Total Investment</span>
              <span className="text-[#e9c176]">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            id="btn-cart-proceed-checkout"
            disabled={cart.length === 0}
            onClick={onProceedToCheckout}
            className="w-full py-3.5 bg-gradient-to-r from-[#e9c176] to-[#c5a059] hover:from-[#f3d389] hover:to-[#e9c176] disabled:opacity-40 disabled:cursor-not-allowed text-[#412d00] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all active:scale-[0.99] cursor-pointer"
          >
            Proceed To Checkout · ₹{total.toLocaleString('en-IN')}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
