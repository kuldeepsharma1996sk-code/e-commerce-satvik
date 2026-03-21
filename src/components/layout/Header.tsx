"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Ritual Kits", href: "/collection?category=ritual-kits" },
    { name: "Daily Remedy", href: "/remedies" },
    { name: "About", href: "#" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const pathname = usePathname();

    const isInternal = pathname.startsWith("/admin");
    if (isInternal) return null;

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#F9F6F0]/80 backdrop-blur-lg border-b border-[#B5A642]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center">
                                <span className="text-white font-serif font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl md:text-2xl font-serif font-bold text-[#5D4037] tracking-tight">
                                Satvik Home
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-[#5D4037]/70 hover:text-[#FF9933] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                         {/* Right Icons */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#B5A642]/30 text-[#5D4037] rounded-xl font-medium text-xs hover:border-[#FF9933] hover:text-[#FF9933] transition-all"
                            >
                                Login
                            </Link>
                            <button className="hidden md:flex p-2 text-[#5D4037]/70 hover:text-[#FF9933] transition-colors">
                                <Search size={20} />
                            </button>
                            <Link
                                href="/cart"
                                className="relative p-2 text-[#5D4037]/70 hover:text-[#FF9933] transition-colors"
                            >
                                <ShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-0 -right-0 bg-[#FF9933] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                            <button
                                className="md:hidden p-2 text-[#5D4037]"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Slide Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-[#F9F6F0] pt-20"
                    >
                        <nav className="flex flex-col items-center gap-6 py-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-2xl font-serif text-[#5D4037] hover:text-[#FF9933] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
