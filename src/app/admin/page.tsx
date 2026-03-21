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
  LogOut,
  Sparkles,
  Truck,
  ArrowUpRight,
  TrendingDown,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user?.isAdmin) return null;

    const stats = [
        { label: "Total Revenue", value: "₹4,12,020", change: "+12.5%", icon: DollarSign, color: "text-emerald-500", trend: "up" },
        { label: "Active Orders", value: "84", change: "-2.1%", icon: ShoppingBag, color: "text-orange-500", trend: "down" },
        { label: "Ritualists", value: "128", change: "+4.1%", icon: Sparkles, color: "text-blue-500", trend: "up" },
        { label: "Inventory HP", value: "94%", change: "Healthy", icon: Package, color: "text-purple-500", trend: "up" },
    ];

    const recentJourneys = [
        { id: "#J-DLV-8742", customer: "Rajesh S.", type: "Delivery", progress: 65, status: "In Transit" },
        { id: "#J-RIT-1029", customer: "Priya V.", type: "Ritual", progress: 48, status: "Active Cycle" },
        { id: "#J-RET-0951", customer: "Vikram K.", type: "Retail", progress: 90, status: "Audit" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">Command Center</h1>
                    <p className="text-slate-500 text-sm mt-3">Welcome back, Administrator {user.name.split(' ')[0]}. Here's your high-level KPI overview.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                         Download Monthly Report
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <Plus size={18} /> New Campaign
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                            }`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={10} strokeWidth={4} /> : <TrendingDown size={10} strokeWidth={4} />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Active Journeys (Multi-Layer View) */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-slate-900">Active High-Priority Journeys</h3>
                            <Link href="/admin/journeys" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 flex items-center gap-2">
                                View Monitor <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentJourneys.map((journey) => (
                                <div key={journey.id} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-lg transition-all group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xs ${
                                        journey.type === 'Delivery' ? 'bg-blue-100 text-blue-600' : 
                                        journey.type === 'Ritual' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
                                    }`}>
                                        {journey.type === 'Delivery' ? <Truck size={24} /> : 
                                         journey.type === 'Ritual' ? <Sparkles size={24} /> : <ArrowUpRight size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-bold text-slate-900">{journey.customer}</p>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{journey.id}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-900 rounded-full" style={{ width: `${journey.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{journey.type} — {journey.status}</p>
                                            <p className="text-[10px] font-bold text-slate-900">{journey.progress}%</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp size={200} strokeWidth={1} />
                    </div>
                    <div className="relative">
                        <h3 className="text-lg font-bold mb-1 leading-none uppercase tracking-widest text-[#FF9933] text-xs">Revenue Lifecycle</h3>
                        <p className="text-3xl font-black mt-2">₹1,84,320</p>
                        <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">Projected MRR this Month</p>
                        
                        <div className="mt-20 space-y-4">
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Growth Rate</p>
                                <p className="text-xl font-bold mt-1">+14.2%</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 uppercase font-bold text-[10px]">
                                <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-2xl text-center">New: 42</div>
                                <div className="p-4 bg-red-500/20 text-red-400 rounded-2xl text-center">Churn: 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
