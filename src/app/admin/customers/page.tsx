"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  TrendingUp, 
  Clock, 
  Mail, 
  Phone,
  LayoutDashboard,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Calendar,
  Layers,
  Activity,
  UserPlus
} from "lucide-react";

const customers = [
    { 
        id: "CUST-8842", 
        name: "Ananya Sharma", 
        email: "ananya@example.com", 
        ltv: "₹12,450", 
        orders: 8, 
        lastOrder: "2 days ago",
        segment: "VVIP Collector",
        ritualDay: 14,
        churnRisk: "Low",
        remedyScore: 94
    },
    { 
        id: "CUST-8841", 
        name: "Vikram Malhotra", 
        email: "vikram@example.com", 
        ltv: "₹4,200", 
        orders: 2, 
        lastOrder: "15 days ago",
        segment: "New Ritualist",
        ritualDay: 4,
        churnRisk: "Medium",
        remedyScore: 72
    },
    { 
        id: "CUST-8840", 
        name: "Priya Varma", 
        email: "priya@example.com", 
        ltv: "₹28,900", 
        orders: 14, 
        lastOrder: "Today",
        segment: "Spiritual Pro",
        ritualDay: 21,
        churnRisk: "Low",
        remedyScore: 98
    },
];

const segments = [
    { name: "Active Ritualists", count: 124, icon: Sparkles, color: "bg-amber-100 text-amber-600" },
    { name: "SLA Risks", count: 8, icon: AlertCircle, color: "bg-red-100 text-red-600" },
    { name: "VVIP Collectors", count: 42, icon: Star, iconColor: "text-purple-500", color: "bg-purple-100 text-purple-600" },
    { name: "Site Inactive", count: 56, icon: Clock, color: "bg-slate-100 text-slate-600" },
];

export default function AdminCustomersPage() {
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">CRM Console</h1>
                    <p className="text-slate-500 text-sm mt-3 tracking-tight">360° Customer profiles, Behavioral Segmentation, and Lifecycle Seva Management.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 text-xs uppercase">
                        <Users size={16} /> Batch Notify
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 text-xs uppercase">
                        <UserPlus size={16} /> Add Stakeholder
                    </button>
                </div>
            </div>

            {/* Segmentation Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {segments.map((seg) => (
                    <button
                        key={seg.name}
                        onClick={() => setSelectedSegment(selectedSegment === seg.name ? null : seg.name)}
                        className={`p-6 bg-white rounded-3xl border-2 transition-all text-left group shadow-sm hover:shadow-lg ${
                            selectedSegment === seg.name ? 'border-[#FF9933] ring-4 ring-[#FF9933]/10' : 'border-transparent hover:border-slate-200'
                        }`}
                    >
                        <div className={`w-12 h-12 ${seg.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-all group-hover:scale-110`}>
                             <seg.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg leading-none">{seg.name}</h3>
                        <div className="flex items-center justify-between mt-3 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                             <span>{seg.count} Users</span>
                             <span className="text-emerald-500">+12%</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Advanced CRM Viewport */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find Customer by Name, Ritual ID, or Email..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 shadow-sm transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3 italic">
                             {[...Array(4)].map((_, i) => (
                                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">U{i}</div>
                             ))}
                             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">+12</div>
                        </div>
                        <button className="px-5 py-3 border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all font-black">Export Seva Log</button>
                    </div>
                </div>

                <div className="overflow-x-auto overflow-visible">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Profile Reference</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none px-4">Ritual Lifecycle</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none px-4">Financials (LTV)</th>
                                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 px-8">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold border border-slate-200 shadow-sm">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-slate-900 leading-none">{customer.name}</p>
                                                <p className="text-xs text-slate-400 mt-2">{customer.email}</p>
                                                <div className="flex items-center gap-2 mt-2 leading-none">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">{customer.id}</span>
                                                    <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">{customer.segment}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center w-full max-w-[140px]">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Day {customer.ritualDay}/21</span>
                                                <span className="text-[10px] font-black text-[#FF9933]">{customer.remedyScore}% Score</span>
                                            </div>
                                            <div className="w-[140px] h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                                <div className="h-full bg-emerald-400" style={{ width: `${(customer.ritualDay/21)*100}%` }}></div>
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Quiz History: Active</p>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-base font-black text-slate-900 leading-none">{customer.ltv}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{customer.orders} Successful Orders</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm"><Mail size={16} /></button>
                                            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 flex items-center gap-2 hover:scale-105 transition-all">
                                                360° Profile <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
