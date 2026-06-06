import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Custom Hook
export const useCart = () => {
    return useContext(CartContext);
};

// Provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id)
            if (exists) {
                alert(" You already added this product to cart");
                return prev
            }
            return [...prev, product];
        })
    }
    // remove
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };


    // Increase quantity

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, qty: (item.qty || 1) + 1 }
                    : item
            )
        );
    };

    // Decrease quantity

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        qty: item.qty > 1 ? item.qty - 1 : 1,
                    }
                    : item
            )
        );
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}>
            {children}
        </CartContext.Provider>
    );
};