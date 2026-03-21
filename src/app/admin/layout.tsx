"use client";

import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  Calendar,
  Map,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    { name: "Overview", href: "/admin", icon: TrendingUp },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: Calendar },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Journeys", href: "/admin/journeys", icon: Map },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isAdminLogin = pathname.startsWith("/admin/login");

    useEffect(() => {
        if (!user?.isAdmin && !isAdminLogin) {
            router.push("/admin/login");
        }
    }, [user, router, pathname, isAdminLogin]);

    if (isAdminLogin) return <>{children}</>;
    if (!user?.isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className={`bg-slate-900 text-white flex flex-col transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF9933] rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm">S</div>
                    {isSidebarOpen && <span className="font-bold text-lg tracking-tight">Satvik Admin</span>}
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                                    isActive 
                                    ? 'bg-[#FF9933] text-white shadow-lg shadow-[#FF9933]/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                                {isSidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <button 
                        onClick={() => { logout(); router.push("/admin/login"); }}
                        className="w-full flex items-center gap-4 px-4 py-3.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-semibold">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-lg lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                            <span>Admin</span>
                            <ChevronRight size={14} />
                            <span className="font-semibold text-slate-900 capitalize">
                                {pathname.split('/').pop() || 'Overview'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search Command Center..." 
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-300 w-64"
                            />
                        </div>
                        <button className="relative p-2 text-slate-400 hover:text-slate-900">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
