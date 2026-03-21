"use client";

import { 
  Settings, 
  Shield, 
  Key, 
  Bell, 
  Database, 
  Globe, 
  Smartphone, 
  Users,
  ChevronRight,
  Plus,
  Save,
  Trash2,
  MoreVertical,
  Activity,
  Server
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const adminRoles = [
    { name: "Super Admin", count: 2, status: "All Permissions" },
    { name: "Inventory Manager", count: 4, status: "Catalog & Stock" },
    { name: "Dispatch Staff", count: 12, status: "Orders & Shipping" },
    { name: "Customer Support", count: 8, status: "CRM & Logs" },
];

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">Command Center Settings</h1>
                    <p className="text-slate-500 text-sm mt-3">Configure global system variables, security protocols, and administrative role access.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <Save size={18} /> Save All Changes
                    </button>
                </div>
            </div>

            {/* Platform Status */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden group border border-slate-800 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <Server size={320} />
                </div>
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/5 shadow-inner">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">System Health: Operational</h3>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Sattvik Home Cloud Services</p>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                    API: 24ms
                                </div>
                                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-4 border-l border-white/10 uppercase">v2.0.4 - Production</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold">
                            <div className="flex items-center gap-4">
                                <Key size={20} className="text-[#FF9933]" />
                                <h3 className="text-slate-900">API & Integration Keys</h3>
                            </div>
                            <button className="text-xs font-bold text-[#FF9933] uppercase tracking-widest hover:underline">Revoke All</button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-slate-100 rounded-2xl bg-slate-50/30">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Shiprocket Production Token</p>
                                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Courier Integration - Full Access</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 font-mono text-xs select-none shadow-sm">
                                        sk_live_••••••••••••••••••••3421
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-slate-900"><Plus size={18} /></button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-slate-100 rounded-2xl bg-slate-50/30 font-bold">
                                <div>
                                    <p className="text-sm text-slate-900 leading-none">Razorpay Webhook Secret</p>
                                    <p className="text-xs text-slate-400 mt-1 tracking-widest uppercase">Payment Processor - Transactions Only</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 font-mono text-xs select-none shadow-sm">
                                        wh_live_••••••••••••••••••••9942
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-slate-900"><Plus size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold">
                            <div className="flex items-center gap-4">
                                <Database size={20} className="text-blue-500" />
                                <h3 className="text-slate-900">System Variables</h3>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-black">Free Shipping Threshold</label>
                                    <input type="text" defaultValue="₹1,499" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-black">GST Tax Percentage</label>
                                    <input type="text" defaultValue="12%" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Role Management */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between font-bold">
                            <div className="flex items-center gap-4">
                                <Users size={20} className="text-purple-500" />
                                <h3 className="text-slate-900">Admin Role Access</h3>
                            </div>
                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 shadow-sm"><Plus size={16} /></button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {adminRoles.map((role) => (
                                <div key={role.name} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-900">{role.name}</p>
                                        <div className="flex items-center gap-4 mt-1.5 leading-none">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{role.count} Users</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4 border-l">Limited</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" size={20} />
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-slate-100">
                             <button className="w-full py-4 text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl hover:border-slate-300 transition-all font-black">Invite New Administrator</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl border border-red-100">
                                <Shield size={22} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-none">Maintenance Mode</h3>
                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black font-bold">Turn off public storefront</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                             <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-600">Current Status</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest uppercase">Live - Public</span>
                             </div>
                             <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer group flex items-center justify-start px-1 shadow-inner ring-1 ring-slate-300">
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm shadow-slate-400"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
