"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  Search,
  Plus,
  MoreVertical,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.isAdmin) {
            router.push("/admin/login");
        }
    }, [user, router]);

    if (!user?.isAdmin) return null;

    const stats = [
        { label: "Total Revenue", value: "₹4,12,000", change: "+12.5%", icon: TrendingUp, color: "text-emerald-500" },
        { label: "Total Orders", value: "1,248", change: "+8.2%", icon: ShoppingBag, color: "text-orange-500" },
        { label: "Active Users", value: "542", change: "+4.1%", icon: Users, color: "text-blue-500" },
        { label: "Stock Items", value: "84", change: "Low: 3", icon: Package, color: "text-purple-500" },
    ];

    const recentOrders = [
        { id: "#3041", customer: "Rajesh Kumar", date: "22 Mar, 2026", total: "₹2,499", status: "Processing" },
        { id: "#3040", customer: "Pooja V.", date: "21 Mar, 2026", total: "₹1,299", status: "Shipped" },
        { id: "#3039", customer: "Vikram S.", date: "21 Mar, 2026", total: "₹3,499", status: "Delivered" },
        { id: "#3038", customer: "Anjali M.", date: "20 Mar, 2026", total: "₹799", status: "Delivered" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
                <div className="p-8">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#FF9933] rounded-lg flex items-center justify-center text-xs">S</span>
                        Satvik Admin
                    </h2>
                </div>
                
                <nav className="flex-1 px-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-semibold">
                        <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white rounded-xl text-sm font-semibold transition-all">
                        <ShoppingBag size={18} /> Orders
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white rounded-xl text-sm font-semibold transition-all">
                        <Package size={18} /> Products
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white rounded-xl text-sm font-semibold transition-all">
                        <Users size={18} /> Customers
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={() => { logout(); router.push("/admin/login"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 rounded-xl text-sm font-semibold"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                        <p className="text-slate-500 text-sm mt-1">Welcome back, {user.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search everything..." 
                                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-400 w-64"
                            />
                        </div>
                        <button className="p-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Recent Orders</h3>
                        <button className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-slate-900">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function LayoutDashboard({ size }: { size: number }) {
  return <TrendingUp size={size} />;
}
