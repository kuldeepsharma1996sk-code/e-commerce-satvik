"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useState } from "react";
import { Moon, Sun, Clock, Bell, Edit, Save } from "lucide-react";

const RASHI_DATA = [
    { name: "Mesha", icon: "♈", prediction: "Financial gains through unexpected channels. Avoid lending money today.", lucky: { number: 9, color: "Red" } },
    { name: "Vrishabha", icon: "♉", prediction: "Stability in career matters. Good time for investments.", lucky: { number: 6, color: "Green" } },
    { name: "Mithuna", icon: "♊", prediction: "Communication brings opportunity. Network actively.", lucky: { number: 5, color: "Yellow" } },
    { name: "Karka", icon: "♋", prediction: "Family harmony improves. Focus on home-based rituals.", lucky: { number: 2, color: "White" } },
    { name: "Simha", icon: "♌", prediction: "Leadership energy is strong. Take initiative at work.", lucky: { number: 1, color: "Gold" } },
    { name: "Kanya", icon: "♍", prediction: "Health awareness day. Start a new wellness routine.", lucky: { number: 5, color: "Green" } },
];

const PANCHANG_TODAY = {
    tithi: "Shukla Dashami",
    nakshatra: "Pushya",
    muhurat: { start: "06:15 AM", end: "07:45 AM" },
    remedyOfDay: "Surya Arghya with Copper Lota at sunrise",
};

export default function AstrologyAdmin() {
    const [editingRashi, setEditingRashi] = useState<string | null>(null);
    const [overrideMuhurat, setOverrideMuhurat] = useState(false);

    return (
        <AdminShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-serif text-[#5D4037]">Astrology Hub</h1>
                    <p className="text-xs text-[#B5A642]">Panchang overrides, daily predictions, and Muhurat alerts</p>
                </div>

                {/* Today's Panchang */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#FF9933]/10 rounded-xl"><Sun size={18} className="text-[#FF9933]" /></div>
                            <h3 className="font-serif text-lg text-[#5D4037]">Today&apos;s Panchang</h3>
                        </div>
                        <button onClick={() => setOverrideMuhurat(!overrideMuhurat)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${overrideMuhurat ? "bg-[#FF9933] text-white" : "bg-[#B5A642]/10 text-[#B5A642] hover:bg-[#FF9933]/10 hover:text-[#FF9933]"}`}>
                            {overrideMuhurat ? "Override Active" : "Override Muhurat"}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-[#F9F6F0] rounded-xl text-center">
                            <p className="text-[9px] text-[#B5A642] uppercase mb-1">Tithi</p>
                            <p className="text-sm font-semibold text-[#5D4037]">{PANCHANG_TODAY.tithi}</p>
                        </div>
                        <div className="p-3 bg-[#F9F6F0] rounded-xl text-center">
                            <p className="text-[9px] text-[#B5A642] uppercase mb-1">Nakshatra</p>
                            <p className="text-sm font-semibold text-[#5D4037]">{PANCHANG_TODAY.nakshatra}</p>
                        </div>
                        <div className="p-3 bg-[#F9F6F0] rounded-xl text-center">
                            <p className="text-[9px] text-[#B5A642] uppercase mb-1">Shubh Muhurat</p>
                            {overrideMuhurat ? (
                                <div className="flex gap-1">
                                    <input type="time" defaultValue="06:15" className="w-full px-1 py-0.5 bg-white border border-[#FF9933] rounded text-xs text-center" />
                                </div>
                            ) : (
                                <p className="text-sm font-semibold text-[#FF9933]">{PANCHANG_TODAY.muhurat.start} – {PANCHANG_TODAY.muhurat.end}</p>
                            )}
                        </div>
                        <div className="p-3 bg-[#F9F6F0] rounded-xl text-center">
                            <p className="text-[9px] text-[#B5A642] uppercase mb-1">Remedy</p>
                            <p className="text-xs text-[#5D4037]">{PANCHANG_TODAY.remedyOfDay}</p>
                        </div>
                    </div>

                    {/* Push Notification */}
                    <button className="w-full mt-4 py-3 bg-[#5D4037] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#FF9933] transition-colors">
                        <Bell size={16} /> Send Shubh Muhurat Alert to All PWA Users
                    </button>
                </div>

                {/* Rashi Predictions Editor */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-xl"><Moon size={18} className="text-purple-500" /></div>
                            <h3 className="font-serif text-lg text-[#5D4037]">Daily Rashi Predictions</h3>
                        </div>
                        <span className="text-[10px] text-[#B5A642] uppercase tracking-wider">Edit &amp; Publish</span>
                    </div>

                    <div className="space-y-2">
                        {RASHI_DATA.map((r) => (
                            <div key={r.name} className="flex items-center gap-4 p-4 bg-[#F9F6F0] rounded-xl">
                                <span className="text-2xl w-8 text-center">{r.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#5D4037]">{r.name}</p>
                                    {editingRashi === r.name ? (
                                        <textarea defaultValue={r.prediction} rows={2} className="w-full mt-1 px-3 py-2 bg-white border border-[#FF9933] rounded-lg text-xs text-[#5D4037] focus:outline-none" />
                                    ) : (
                                        <p className="text-xs text-[#5D4037]/60 truncate">{r.prediction}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="text-center hidden sm:block">
                                        <p className="text-xs font-bold text-[#FF9933]">{r.lucky.number}</p>
                                        <p className="text-[8px] text-[#B5A642]">{r.lucky.color}</p>
                                    </div>
                                    <button onClick={() => setEditingRashi(editingRashi === r.name ? null : r.name)} className={`p-1.5 rounded-lg transition-colors ${editingRashi === r.name ? "bg-green-50 text-green-600" : "bg-[#B5A642]/10 text-[#B5A642] hover:text-[#FF9933]"}`}>
                                        {editingRashi === r.name ? <Save size={14} /> : <Edit size={14} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 py-3 bg-[#FF9933] text-white rounded-xl text-sm font-bold hover:bg-[#e68a2e] transition-colors">
                        Publish All Predictions
                    </button>
                </div>

                {/* API Status */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 rounded-xl"><Clock size={18} className="text-green-600" /></div>
                        <h3 className="font-serif text-lg text-[#5D4037]">API &amp; Cache Status</h3>
                    </div>
                    <div className="space-y-2">
                        {[
                            { api: "Panchang API", lastSync: "04:00 AM today", status: "Synced" },
                            { api: "Rashi Predictions", lastSync: "Manual override", status: "Custom" },
                            { api: "Muhurat Calculator", lastSync: "04:00 AM today", status: "Synced" },
                        ].map((a) => (
                            <div key={a.api} className="flex items-center justify-between p-3 bg-[#F9F6F0] rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-[#5D4037]">{a.api}</p>
                                    <p className="text-[10px] text-[#B5A642]">Last: {a.lastSync}</p>
                                </div>
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${a.status === "Synced" ? "bg-green-50 text-green-600" : "bg-[#FF9933]/10 text-[#FF9933]"}`}>
                                    {a.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
