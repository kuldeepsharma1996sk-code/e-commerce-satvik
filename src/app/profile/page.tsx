"use client";

import { motion } from "framer-motion";
import {
    User,
    Bell,
    BellOff,
    Star,
    Package,
    ArrowRight,
    LogOut,
    Sparkles,
    Calendar,
    CheckCircle2,
    Leaf,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";



export default function ProfilePage() {
    const {
        user,
        isAuthenticated,
        logout,
        orders,
        rituals,
        subscriptions,
        markRitualDay,
        submitRitualFeedback,
    } = useAuth();
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [feedbackText, setFeedbackText] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "rituals">("overview");

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center pb-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-sm"
                >
                    <div className="w-20 h-20 bg-[#B5A642]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User size={36} className="text-[#B5A642]" />
                    </div>
                    <h1 className="text-3xl font-serif text-[#5D4037] mb-3">
                        Welcome, Devotee
                    </h1>
                    <p className="text-[#5D4037]/60 text-sm mb-8">
                        Log in to access your orders, active rituals, and personalized
                        spiritual guidance.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF9933] text-white rounded-2xl font-semibold hover:bg-[#e68a2e] transition-colors"
                    >
                        Enter Your Space <ArrowRight size={16} />
                    </Link>
                    <div className="mt-6">
                        <Link
                            href="/remedy-quiz"
                            className="text-sm text-[#B5A642] hover:text-[#FF9933] transition-colors"
                        >
                            Or take the free Money Flow Diagnostic →
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentRitual = rituals[0];
    const completedCount = currentRitual?.completedDays.filter(Boolean).length || 0;
    const nextUncompletedDay = currentRitual?.completedDays.findIndex((d) => !d) ?? -1;
    const isRitualComplete = completedCount >= currentRitual?.totalDays;

    return (
        <div className="min-h-screen bg-ivory pb-24">
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#FF9933] to-[#e68a2e] rounded-2xl flex items-center justify-center">
                            <User size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-serif text-[#5D4037]">
                                Namaste, {user?.name}
                            </h1>
                            <p className="text-xs text-[#5D4037]/50">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        className="p-2.5 rounded-xl bg-[#B5A642]/10 text-[#B5A642] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-colors"
                    >
                        <LogOut size={18} />
                    </button>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 bg-white/40 rounded-2xl p-1 border border-[#B5A642]/10">
                    {[
                        { id: "overview" as const, label: "Overview" },
                        { id: "orders" as const, label: "Orders" },
                        { id: "rituals" as const, label: "My Rituals" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-[#FF9933] text-white shadow-sm"
                                : "text-[#5D4037]/60 hover:text-[#5D4037]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* === OVERVIEW TAB === */}
                {activeTab === "overview" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Active Ritual Card */}
                        {currentRitual && (
                            <div className="bg-gradient-to-br from-white/80 to-[#FF9933]/5 rounded-3xl border border-[#FF9933]/20 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={16} className="text-[#FF9933]" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933]">
                                            Active Ritual
                                        </span>
                                    </div>
                                    <span className="text-xs text-[#5D4037]/50">
                                        Day {completedCount} of {currentRitual.totalDays}
                                    </span>
                                </div>
                                <h3 className="font-serif text-lg text-[#5D4037] mb-2">
                                    {currentRitual.name}
                                </h3>
                                {/* Progress Bar */}
                                <div className="h-2 bg-[#B5A642]/10 rounded-full overflow-hidden mb-3">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${(completedCount / currentRitual.totalDays) * 100}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-[#5D4037]/50 mb-4">
                                    {currentRitual.recommendation}
                                </p>
                                <button
                                    onClick={() => setActiveTab("rituals")}
                                    className="text-sm font-semibold text-[#FF9933] flex items-center gap-1 hover:underline"
                                >
                                    View Progress <ChevronRight size={14} />
                                </button>
                            </div>
                        )}

                        {/* Subscription Card */}
                        {subscriptions.map((sub) => (
                            <div
                                key={sub.id}
                                className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-6"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Leaf size={16} className="text-green-600" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">
                                        {sub.status} Subscription
                                    </span>
                                </div>
                                <h3 className="font-serif text-lg text-[#5D4037] mb-1">
                                    {sub.plan}
                                </h3>
                                <p className="text-xs text-[#5D4037]/50 mb-3">{sub.product}</p>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#B5A642]">
                                        Next delivery: <strong>{sub.nextDelivery}</strong>
                                    </span>
                                    <span className="font-bold text-[#FF9933]">
                                        ₹{sub.price}/mo
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Quick Links */}
                        <div className="bg-white/60 rounded-3xl border border-[#B5A642]/10 overflow-hidden">
                            {[
                                { icon: Package, label: "Order History", action: () => setActiveTab("orders") },
                                { icon: Calendar, label: "My Rituals", action: () => setActiveTab("rituals") },
                                { icon: Sparkles, label: "Money Flow Diagnostic", href: "/remedy-quiz" },
                                { icon: Star, label: "Daily Remedy", href: "/remedies" },
                            ].map(({ icon: Icon, label, action, href }, i) => {
                                const className = `flex items-center justify-between p-4 hover:bg-white/60 transition-colors w-full text-left ${i < 3 ? "border-b border-[#B5A642]/10" : ""
                                    }`;
                                const inner = (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#B5A642]/10 rounded-xl">
                                                <Icon size={16} className="text-[#B5A642]" />
                                            </div>
                                            <span className="text-sm font-medium text-[#5D4037]">
                                                {label}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-[#B5A642]" />
                                    </>
                                );

                                return href ? (
                                    <Link key={label} href={href} className={className}>
                                        {inner}
                                    </Link>
                                ) : (
                                    <button key={label} onClick={action} className={className}>
                                        {inner}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Notification Toggle */}
                        <div className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-[#5D4037]">
                                        Morning Alerts
                                    </p>
                                    <p className="text-[10px] text-[#5D4037]/50 mt-0.5">
                                        Daily remedy &amp; Shubh Muhurat notifications
                                    </p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`p-2.5 rounded-xl transition-all ${notifications
                                        ? "bg-[#FF9933] text-white"
                                        : "bg-[#B5A642]/10 text-[#B5A642]"
                                        }`}
                                >
                                    {notifications ? <Bell size={18} /> : <BellOff size={18} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* === ORDERS TAB === */}
                {activeTab === "orders" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-5"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-xs text-[#B5A642] font-semibold">{order.id}</p>
                                        <p className="text-[10px] text-[#5D4037]/40">{order.date}</p>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${order.status === "Delivered"
                                            ? "bg-green-50 text-green-600"
                                            : order.status === "Shipped"
                                                ? "bg-blue-50 text-blue-600"
                                                : "bg-[#FF9933]/10 text-[#FF9933]"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="space-y-2 mb-3">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-xs text-[#5D4037]/70">
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>₹{item.price.toLocaleString("en-IN")}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-[#B5A642]/10">
                                    <span className="text-xs text-[#5D4037]/50">Total</span>
                                    <span className="font-bold text-[#FF9933]">
                                        ₹{order.total.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* === RITUALS TAB (21-Day Attendance Tracker) === */}
                {activeTab === "rituals" && currentRitual && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-6">
                            <h2 className="font-serif text-xl text-[#5D4037] mb-1">
                                {currentRitual.name}
                            </h2>
                            <p className="text-xs text-[#5D4037]/50 mb-6">
                                Started: {currentRitual.startDate}
                            </p>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2 mb-6">
                                {currentRitual.completedDays.map((done, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            if (i === nextUncompletedDay) markRitualDay(currentRitual.id, i);
                                        }}
                                        disabled={done || i !== nextUncompletedDay}
                                        className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs transition-all ${done
                                            ? "bg-gradient-to-br from-[#FF9933] to-[#FFB366] text-white shadow-sm"
                                            : i === nextUncompletedDay
                                                ? "bg-[#FF9933]/10 border-2 border-[#FF9933] border-dashed text-[#FF9933] cursor-pointer animate-glow-pulse"
                                                : "bg-[#B5A642]/5 text-[#B5A642]/40"
                                            }`}
                                    >
                                        <span className="font-bold">{i + 1}</span>
                                        {done && <CheckCircle2 size={10} className="mt-0.5" />}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Progress Summary */}
                            <div className="flex items-center justify-between p-4 bg-[#F9F6F0] rounded-2xl">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#FF9933]">{completedCount}</p>
                                    <p className="text-[10px] text-[#B5A642] uppercase">Completed</p>
                                </div>
                                <div className="w-px h-10 bg-[#B5A642]/20" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#5D4037]">
                                        {currentRitual.totalDays - completedCount}
                                    </p>
                                    <p className="text-[10px] text-[#B5A642] uppercase">Remaining</p>
                                </div>
                                <div className="w-px h-10 bg-[#B5A642]/20" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#5D4037]">
                                        {Math.round((completedCount / currentRitual.totalDays) * 100)}%
                                    </p>
                                    <p className="text-[10px] text-[#B5A642] uppercase">Progress</p>
                                </div>
                            </div>

                            {/* Daily Check-in Button */}
                            {!isRitualComplete && nextUncompletedDay >= 0 && (
                                <button
                                    onClick={() => markRitualDay(currentRitual.id, nextUncompletedDay)}
                                    className="w-full mt-6 py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e68a2e] transition-all"
                                >
                                    <CheckCircle2 size={18} /> I have completed today&apos;s Vidhi
                                    (Day {nextUncompletedDay + 1})
                                </button>
                            )}

                            {/* Completion Feedback */}
                            {isRitualComplete && (
                                <div className="mt-6 p-5 bg-green-50 rounded-2xl border border-green-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                        <h3 className="font-serif text-lg text-green-700">
                                            Ritual Complete! 🎉
                                        </h3>
                                    </div>
                                    {!currentRitual.feedback ? (
                                        <>
                                            <p className="text-xs text-green-600/70 mb-3">
                                                How has your energy shifted regarding abundance?
                                            </p>
                                            <textarea
                                                value={feedbackText}
                                                onChange={(e) => setFeedbackText(e.target.value)}
                                                placeholder="Share your experience..."
                                                rows={3}
                                                className="w-full p-3 border border-green-200 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-green-400 bg-white/80 mb-3"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (feedbackText.trim())
                                                        submitRitualFeedback(currentRitual.id, feedbackText);
                                                }}
                                                className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
                                            >
                                                Submit Feedback
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-sm text-green-600/80 italic">
                                            &quot;{currentRitual.feedback}&quot;
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
