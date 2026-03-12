"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    ToggleLeft,
    ToggleRight,
    Upload,
    Box,
} from "lucide-react";
import { products } from "@/data/products";

export default function ProductsAdmin() {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif text-[#5D4037]">Temple Store</h1>
                        <p className="text-xs text-[#B5A642]">
                            Manage products, 3D assets, and spiritual attributes
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#FF9933] text-white rounded-xl text-sm font-semibold hover:bg-[#e68a2e] transition-colors">
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A642]"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                    />
                </div>

                {/* Product List */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-[10px] text-[#B5A642] uppercase tracking-wider border-b border-[#B5A642]/10 bg-[#F9F6F0]">
                                    <th className="text-left p-4 font-semibold">Product</th>
                                    <th className="text-left p-4 font-semibold hidden md:table-cell">Category</th>
                                    <th className="text-right p-4 font-semibold">Price</th>
                                    <th className="text-center p-4 font-semibold hidden sm:table-cell">3D/AR</th>
                                    <th className="text-center p-4 font-semibold hidden sm:table-cell">Subscribe</th>
                                    <th className="text-center p-4 font-semibold hidden lg:table-cell">Vastu</th>
                                    <th className="text-right p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="border-b border-[#B5A642]/5 last:border-0 hover:bg-[#F9F6F0]/50"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#F9F6F0] to-[#E8E2D6] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-serif text-[#C2B280]">
                                                        {p.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#5D4037]">{p.name}</p>
                                                    {p.badge && (
                                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#FF9933]/10 text-[#FF9933]">
                                                            {p.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[#5D4037]/60 hidden md:table-cell">
                                            {p.category}
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="font-bold text-[#FF9933]">
                                                ₹{p.price.toLocaleString("en-IN")}
                                            </span>
                                            {p.originalPrice && (
                                                <span className="text-[10px] text-[#B5A642] line-through ml-1">
                                                    ₹{p.originalPrice.toLocaleString("en-IN")}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center hidden sm:table-cell">
                                            {p.model3dUrl ? (
                                                <span className="text-green-500">
                                                    <Box size={16} className="mx-auto" />
                                                </span>
                                            ) : (
                                                <button className="text-[#B5A642]/30 hover:text-[#FF9933] transition-colors">
                                                    <Upload size={16} className="mx-auto" />
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-4 text-center hidden sm:table-cell">
                                            {p.isSubscribable ? (
                                                <ToggleRight
                                                    size={20}
                                                    className="text-green-500 mx-auto"
                                                />
                                            ) : (
                                                <ToggleLeft
                                                    size={20}
                                                    className="text-[#B5A642]/30 mx-auto"
                                                />
                                            )}
                                        </td>
                                        <td className="p-4 text-center text-xs text-[#5D4037]/50 hidden lg:table-cell">
                                            {p.vastuDirection || "—"}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-1.5 rounded-lg hover:bg-[#B5A642]/10 text-[#B5A642] transition-colors">
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(p.id)}
                                                    className="p-1.5 rounded-lg hover:bg-[#FF9933]/10 text-[#FF9933] transition-colors"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Editor Modal */}
                {editingId && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-serif text-[#5D4037]">Edit Product</h2>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="text-[#B5A642] hover:text-[#5D4037]"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-5">
                                {/* Media Gallery */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                                        Media Gallery
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="aspect-square bg-[#F9F6F0] rounded-xl border-2 border-dashed border-[#B5A642]/20 flex items-center justify-center cursor-pointer hover:border-[#FF9933]">
                                            <div className="text-center">
                                                <Upload size={20} className="text-[#B5A642] mx-auto mb-1" />
                                                <span className="text-[9px] text-[#B5A642]">
                                                    Add Image
                                                </span>
                                            </div>
                                        </div>
                                        <div className="aspect-square bg-[#F9F6F0] rounded-xl border-2 border-dashed border-[#B5A642]/20 flex items-center justify-center cursor-pointer hover:border-[#FF9933]">
                                            <div className="text-center">
                                                <Box size={20} className="text-[#B5A642] mx-auto mb-1" />
                                                <span className="text-[9px] text-[#B5A642]">
                                                    .GLB / .USDZ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Spiritual Attributes */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                                        Spiritual Attributes
                                    </label>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-[#5D4037]/60 mb-1 block">
                                                Vastu Direction
                                            </label>
                                            <select className="w-full px-3 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]">
                                                <option>North-East</option>
                                                <option>East</option>
                                                <option>North</option>
                                                <option>West</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#5D4037]/60 mb-1 block">
                                                Material Care Instructions
                                            </label>
                                            <textarea
                                                rows={2}
                                                placeholder="Clean gently with a soft cloth..."
                                                className="w-full px-3 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#5D4037]/60 mb-1.5 block">
                                                Ritual Suitability
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {["Money", "Peace", "Protection", "Health", "Love"].map(
                                                    (tag) => (
                                                        <label
                                                            key={tag}
                                                            className="flex items-center gap-1.5 text-xs text-[#5D4037]/70 bg-[#F9F6F0] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#FF9933]/10"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="w-3.5 h-3.5 rounded text-[#FF9933]"
                                                            />
                                                            {tag}
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                                        Pricing Engine
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs text-[#5D4037]/60 mb-1 block">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue={3499}
                                                className="w-full px-3 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[#5D4037]/60 mb-1 block">
                                                Sale Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                            />
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 mt-3 text-xs text-[#5D4037]/70 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded text-[#FF9933]" />
                                        Enable Subscription (15% Sattva Savings)
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-[#B5A642]/10">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="flex-1 py-3 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] hover:bg-[#F9F6F0]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="flex-1 py-3 bg-[#FF9933] text-white rounded-xl text-sm font-bold hover:bg-[#e68a2e]"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminShell>
    );
}
