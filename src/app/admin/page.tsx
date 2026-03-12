"use client";

import AdminShell from "@/components/admin/AdminShell";
import {
    TrendingUp,
    TrendingDown,
    Flame,
    Leaf,
    ShieldAlert,
    Package,
    Users,
    IndianRupee,
    ArrowUpRight,
} from "lucide-react";

const METRICS = [
    {
        label: "Daily Sales",
        value: "₹42,500",
        trend: "+12%",
        trendUp: true,
        icon: IndianRupee,
        color: "text-[#FF9933]",
        bg: "bg-[#FF9933]/10",
    },
    {
        label: "Active 21-Day Rituals",
        value: "1,240",
        trend: "High Engagement",
        trendUp: true,
        icon: Flame,
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        label: "New Subscriptions",
        value: "18 Today",
        trend: "Eternal Fragrance",
        trendUp: true,
        icon: Leaf,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        label: "Failed OTPs",
        value: "2",
        trend: "Low Friction",
        trendUp: false,
        icon: ShieldAlert,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
];

const RECENT_ORDERS = [
    { id: "ORD-4521", customer: "Priya M.", product: "Ganesh Ji Brass Idol (12\")", amount: "₹5,499", status: "Processing" },
    { id: "ORD-4520", customer: "Rahul K.", product: "Sattva Premium Agarbatti × 2", amount: "₹998", status: "Shipped" },
    { id: "ORD-4519", customer: "Anita S.", product: "Kuber Yantra + Brass Lota", amount: "₹3,298", status: "Delivered" },
    { id: "ORD-4518", customer: "Vikram J.", product: "Dhan Vriddhi Remedy Kit", amount: "₹4,999", status: "Processing" },
    { id: "ORD-4517", customer: "Meera D.", product: "Copper Puja Thali Set", amount: "₹1,299", status: "Delivered" },
];

const RITUAL_ALERTS = [
    { user: "Satvik S.", day: "Day 18/21", missed: false, lastActive: "Today" },
    { user: "Kavita R.", day: "Day 9/21", missed: true, lastActive: "3 days ago" },
    { user: "Amit P.", day: "Day 21/21", missed: false, lastActive: "Today" },
    { user: "Deepa M.", day: "Day 5/21", missed: true, lastActive: "2 days ago" },
];

const TOP_PRODUCTS = [
    { name: "Ganesh Ji Brass Idol", units: 42, revenue: "₹1,46,958" },
    { name: "Sattva Premium Agarbatti", units: 128, revenue: "₹63,872" },
    { name: "Dhan Vriddhi Remedy Kit", units: 31, revenue: "₹1,54,969" },
    { name: "Copper Puja Thali Set", units: 67, revenue: "₹87,033" },
];

export default function AdminDashboard() {
    return (
        <AdminShell>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-serif text-[#5D4037]">Live Pulse</h1>
                    <p className="text-xs text-[#B5A642]">
                        Real-time overview of your Sattvic commerce engine
                    </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {METRICS.map((m) => (
                        <div
                            key={m.label}
                            className="bg-white rounded-2xl border border-[#B5A642]/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl ${m.bg}`}>
                                    <m.icon size={18} className={m.color} />
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                    {m.trendUp ? (
                                        <TrendingUp size={12} className="text-green-500" />
                                    ) : (
                                        <TrendingDown size={12} className="text-blue-500" />
                                    )}
                                    <span className={m.trendUp ? "text-green-600" : "text-blue-600"}>
                                        {m.trend}
                                    </span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-[#5D4037]">{m.value}</p>
                            <p className="text-[10px] text-[#B5A642] uppercase tracking-wider mt-1">
                                {m.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-lg text-[#5D4037]">Recent Orders</h3>
                            <span className="text-[10px] text-[#B5A642] uppercase tracking-wider">
                                Last 24h
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-[10px] text-[#B5A642] uppercase tracking-wider border-b border-[#B5A642]/10">
                                        <th className="text-left pb-2 font-semibold">Order</th>
                                        <th className="text-left pb-2 font-semibold">Customer</th>
                                        <th className="text-left pb-2 font-semibold hidden sm:table-cell">
                                            Product
                                        </th>
                                        <th className="text-right pb-2 font-semibold">Amount</th>
                                        <th className="text-right pb-2 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RECENT_ORDERS.map((o) => (
                                        <tr
                                            key={o.id}
                                            className="border-b border-[#B5A642]/5 last:border-0"
                                        >
                                            <td className="py-3 text-[#5D4037] font-medium">{o.id}</td>
                                            <td className="py-3 text-[#5D4037]/70">{o.customer}</td>
                                            <td className="py-3 text-[#5D4037]/60 hidden sm:table-cell text-xs">
                                                {o.product}
                                            </td>
                                            <td className="py-3 text-right font-semibold text-[#FF9933]">
                                                {o.amount}
                                            </td>
                                            <td className="py-3 text-right">
                                                <span
                                                    className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${o.status === "Delivered"
                                                            ? "bg-green-50 text-green-600"
                                                            : o.status === "Shipped"
                                                                ? "bg-blue-50 text-blue-600"
                                                                : "bg-[#FF9933]/10 text-[#FF9933]"
                                                        }`}
                                                >
                                                    {o.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Ritual Alerts */}
                    <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-lg text-[#5D4037]">Ritual Alerts</h3>
                            <Flame size={16} className="text-[#FF9933]" />
                        </div>
                        <div className="space-y-3">
                            {RITUAL_ALERTS.map((r) => (
                                <div
                                    key={r.user}
                                    className={`flex items-center justify-between p-3 rounded-xl ${r.missed ? "bg-red-50 border border-red-100" : "bg-[#F9F6F0]"
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-medium text-[#5D4037]">{r.user}</p>
                                        <p className="text-[10px] text-[#B5A642]">{r.day}</p>
                                    </div>
                                    <div className="text-right">
                                        {r.missed ? (
                                            <button className="text-[10px] font-bold text-red-500 bg-red-100 px-2 py-1 rounded-lg hover:bg-red-200 transition-colors">
                                                Send Nudge
                                            </button>
                                        ) : r.day.includes("21/21") ? (
                                            <span className="text-[10px] font-bold text-green-600">
                                                ✅ Complete
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-[#B5A642]">
                                                {r.lastActive}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Products */}
                    <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <h3 className="font-serif text-lg text-[#5D4037] mb-4">
                            Top Products (This Week)
                        </h3>
                        <div className="space-y-3">
                            {TOP_PRODUCTS.map((p, i) => (
                                <div
                                    key={p.name}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[#F9F6F0]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-[#FF9933]/10 rounded-lg flex items-center justify-center text-xs font-bold text-[#FF9933]">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-[#5D4037]">{p.name}</p>
                                            <p className="text-[10px] text-[#B5A642]">
                                                {p.units} units sold
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-[#FF9933]">
                                        {p.revenue}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <h3 className="font-serif text-lg text-[#5D4037] mb-4">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Add Product", icon: Package, href: "/admin/products" },
                                { label: "Edit Remedy", icon: Flame, href: "/admin/rituals" },
                                { label: "View Customers", icon: Users, href: "/admin/customers" },
                                { label: "Generate Coupon", icon: IndianRupee, href: "/admin/settings" },
                            ].map(({ label, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-[#B5A642]/10 hover:border-[#FF9933]/30 hover:bg-[#FF9933]/5 transition-all"
                                >
                                    <Icon size={18} className="text-[#B5A642]" />
                                    <span className="text-sm text-[#5D4037] font-medium">
                                        {label}
                                    </span>
                                    <ArrowUpRight size={12} className="text-[#B5A642] ml-auto" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
