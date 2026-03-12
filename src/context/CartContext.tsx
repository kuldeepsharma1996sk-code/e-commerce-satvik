"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

interface CartItem {
    product: Product;
    quantity: number;
    selectedVariants?: Record<string, string>;
    isSubscription?: boolean;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, variants?: Record<string, string>, isSubscription?: boolean) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    discount: number;
    total: number;
    couponCode: string;
    applyCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPON_CODES: Record<string, number> = {
    SHIVA20: 20,
    DIWALI50: 50,
    FIRST10: 10,
    SATTVA15: 15,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [couponCode, setCouponCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);

    const addItem = useCallback(
        (product: Product, variants?: Record<string, string>, isSubscription?: boolean) => {
            setItems((prev) => {
                const existingIndex = prev.findIndex(
                    (item) => item.product.id === product.id && item.isSubscription === isSubscription
                );
                if (existingIndex >= 0) {
                    const updated = [...prev];
                    updated[existingIndex].quantity += 1;
                    return updated;
                }
                return [...prev, { product, quantity: 1, selectedVariants: variants, isSubscription }];
            });
        },
        []
    );

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.product.id !== productId));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        setCouponCode("");
        setDiscountPercent(0);
    }, []);

    const applyCoupon = useCallback((code: string) => {
        const upper = code.toUpperCase();
        if (COUPON_CODES[upper]) {
            setCouponCode(upper);
            setDiscountPercent(COUPON_CODES[upper]);
        }
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
        const price = item.isSubscription
            ? Math.round(item.product.price * 0.85)
            : item.product.price;
        return sum + price * item.quantity;
    }, 0);
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount;

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
                discount,
                total,
                couponCode,
                applyCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
