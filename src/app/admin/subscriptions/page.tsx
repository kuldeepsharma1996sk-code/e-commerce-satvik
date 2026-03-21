"use client";

import { useState } from "react";
import { 
  Calendar, 
  RotateCw, 
  Pause, 
  Play, 
  FastForward, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const subscriptions = [
    { id: "SUB-881", customer: "Rajesh S.", plan: "Eternal Fragrance Circle", cycle: "21 Days", status: "Active", nextRenewal: "24 Mar, 2026", revenue: "₹424/mo" },
    { id: "SUB-879", customer: "Priya V.", plan: "Divine Abhishekam Kit", cycle: "Monthly", status: "Paused", nextRenewal: "Paused", revenue: "₹1,299/mo" },
    { id: "SUB-875", customer: "Vikram K.", plan: "Pooja Essentials", cycle: "Fortnightly", status: "Active", nextRenewal: "28 Mar, 2026", revenue: "₹799/mo" },
    { id: "SUB-872", customer: "Anjali M.", plan: "Premium Dhoop Pack", cycle: "21 Days", status: "Active", nextRenewal: "02 Apr, 2026", revenue: "₹349/mo" },
];

export default function AdminSubscriptionsPage() {
    const [selectedGate, setSelectedGate] = useState<string | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-slate-900">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Subscription Engine</h1>
                    <p className="text-slate-500 text-sm mt-1">Lifecycle control for recurring ritual and product cycles.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <TrendingUp size={18} strokeWidth={3} /> Cohort Analytics
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <PlusIcon size={18} /> New Campaign
                    </button>
                </div>
            </div>

            {/* Subscription Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center font-bold">
                            <RotateCw size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+4.2%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">₹1,84,320</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Recurring Revenue (MRR)</p>
                </div>
                
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#FF9933]/10 text-[#FF9933] rounded-2xl flex items-center justify-center font-bold">
                            <Calendar size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-400">Next 7 Days</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">42</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Upcoming Renewals</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group">
                    <div className="flex items-center justify-between mb-4 transition-transform group-hover:translate-x-1">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center font-bold">
                            <AlertCircle size={24} />
                        </div>
                        <button className="text-xs font-bold text-red-500 hover:underline transition-all">View Details</button>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">2.1%</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Subscription Churn Rate</p>
                </div>
            </div>

            {/* List Console */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Filter by Customer, Plan ID, or Phone..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 font-medium transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                            <Filter size={18} /> Plan Types
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Customer & Plan</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Frequency</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Maintenance Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Lifecycle Controls</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {subscriptions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{sub.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="text-sm font-bold text-slate-900">{sub.customer}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{sub.plan}</div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                                            <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full"></div>
                                            {sub.cycle}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                sub.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                            }`}>
                                                {sub.status}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest border-l pl-3">
                                                <div className="w-1.5 h-1.5 animate-pulse rounded-full bg-slate-300"></div>
                                                Next: {sub.nextRenewal}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                                            <button 
                                              title={sub.status === 'Active' ? 'Pause Subscription' : 'Resume Subscription'}
                                              className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all"
                                            >
                                                {sub.status === 'Active' ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                            </button>
                                            <button title="Skip Next Cycle" className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all">
                                                <FastForward size={14} fill="currentColor" />
                                            </button>
                                            <button title="Update Settings" className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 rounded-xl transition-all">
                                                <SettingsIcon size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
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

function PlusIcon({ size }: { size: number }) { return <RotateCw size={size} />; }
function SettingsIcon({ size }: { size: number }) { return <ShieldCheck size={size} />; }
