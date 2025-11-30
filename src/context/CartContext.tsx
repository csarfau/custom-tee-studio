import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === item.product.id && 
             i.selectedSize === item.selectedSize && 
             i.selectedColor === item.selectedColor
      );
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
