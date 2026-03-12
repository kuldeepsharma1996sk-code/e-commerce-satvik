"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Sparkles,
    Moon,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: ShoppingBag, label: "Temple Store", href: "/admin/products" },
    { icon: Sparkles, label: "Ritual Lab", href: "/admin/rituals" },
    { icon: Moon, label: "Astrology Hub", href: "/admin/astrology" },
    { icon: Users, label: "Seva (Customers)", href: "/admin/customers" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F5F3EE] overflow-hidden">
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-[#2D2A26] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="p-5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#FF9933] rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div>
                                <h1 className="text-white font-serif text-lg leading-none">Amala</h1>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                                    Command Center
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden text-white/40"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive
                                        ? "bg-[#FF9933]/15 text-[#FF9933] font-semibold"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/10">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LogOut size={18} />
                        Back to Storefront
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-14 bg-white/60 backdrop-blur-sm border-b border-[#B5A642]/10 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden text-[#5D4037]"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-sm font-semibold text-[#5D4037]">
                            {NAV_ITEMS.find((n) => n.href === pathname)?.label || "Admin"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#B5A642] uppercase tracking-wider hidden sm:block">
                            {new Date().toLocaleDateString("en-IN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center text-white text-xs font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
