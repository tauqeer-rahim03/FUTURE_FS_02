import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
    const decreaseQuantity = (productId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== productId);
            }
            return prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };
    const clearCart = () => {
        setCart([]);
    };
    const value = {
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export { CartProvider, useCart };
export default CartContext;
