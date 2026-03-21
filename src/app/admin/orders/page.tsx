"use client";

import { useState } from "react";
import { 
  ClipboardCheck, 
  Truck, 
  Package, 
  CheckCircle2, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Download,
  FileText,
  Printer,
  Zap,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const orders = [
    { id: "ORD-5541", customer: "Rajesh Sharma", date: "22 Mar, 10:45 AM", amount: "₹4,298", items: 2, status: "Paid", method: "UPI", priority: "Rush" },
    { id: "ORD-5540", customer: "Pooja Varma", date: "22 Mar, 09:30 AM", amount: "₹1,499", items: 1, status: "Packed", method: "Cards", priority: "Standard" },
    { id: "ORD-5539", customer: "Vikram Sahay", date: "21 Mar, 06:12 PM", amount: "₹3,149", items: 3, status: "Pending", method: "Net Banking", priority: "Standard" },
    { id: "ORD-5538", customer: "Anjali Mehta", date: "21 Mar, 04:05 PM", amount: "₹849", items: 1, status: "Dispatched", method: "COD", priority: "Standard" },
    { id: "ORD-5537", customer: "Sanjay G.", date: "20 Mar, 11:20 AM", amount: "₹1,248", items: 1, status: "Delivered", method: "UPI", priority: "Standard" },
];

const lifecycleGates = [
    { name: "Pending", icon: Package, color: "bg-slate-100", textColor: "text-slate-500", count: 12 },
    { name: "Paid", icon: CheckCircle2, color: "bg-emerald-50", textColor: "text-emerald-500", count: 8 },
    { name: "Packed", icon: ClipboardCheck, color: "bg-orange-50", textColor: "text-orange-500", count: 4 },
    { name: "Dispatched", icon: Truck, color: "bg-blue-50", textColor: "text-blue-500", count: 24 },
];

export default function AdminOrdersPage() {
    const [selectedGate, setSelectedGate] = useState<string | null>(null);
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

    const toggleOrderSelection = (id: string) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(oid => oid !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Order & Dispatch Lifecycle</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage processing gates and courier dispatch fulfillment.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <Printer size={18} /> Print All Manifests
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Lifecycle Gates (Funnels) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {lifecycleGates.map((gate) => (
                    <button
                        key={gate.name}
                        onClick={() => setSelectedGate(selectedGate === gate.name ? null : gate.name)}
                        className={`p-6 rounded-3xl border transition-all text-left relative overflow-hidden group hover:shadow-lg ${
                            selectedGate === gate.name 
                            ? `border-${gate.textColor.split('-')[1]}-500 bg-white ring-4 ring-${gate.textColor.split('-')[1]}-500/10` 
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                    >
                        <div className={`w-12 h-12 ${gate.color} ${gate.textColor} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                            <gate.icon size={22} />
                        </div>
                        <h3 className="font-bold text-slate-900">{gate.name}</h3>
                        <p className="text-2xl font-black text-slate-900 mt-1">{gate.count}</p>
                        <div className="absolute top-0 right-0 p-4 pt-10">
                            <ChevronRight className="text-slate-200" size={32} />
                        </div>
                    </button>
                ))}
            </div>

            {/* Bulk Actions Console */}
            {selectedOrders.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-900 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-2xl"
                >
                    <div className="flex items-center gap-4 pl-4 border-l-4 border-[#FF9933]">
                        <p className="text-sm font-bold text-white uppercase tracking-widest leading-none">
                            <span className="text-[#FF9933] text-xl mr-2 font-black">{selectedOrders.length}</span> Orders Selected
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 bg-white/10 text-white/70 hover:text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2">
                            <Tag size={14} /> Batch Tag
                        </button>
                        <button className="px-5 py-2.5 bg-white/10 text-white/70 hover:text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2">
                            <Printer size={14} /> Print Labels
                        </button>
                        <button className="px-6 py-2.5 bg-[#FF9933] text-white rounded-2xl text-xs font-bold hover:bg-[#e68a2e] transition-all flex items-center gap-2 shadow-lg shadow-[#FF9933]/20">
                            <Zap size={14} strokeWidth={3} /> Bulk Dispatch All
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Filter by Order ID, Customer, or Phone..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 transition-all font-medium"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2 px-6 shadow-sm border-slate-200">
                        <Filter size={18} /> Filters
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedOrders(orders.map(o => o.id));
                                            else setSelectedOrders([]);
                                        }}
                                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" 
                                    />
                                </th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest font-black">Order ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Timeline</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Lifecycle Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedOrders.includes(order.id) ? 'bg-slate-50' : ''}`}>
                                    <td className="px-8 py-5">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleOrderSelection(order.id)}
                                            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 transition-all" 
                                        />
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{order.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="text-sm font-bold text-slate-900">{order.customer}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{order.method}</div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-slate-500">{order.date}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                                                order.status === 'Dispatched' ? 'bg-blue-50 text-blue-600' : 
                                                order.status === 'Packed' ? 'bg-orange-50 text-orange-600' : 
                                                order.status === 'Paid' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {order.status}
                                            </span>
                                            {order.priority === 'Rush' && <Zap size={14} className="text-[#FF9933] animate-pulse" fill="#FF9933" />}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{order.amount}</td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50">
                                                <FileText size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50">
                                                <Printer size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50">
                                                <MoreVertical size={16} />
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
