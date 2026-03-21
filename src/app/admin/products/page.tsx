"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, Package, AlertCircle, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"list" | "grid">("list");

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Product Inventory</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your catalog, stock levels, and media assets.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                        <Plus size={18} /> Add New Product
                    </button>
                </div>
            </div>

            {/* Inventory Alerts (Thresholds) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#FEF2F2] border border-red-100 p-6 rounded-3xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-50 pr-0.5">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-red-900">Inventory Alert: Low Stock Threshold reached</h3>
                        <p className="text-sm text-red-700 mt-1">3 items are currently below the safety margin (10 units). This may affect the upcoming 21-day ritual kit dispatch cycles.</p>
                        <button className="text-xs font-bold text-red-600 uppercase tracking-widest mt-4 hover:underline transition-all">Review Low Stock Items</button>
                    </div>
                </div>
                
                <div className="bg-[#F0F9FF] border border-blue-100 p-6 rounded-3xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-blue-50">
                        <ShoppingBag size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900">Active Subscriptions</h3>
                        <p className="text-3xl font-bold text-blue-900 mt-1">124</p>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Ongoing Cycles</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, category, or SKU..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Product Info</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock Level</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product) => {
                                const stock = Math.floor(Math.random() * 50); // Mock stock data
                                const isLow = stock < 10;
                                return (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0">
                                                    <img src={product.mainImage} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{product.name}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">ID: {product.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-slate-900">₹{product.price.toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-[#FF9933]'}`} style={{ width: `${(stock/50)*100}%` }}></div>
                                                </div>
                                                <span className={`text-xs font-bold ${isLow ? 'text-red-500' : 'text-slate-600'}`}>
                                                    {stock} units
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
