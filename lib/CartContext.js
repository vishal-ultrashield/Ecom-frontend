// lib/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product, quantity = 1) => {
        console.log('addToCart called with:', { product, quantity });
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            let newCart;
            if (existingItem) {
                // If item exists, increase quantity
                newCart = prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // If item doesn't exist, add new item
                newCart = [...prevCart, { ...product, quantity }];
            }
            console.log('New cart state:', newCart);
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(item => item.id !== productId);
            console.log('Cart after removal:', newCart);
            return newCart;
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => {
            const newCart = prevCart.map(item =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            console.log('Cart after quantity update:', newCart);
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        console.log('Cart cleared');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isLoaded }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);