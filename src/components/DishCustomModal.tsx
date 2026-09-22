import React, { useState } from 'react';
import { X, Plus, Minus, ChefHat } from 'lucide-react';
import { Dish, CartCustomization } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DishCustomModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, qty: number, customization: CartCustomization) => void;
}

export const DishCustomModal: React.FC<DishCustomModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [spiceLevel, setSpiceLevel] = useState<'Delicate' | 'Balanced' | 'Robust'>('Balanced');
  const [extraTruffle, setExtraTruffle] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [omitAllium, setOmitAllium] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [qty, setQty] = useState(1);

  if (!dish) return null;

  const handleConfirm = () => {
    onAddToCart(dish, qty, {
      spiceLevel,
      extraTruffle,
      glutenFree,
      omitAllium,
      specialInstructions,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          id="custom-modal-container"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1f2022] w-full max-w-lg max-h-[90vh] rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto border border-[#343537] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-[#292a2c]">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
                Bespoke Preparation · {dish.restaurant}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#e3e2e5] font-medium">
                {dish.name}
              </h3>
              <p className="font-serif text-lg text-[#e9c176] font-semibold mt-0.5">
                ₹{dish.price.toLocaleString('en-IN')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#292a2c] hover:bg-[#343537] flex items-center justify-center text-[#d1c5b4] hover:text-white transition-colors"
              aria-label="Close Customization"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Spice Intensity */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold block">
              Spice Intensity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Delicate', 'Balanced', 'Robust'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                    spiceLevel === level
                      ? 'bg-[#e9c176] text-[#412d00] font-semibold shadow-md'
                      : 'bg-[#292a2c] text-[#d1c5b4] hover:bg-[#343537]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Kitchen Nuances */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold block">
              Kitchen Nuances
            </label>

            <label className="flex items-center justify-between p-3 bg-[#1b1c1e] rounded-xl border border-[#343537]/50 cursor-pointer hover:border-[#4e4639]">
              <span className="text-xs sm:text-sm text-[#e3e2e5]">Extra Truffle Emulsion (+₹150)</span>
              <input
                type="checkbox"
                checked={extraTruffle}
                onChange={(e) => setExtraTruffle(e.target.checked)}
                className="w-4 h-4 accent-[#e9c176] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#1b1c1e] rounded-xl border border-[#343537]/50 cursor-pointer hover:border-[#4e4639]">
              <span className="text-xs sm:text-sm text-[#e3e2e5]">Gluten-free Handcrafted Prep</span>
              <input
                type="checkbox"
                checked={glutenFree}
                onChange={(e) => setGlutenFree(e.target.checked)}
                className="w-4 h-4 accent-[#e9c176] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#1b1c1e] rounded-xl border border-[#343537]/50 cursor-pointer hover:border-[#4e4639]">
              <span className="text-xs sm:text-sm text-[#e3e2e5]">Omit Allium & Spring Onions</span>
              <input
                type="checkbox"
                checked={omitAllium}
                onChange={(e) => setOmitAllium(e.target.checked)}
                className="w-4 h-4 accent-[#e9c176] rounded"
              />
            </label>
          </div>

          {/* Special Chef Instructions */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-[#e9c176]" />
              Note for Executive Chef
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Please serve warm on arrival, dressing on the side..."
              className="w-full bg-[#1b1c1e] rounded-xl p-3 text-xs text-[#e3e2e5] placeholder:text-[#9a8f80] border border-[#343537]/60 focus:outline-none focus:ring-1 focus:ring-[#e9c176]"
            />
          </div>

          {/* Quantity & Submit */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 bg-[#1b1c1e] px-3.5 py-2 rounded-xl border border-[#343537]">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="text-[#e9c176] hover:text-white font-bold text-base"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif text-base font-bold text-[#e3e2e5] min-w-[20px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="text-[#e9c176] hover:text-white font-bold text-base"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 ml-4 py-3.5 bg-gradient-to-r from-[#e9c176] to-[#c5a059] hover:from-[#f3d389] hover:to-[#e9c176] text-[#412d00] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Add To Table · ₹{(dish.price * qty).toLocaleString('en-IN')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
