"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
    email: string;
    name: string;
    rashi: string;
    phone: string;
}

interface Order {
    id: string;
    date: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
    status: "Delivered" | "Shipped" | "Processing";
}

interface RitualProgress {
    id: string;
    name: string;
    totalDays: number;
    completedDays: boolean[];
    startDate: string;
    recommendation: string;
    feedback?: string;
}

interface Subscription {
    id: string;
    plan: string;
    product: string;
    nextDelivery: string;
    price: number;
    status: "Active" | "Paused";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    orders: Order[];
    rituals: RitualProgress[];
    subscriptions: Subscription[];
    markRitualDay: (ritualId: string, day: number) => void;
    submitRitualFeedback: (ritualId: string, feedback: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
    email: "bhakt@amala.in",
    name: "Satvik Sharma",
    rashi: "Mesha",
    phone: "9876543210",
};

const DEMO_PASSWORD = "Shanti123";

const DEMO_ORDERS: Order[] = [
    {
        id: "ORD-2026-001",
        date: "2026-02-15",
        items: [
            { name: "Ganesh Ji Brass Idol (8\")", quantity: 1, price: 3499 },
            { name: "Brass Pooja Lota", quantity: 1, price: 799 },
        ],
        total: 4298,
        status: "Delivered",
    },
    {
        id: "ORD-2026-002",
        date: "2026-02-28",
        items: [
            { name: "Copper Puja Thali Set", quantity: 1, price: 1299 },
            { name: "Sattva Premium Agarbatti (100 Sticks)", quantity: 1, price: 499 },
        ],
        total: 1798,
        status: "Delivered",
    },
    {
        id: "ORD-2026-003",
        date: "2026-03-05",
        items: [
            { name: "Prana-Pratishtha Kuber Yantra", quantity: 1, price: 2499 },
        ],
        total: 2499,
        status: "Shipped",
    },
];

const initialRitualDays = (): boolean[] => {
    const days = new Array(21).fill(false);
    for (let i = 0; i < 12; i++) days[i] = true;
    return days;
};

const DEMO_RITUALS: RitualProgress[] = [
    {
        id: "ritual-1",
        name: "Dhan Vriddhi — 21-Day Money Flow Ritual",
        totalDays: 21,
        completedDays: initialRitualDays(),
        startDate: "2026-02-24",
        recommendation: "Prana-Pratishtha Kuber Yantra + Surya Arghya with Pure Brass Lota",
    },
];

const DEMO_SUBSCRIPTIONS: Subscription[] = [
    {
        id: "sub-001",
        plan: "Eternal Fragrance Circle",
        product: "Sattva Premium Agarbatti — Sandalwood (100 Sticks)",
        nextDelivery: "2026-03-24",
        price: 424,
        status: "Active",
    },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [orders] = useState<Order[]>(DEMO_ORDERS);
    const [rituals, setRituals] = useState<RitualProgress[]>(DEMO_RITUALS);
    const [subscriptions] = useState<Subscription[]>(DEMO_SUBSCRIPTIONS);

    const login = useCallback((email: string, password: string): boolean => {
        if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
            setUser(DEMO_USER);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const markRitualDay = useCallback((ritualId: string, day: number) => {
        setRituals((prev) =>
            prev.map((r) => {
                if (r.id === ritualId) {
                    const updated = [...r.completedDays];
                    updated[day] = true;
                    return { ...r, completedDays: updated };
                }
                return r;
            })
        );
    }, []);

    const submitRitualFeedback = useCallback(
        (ritualId: string, feedback: string) => {
            setRituals((prev) =>
                prev.map((r) => (r.id === ritualId ? { ...r, feedback } : r))
            );
        },
        []
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                orders,
                rituals,
                subscriptions,
                markRitualDay,
                submitRitualFeedback,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
