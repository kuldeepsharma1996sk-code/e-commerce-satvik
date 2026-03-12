"use client";

import { motion } from "framer-motion";
import { Home, ShoppingBag, Stars, User, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/collection", icon: ShoppingBag },
    { name: "Daily", href: "/remedies", icon: Stars },
    { name: "Search", href: "/collection?search=true", icon: Search },
    { name: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
    const pathname = usePathname();
    const { totalItems } = useCart();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F9F6F0]/90 backdrop-blur-md border-t border-[#B5A642]/20 pb-safe md:hidden">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href === "/collection" && pathname?.startsWith("/collection"));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-full h-full text-[#5D4037]"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute -top-1 w-8 h-1 bg-[#FF9933] rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <div className="relative">
                                <item.icon
                                    size={22}
                                    className={
                                        isActive ? "text-[#FF9933]" : "text-[#B5A642] opacity-70"
                                    }
                                />
                                {item.name === "Shop" && totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#FF9933] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span
                                className={`text-[10px] mt-1 font-medium ${isActive ? "text-[#5D4037]" : "text-[#B5A642]"
                                    }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
