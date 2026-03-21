"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Star, 
  Clock, 
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { motion } from "framer-motion";

const customers = [
    { id: "C-1042", name: "Rajesh S.", email: "rajesh@example.com", phone: "+91 98765 43210", ltv: "₹42,500", segment: "Ritual Day 14", status: "Active", risk: "Low" },
    { id: "C-1039", name: "Priya V.", email: "priya.v@example.com", phone: "+91 91234 56789", ltv: "₹12,200", segment: "Home Altar Enthusiast", status: "Active", risk: "Low" },
    { id: "C-1035", name: "Vikram K.", email: "vik.k@example.com", phone: "+91 99887 76655", ltv: "₹8,500", segment: "New Opt-in", status: "Idle", risk: "Medium" },
    { id: "C-1032", name: "Anjali M.", email: "anjali@example.com", phone: "+91 91122 33445", ltv: "₹2,10,000", segment: "VVIP Collector", status: "Active", risk: "None" },
];

export default function AdminCustomersPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer CRM Console</h1>
                    <p className="text-slate-500 text-sm mt-1">360° profiles, segmentation, and relationship lifecycle tracking.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <Mail size={18} /> Bulk Campaign
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <UserPlus size={18} /> Add New Profile
                    </button>
                </div>
            </div>

            {/* Segment Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center font-bold">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">42</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">VVIP Collectors</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#FF9933]/10 text-[#FF9933] rounded-2xl flex items-center justify-center font-bold">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">128</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Ritualists</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center font-bold">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">845</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Profiles</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-bold">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">3d</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Avg Login Gap</p>
                    </div>
                </div>
            </div>

            {/* List Console */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by Name, Email, or Segment..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 font-medium transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm border-slate-200">
                            <Filter size={18} /> Active Segments
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Profile Info</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Segment</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">LTV</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Chrun Risk</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Action Logs</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold group-hover:bg-white group-hover:scale-110 transition-all group-hover:shadow-lg group-hover:shadow-slate-200/50">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{customer.name}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            customer.segment.includes('VVIP') ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 
                                            customer.segment.includes('Ritual') ? 'bg-orange-50 text-orange-600 border border-orange-100' : ''
                                        }`}>
                                            {customer.segment}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{customer.ltv}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            customer.risk === 'Low' || customer.risk === 'None' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {customer.risk}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                                Last Activity: 2h ago
                                            </div>
                                            <div className="text-xs text-slate-400">Changed ritual preference</div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="flex items-center gap-2 ml-auto p-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-all shadow-xl shadow-slate-900/10">
                                            Profile 360° <ChevronRight size={14} strokeWidth={3} />
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
