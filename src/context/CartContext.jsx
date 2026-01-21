import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to cart
  const addToCart = (product) => {
    // Check if item is already in cart to prevent duplicates (optional logic)
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      alert("Item is already in your cart!");
      return;
    }
    setCartItems([...cartItems, product]);
    // Optional: Show a tiny popup or log
    console.log("Added to cart:", product.title);
  };

  // Function to remove item
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Calculate Total Price
  const cartTotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook to use the Context easily
export const useCart = () => useContext(CartContext);