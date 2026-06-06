import React, { createContext, useContext, useState } from "react";

// 1. Create context
const WishlistContext = createContext();

// 2. Custom hook 
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// 3. Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  // remove logic

  const removeFromWishlist=(id)=>{
    setWishlist((prev)=>prev.filter((item)=>item.id !==id));
  };
  

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist ,removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};