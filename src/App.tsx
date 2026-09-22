import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DishCustomModal } from './components/DishCustomModal';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { AddressModal } from './components/AddressModal';

import { DiscoverView } from './components/DiscoverView';
import { SearchView } from './components/SearchView';
import { OrdersTrackingView } from './components/OrdersTrackingView';
import { ConciergeView } from './components/ConciergeView';
import { ProfileView } from './components/ProfileView';

import {
  RESTAURANTS,
  MAINS,
  COMBOS,
  FAST_SELLING,
  DRINKS,
  DESSERTS,
  INITIAL_CHAT_MESSAGES,
  CANNED_PROMPTS,
} from './data/culinaryData';

import { TabType, CartItem, Dish, Restaurant, CartCustomization, ChatMessage } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('discover');

  // Location State
  const [currentLocation, setCurrentLocation] = useState('The Bentley Suite · Mumbai');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Cart State (Initialized with 2 items per HTML blueprint)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'init-1',
      dishId: 'm1',
      name: 'Truffle Cream Pasta',
      price: 890,
      qty: 1,
      restaurant: 'Maison Ember',
    },
    {
      id: 'init-2',
      dishId: 'm3',
      name: 'Wagyu Steak',
      price: 1850,
      qty: 1,
      restaurant: 'Atelier 27',
    },
  ]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');

  // Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [selectedDishForCustom, setSelectedDishForCustom] = useState<Dish | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat Concierge State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = Math.max(0, subtotal + tax - appliedDiscount);

  // Quick Add Item
  const handleQuickAdd = (name: string, price: number, restaurant: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name,
          price,
          qty: 1,
          restaurant,
        },
      ];
    });
    showToast(`${name} joined your table.`);
  };

  // Bespoke Add with Customization
  const handleCustomAddToCart = (
    dish: Dish,
    qty: number,
    customization: CartCustomization
  ) => {
    const extraPrice = customization.extraTruffle ? 150 : 0;
    setCart((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        dishId: dish.id,
        name: dish.name,
        price: dish.price + extraPrice,
        qty,
        restaurant: dish.restaurant,
        customization,
      },
    ]);
    showToast(`${qty}x ${dish.name} bespoke preparation added to table.`);
  };

  // Quantity updates
  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // Promo Code Application
  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME250') {
      setAppliedDiscount(250);
      setPromoCode('WELCOME250');
      showToast('₹250 welcome privilege applied.');
      return { success: true, message: 'WELCOME250 applied! ₹250 saved.', discount: 250 };
    }
    if (clean === 'TWO20') {
      const disc = Math.round(subtotal * 0.2);
      setAppliedDiscount(disc);
      setPromoCode('TWO20');
      showToast('20% privilege deducted.');
      return { success: true, message: `TWO20 applied! ₹${disc} saved.`, discount: disc };
    }
    if (clean === 'PRIVE15') {
      const disc = Math.round(subtotal * 0.15);
      setAppliedDiscount(disc);
      setPromoCode('PRIVE15');
      showToast('Privé Reserve 15% applied.');
      return { success: true, message: `PRIVE15 applied! ₹${disc} saved.`, discount: disc };
    }
    return { success: false, message: 'Invalid voucher code. Try WELCOME250, TWO20, or PRIVE15.', discount: 0 };
  };

  // Order Placement
  const handlePlaceOrder = (_paymentMethod: string) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrderSuccessOpen(true);
    setCart([]);
    setAppliedDiscount(0);
  };

  // Concierge Chat Message Handler
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const conciergeMsg: ChatMessage = {
          id: `concierge-${Date.now()}`,
          sender: 'concierge',
          text: data.reply || "Understood. I have recorded your dining notes for Chef Laurent.",
          timestamp: 'Just now',
          suggestedAction: data.suggestedAction,
        };
        setChatMessages((prev) => [...prev, conciergeMsg]);
        return;
      }
    } catch (e) {
      // Fallback
    }

    // Graceful offline fallback
    setTimeout(() => {
      let reply = "Understood. I have relayed your preference to Chef Laurent. The kitchen is preparing with strict discretion and temperature custody.";
      const lower = text.toLowerCase();
      let suggestedAction: any = undefined;

      if (lower.includes('date') || lower.includes('romantic')) {
        reply = "For an unforgettable evening, I propose opening with the Brittany Lobster Thermidor from Maison Ember, concluding with our warm Belgian Chocolate Fondant. Shall I stage this for your table?";
        suggestedAction = { label: "Add Date Night Course", dishName: "Lobster Thermidor", price: 2100, restaurant: "Maison Ember" };
      } else if (lower.includes('veg')) {
        reply = "Our finest vegetarian expression tonight is the Truffle Mushroom Risotto from Noir Kitchen, paired with artisanal Paneer Khazana from The Saffron Room. Both are ready for immediate firing.";
        suggestedAction = { label: "Add Truffle Risotto", dishName: "Truffle Mushroom Risotto", price: 920, restaurant: "Noir Kitchen" };
      } else if (lower.includes('offer') || lower.includes('coupon')) {
        reply = "You hold Black Card privileges. Use voucher code WELCOME250 for a ₹250 deduction, or TWO20 for 20% off pairings.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `concierge-${Date.now()}`,
          sender: 'concierge',
          text: reply,
          timestamp: 'Just now',
          suggestedAction,
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#121315] text-[#e3e2e5] flex flex-col antialiased">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header */}
      <Header
        currentLocation={currentLocation}
        activeTab={activeTab}
        cartCount={cartCount}
        onTabChange={handleTabChange}
        onOpenAddressModal={() => setIsAddressModalOpen(true)}
        onOpenCartDrawer={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto pt-20 pb-24 px-4 sm:px-6">
        {activeTab === 'discover' && (
          <DiscoverView
            currentLocation={currentLocation}
            restaurants={RESTAURANTS}
            mains={MAINS}
            combos={COMBOS}
            fastSelling={FAST_SELLING}
            drinks={DRINKS}
            desserts={DESSERTS}
            onSelectLocationPill={(loc) => {
              setCurrentLocation(loc);
              showToast(`Destination set to ${loc}`);
            }}
            onTriggerGps={() => {
              setCurrentLocation('Altamount Residence · Mumbai');
              showToast('GPS Locked: Altamount Residence · 18 mins');
            }}
            onOpenAddressModal={() => setIsAddressModalOpen(true)}
            onOpenRestaurantModal={(r) => setSelectedRestaurant(r)}
            onOpenDishCustom={(d) => setSelectedDishForCustom(d)}
            onQuickAdd={handleQuickAdd}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'curated-search' && (
          <SearchView
            restaurants={RESTAURANTS}
            dishes={[...MAINS, ...DESSERTS, ...DRINKS]}
            onOpenRestaurantModal={(r) => setSelectedRestaurant(r)}
            onOpenDishCustom={(d) => setSelectedDishForCustom(d)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeTab === 'bespoke-orders' && (
          <OrdersTrackingView onShowToast={showToast} />
        )}

        {activeTab === 'private-concierge' && (
          <ConciergeView
            messages={chatMessages}
            cannedPrompts={CANNED_PROMPTS}
            onSendMessage={handleSendMessage}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeTab === 'prive-profile' && (
          <ProfileView
            onReorder={(kitchen, dishName, price) => {
              handleQuickAdd(dishName, price, kitchen);
              setIsCartOpen(true);
            }}
          />
        )}
      </main>

      {/* Floating Cart Bar (emerges when items in cart) */}
      {!isCartOpen && !isCheckoutOpen && (
        <FloatingCartBar
          itemCount={cartCount}
          totalAmount={totalAmount}
          onOpenCartDrawer={() => setIsCartOpen(true)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        appliedDiscount={appliedDiscount}
        promoCode={promoCode}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onApplyPromo={handleApplyPromo}
        onQuickAdd={handleQuickAdd}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        destination={currentLocation}
        totalAmount={totalAmount}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        orderNumber="ELV-9842"
        onGoToTracking={() => {
          setIsOrderSuccessOpen(false);
          setActiveTab('bespoke-orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <DishCustomModal
        dish={selectedDishForCustom}
        onClose={() => setSelectedDishForCustom(null)}
        onAddToCart={handleCustomAddToCart}
      />

      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        dishes={[...MAINS, ...DESSERTS, ...DRINKS]}
        onClose={() => setSelectedRestaurant(null)}
        onOpenDishCustom={(d) => {
          setSelectedRestaurant(null);
          setSelectedDishForCustom(d);
        }}
        onQuickAdd={handleQuickAdd}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        currentAddress={currentLocation}
        onClose={() => setIsAddressModalOpen(false)}
        onSelectAddress={(addr) => {
          setCurrentLocation(addr);
          showToast(`Address updated: ${addr}`);
        }}
      />
    </div>
  );
}
