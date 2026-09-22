import React, { useState } from 'react';
import { X, MapPin, Building, Home, Hotel, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddressModalProps {
  isOpen: boolean;
  currentAddress: string;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  currentAddress,
  onClose,
  onSelectAddress,
}) => {
  const [manualInput, setManualInput] = useState('');

  if (!isOpen) return null;

  const quickAddresses = [
    { label: 'The Bentley Suite · Mumbai', note: 'Suite 402, High-Rise Tower B', icon: Home },
    { label: 'BKC Financial Center · Mumbai', note: 'Executive Floor 14, North Wing', icon: Building },
    { label: 'Taj Mahal Palace · Colaba', note: 'Royal Heritage Tower Suite', icon: Hotel },
    { label: 'Altamount Penthouse · Mumbai', note: 'Private Residence, Cumballa Hill', icon: Building },
  ];

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onSelectAddress(manualInput.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          id="address-modal-container"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#1b1c1e] w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-[#343537] shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#292a2c]">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#e9c176] font-semibold">
                Delivery Coordinates
              </span>
              <h3 className="font-serif text-xl text-[#e3e2e5] font-medium">
                Enter Suite or Address
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1f2022] hover:bg-[#292a2c] flex items-center justify-center text-[#d1c5b4] hover:text-white transition-colors"
              aria-label="Close Address Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick select saved addresses */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold block">
              Saved Privé Destinations
            </span>
            {quickAddresses.map((addr) => {
              const Icon = addr.icon;
              const isSelected = currentAddress.toLowerCase().includes(addr.label.split('·')[0].trim().toLowerCase());
              return (
                <button
                  key={addr.label}
                  onClick={() => {
                    onSelectAddress(addr.label);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#292a2c] border-[#e9c176] text-white shadow-sm'
                      : 'bg-[#1f2022] border-[#343537]/50 text-[#d1c5b4] hover:border-[#4e4639]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#121315] flex items-center justify-center text-[#e9c176]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-medium text-[#e3e2e5]">
                        {addr.label}
                      </span>
                      <span className="text-[11px] text-[#9a8f80]">{addr.note}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#e9c176]" />}
                </button>
              );
            })}
          </div>

          {/* Manual input */}
          <form onSubmit={handleSaveManual} className="space-y-2 pt-2 border-t border-[#292a2c]">
            <label className="text-[10px] uppercase tracking-wider text-[#9a8f80] font-semibold block">
              Or Specify Custom Residence / Penthouse
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8f80]" />
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g., Penthouse 18, Worli Sea Face, Mumbai"
                className="w-full pl-9 pr-3 py-2.5 bg-[#1f2022] rounded-xl text-xs sm:text-sm text-[#e3e2e5] placeholder:text-[#9a8f80] border border-[#343537] focus:outline-none focus:ring-1 focus:ring-[#e9c176]"
              />
            </div>
            <button
              type="submit"
              disabled={!manualInput.trim()}
              className="w-full py-3 bg-[#e9c176] disabled:opacity-40 hover:bg-[#f3d389] text-[#412d00] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              Confirm Location
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
