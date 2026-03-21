"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  MoreVertical,
  Printer,
  Package,
  ArrowRight,
  ShieldCheck,
  FileText,
  ScanLine,
  ChevronRight,
  AlertCircle
} from "lucide-react";

const orders = [
    { 
        id: "#ORD-9842", 
        customer: "Ananya Sharma", 
        items: "Ganesha Idol (Brass), Dhoop Kit", 
        total: "₹2,499", 
        status: "Paid", 
        date: "2 mins ago",
        lifecycle: "Processing",
        awb: "AWB-7741-9821",
        priority: "High"
    },
    { 
        id: "#ORD-9841", 
        customer: "Vikram Malhotra", 
        items: "21-Day Ritual Kit", 
        total: "₹5,200", 
        status: "Packed", 
        date: "15 mins ago",
        lifecycle: "Ready to Dispatch",
        awb: "AWB-7741-9820",
        priority: "Standard"
    },
    { 
        id: "#ORD-9840", 
        customer: "Priya Varma", 
        items: "Copper Thali Set", 
        total: "₹1,850", 
        status: "Pending", 
        date: "1 hour ago",
        lifecycle: "Payment Verification",
        awb: "Pending Generation",
        priority: "Standard"
    },
];

const lifecycleGates = [
    { name: "Pending", count: 12, color: "bg-amber-100 text-amber-600" },
    { name: "Paid", count: 4, color: "bg-blue-100 text-blue-600" },
    { name: "Processing", count: 8, color: "bg-purple-100 text-purple-600" },
    { name: "Packed", count: 2, color: "bg-emerald-100 text-emerald-600" },
];

export default function AdminOrdersPage() {
    const [selectedGate, setSelectedGate] = useState<string | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Order Lifecycle & Dispatch</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage processing gates, generate AWBs, and monitor dispatch velocity.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 text-xs uppercase">
                        <Printer size={16} /> Batch Label Print
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 text-xs uppercase">
                        <ScanLine size={16} /> Bulk Dispatch
                    </button>
                </div>
            </div>

            {/* Lifecycle Gates (Visualization) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {lifecycleGates.map((gate) => (
                    <button
                        key={gate.name}
                        onClick={() => setSelectedGate(selectedGate === gate.name ? null : gate.name)}
                        className={`p-6 bg-white rounded-3xl border-2 transition-all text-left shadow-sm hover:shadow-lg ${
                            selectedGate === gate.name ? 'border-[#FF9933] ring-4 ring-[#FF9933]/10' : 'border-transparent hover:border-slate-200'
                        }`}
                    >
                        <div className={`w-10 h-10 ${gate.color} rounded-xl flex items-center justify-center mb-4`}>
                             <Clock size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg leading-none">{gate.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{gate.count} Active Orders</p>
                    </button>
                ))}
            </div>

            {/* Quick Actions Console */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                    <Package size={160} strokeWidth={1} />
                </div>
                <div className="relative">
                    <div className="flex items-center gap-3 text-emerald-400 mb-4">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Courier API: Connected (Shiprocket)</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">Dispatch Console</h3>
                    <p className="text-white/50 text-xs mt-1 uppercase tracking-widest font-bold">14 Orders ready for manifest generation</p>
                    <div className="flex flex-wrap gap-4 mt-8 italic">
                        <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase shadow-xl hover:bg-slate-100 cursor-pointer transition-all">Generate 14 AWBs</div>
                        <div className="px-6 py-3 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase backdrop-blur-sm border border-white/10 hover:bg-white/20 cursor-pointer transition-all">Download Manifest v2</div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by ID, AWB, or Phone..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm"><Filter size={18} /></button>
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                             Full Export <FileText size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order & Gate</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Focus</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">AWB Tracking</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900">{order.id}</span>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                    order.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                    {order.priority}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{order.lifecycle}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900">{order.customer}</span>
                                            <span className="text-xs text-slate-400 mt-1 truncate max-w-[200px]">{order.items}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${order.awb.startsWith('AWB') ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300'}`}>
                                                <ScanLine size={16} />
                                            </div>
                                            <span className="text-[11px] font-mono font-bold text-slate-600">{order.awb}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                                                <Printer size={16} />
                                            </button>
                                            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 flex items-center gap-2">
                                                Dispatch <ChevronRight size={14} />
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
