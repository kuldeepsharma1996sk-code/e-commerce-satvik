"use client";

import AdminShell from "@/components/admin/AdminShell";
import { Search, AlertTriangle, CheckCircle2, MessageSquare, Filter } from "lucide-react";
import { useState } from "react";

const CUSTOMERS = [
    { id: "USR-001", name: "Satvik Sharma", email: "satvik@example.com", ritual: "Dhan Vriddhi", day: 18, total: 21, missed: false, lastActive: "Today", orders: 3, ltv: "₹8,795" },
    { id: "USR-002", name: "Kavita Rai", email: "kavita@example.com", ritual: "Dhan Vriddhi", day: 9, total: 21, missed: true, lastActive: "3 days ago", orders: 1, ltv: "₹2,499" },
    { id: "USR-003", name: "Amit Patel", email: "amit@example.com", ritual: "Dhan Vriddhi", day: 21, total: 21, missed: false, lastActive: "Today", orders: 5, ltv: "₹14,200" },
    { id: "USR-004", name: "Deepa Menon", email: "deepa@example.com", ritual: "Dhan Vriddhi", day: 5, total: 21, missed: true, lastActive: "2 days ago", orders: 2, ltv: "₹4,298" },
    { id: "USR-005", name: "Rajesh Kumar", email: "rajesh@example.com", ritual: "Dhan Vriddhi", day: 14, total: 21, missed: false, lastActive: "Yesterday", orders: 4, ltv: "₹11,000" },
    { id: "USR-006", name: "Sunita Devi", email: "sunita@example.com", ritual: null, day: 0, total: 0, missed: false, lastActive: "1 week ago", orders: 1, ltv: "₹799" },
];

export default function CustomersAdmin() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "missed" | "completed">("all");

    const filtered = CUSTOMERS.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase());

        if (filter === "active") return matchSearch && c.ritual && c.day < c.total && !c.missed;
        if (filter === "missed") return matchSearch && c.missed;
        if (filter === "completed") return matchSearch && c.day === c.total && c.total > 0;
        return matchSearch;
    });

    return (
        <AdminShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif text-[#5D4037]">
                            Seva — Customer CRM
                        </h1>
                        <p className="text-xs text-[#B5A642]">
                            Track ritual progress, attendance, and customer lifetime value
                        </p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-2xl font-bold text-[#FF9933]">{CUSTOMERS.length}</p>
                        <p className="text-[10px] text-[#B5A642] uppercase">Total Users</p>
                    </div>
                </div>

                {/* Attendance Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: "Active Rituals", count: CUSTOMERS.filter((c) => c.ritual && c.day < c.total).length, color: "text-[#FF9933]", bg: "bg-[#FF9933]/10" },
                        { label: "Missed (48h)", count: CUSTOMERS.filter((c) => c.missed).length, color: "text-red-500", bg: "bg-red-50" },
                        { label: "Completed", count: CUSTOMERS.filter((c) => c.day === c.total && c.total > 0).length, color: "text-green-600", bg: "bg-green-50" },
                        { label: "No Ritual", count: CUSTOMERS.filter((c) => !c.ritual).length, color: "text-[#B5A642]", bg: "bg-[#B5A642]/10" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-xl border border-[#B5A642]/10 p-4 text-center"
                        >
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                            <p className="text-[10px] text-[#B5A642] uppercase tracking-wider mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Search + Filter */}
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A642]"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search customers..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as typeof filter)}
                        className="px-4 py-3 bg-white border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active Rituals</option>
                        <option value="missed">Missed (48h+)</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Customer Table */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-[10px] text-[#B5A642] uppercase tracking-wider border-b border-[#B5A642]/10 bg-[#F9F6F0]">
                                    <th className="text-left p-4 font-semibold">Customer</th>
                                    <th className="text-left p-4 font-semibold hidden md:table-cell">Ritual</th>
                                    <th className="text-center p-4 font-semibold">Progress</th>
                                    <th className="text-center p-4 font-semibold hidden sm:table-cell">Status</th>
                                    <th className="text-right p-4 font-semibold hidden lg:table-cell">LTV</th>
                                    <th className="text-right p-4 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((c) => (
                                    <tr
                                        key={c.id}
                                        className={`border-b border-[#B5A642]/5 last:border-0 ${c.missed ? "bg-red-50/30" : ""
                                            }`}
                                    >
                                        <td className="p-4">
                                            <p className="font-medium text-[#5D4037]">{c.name}</p>
                                            <p className="text-[10px] text-[#B5A642]">{c.email}</p>
                                        </td>
                                        <td className="p-4 text-[#5D4037]/60 hidden md:table-cell">
                                            {c.ritual || "—"}
                                        </td>
                                        <td className="p-4">
                                            {c.total > 0 ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-20 h-1.5 bg-[#B5A642]/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#FF9933] rounded-full"
                                                            style={{ width: `${(c.day / c.total) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-[#5D4037] font-medium">
                                                        {c.day}/{c.total}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-[#B5A642]/40">N/A</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center hidden sm:table-cell">
                                            {c.missed ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                                    <AlertTriangle size={10} /> Missed
                                                </span>
                                            ) : c.day === c.total && c.total > 0 ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                    <CheckCircle2 size={10} /> Complete
                                                </span>
                                            ) : c.ritual ? (
                                                <span className="text-[10px] text-[#B5A642]">
                                                    Active • {c.lastActive}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-[#B5A642]/40">—</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right font-semibold text-[#FF9933] hidden lg:table-cell">
                                            {c.ltv}
                                        </td>
                                        <td className="p-4 text-right">
                                            {c.missed ? (
                                                <button className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors ml-auto">
                                                    <MessageSquare size={12} /> WhatsApp
                                                </button>
                                            ) : (
                                                <button className="text-[#B5A642] hover:text-[#FF9933] p-1.5 ml-auto block">
                                                    <Filter size={14} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
