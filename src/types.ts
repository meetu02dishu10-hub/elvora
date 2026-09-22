export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  reviews: string;
  time: string;
  distance: string;
  priceForTwo: string;
  image: string;
  imgAlt: string;
  highlight: string;
  description: string;
  chef: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  restaurant: string;
  cuisine: string;
  veg: boolean;
  rating: string;
  desc: string;
  image: string;
  category: 'mains' | 'drinks' | 'desserts' | 'starters';
  calories?: string;
  pairingNote?: string;
}

export interface Combo {
  id: string;
  name: string;
  original: number;
  price: number;
  savings: string;
  desc: string;
  restaurant: string;
  image: string;
  courseCount: number;
}

export interface FastSellingItem {
  id: string;
  name: string;
  restaurant: string;
  count: string;
  price: number;
  image: string;
}

export interface CartCustomization {
  spiceLevel: 'Delicate' | 'Balanced' | 'Robust';
  extraTruffle: boolean;
  glutenFree: boolean;
  omitAllium: boolean;
  specialInstructions: string;
}

export interface CartItem {
  id: string;
  dishId?: string;
  name: string;
  price: number;
  qty: number;
  restaurant: string;
  image?: string;
  customization?: CartCustomization;
}

export type TabType = 'discover' | 'curated-search' | 'bespoke-orders' | 'private-concierge' | 'prive-profile';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    dishName: string;
    price: number;
    restaurant: string;
  };
}
