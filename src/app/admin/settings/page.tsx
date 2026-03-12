"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useState } from "react";
import { CreditCard, Shield, Key, Globe, Zap, Copy, Check } from "lucide-react";

export default function SettingsAdmin() {
    const [copiedField, setCopiedField] = useState("");

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    return (
        <AdminShell>
            <div className="space-y-6 max-w-3xl">
                <div>
                    <h1 className="text-2xl font-serif text-[#5D4037]">Settings</h1>
                    <p className="text-xs text-[#B5A642]">Payment gateway, notifications, SEO, and theme</p>
                </div>

                {/* Razorpay */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-xl"><CreditCard size={18} className="text-blue-500" /></div>
                        <div>
                            <h3 className="font-serif text-lg text-[#5D4037]">Razorpay Gateway</h3>
                            <p className="text-[10px] text-[#B5A642]">Payment processing</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1 block">Key ID</label>
                            <div className="flex gap-2">
                                <input type="text" defaultValue="rzp_live_••••••••" className="flex-1 px-4 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm font-mono focus:outline-none focus:border-[#FF9933]" />
                                <button onClick={() => copyToClipboard("rzp_live_example", "key")} className="px-3 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-[#B5A642] hover:text-[#FF9933]">
                                    {copiedField === "key" ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1 block">Key Secret</label>
                            <input type="password" defaultValue="••••••••••••" className="w-full px-4 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm font-mono focus:outline-none focus:border-[#FF9933]" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1 block">Webhook URL</label>
                            <input type="text" defaultValue="https://amala.in/api/razorpay-webhook" readOnly className="w-full px-4 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm font-mono focus:outline-none" />
                        </div>
                    </div>
                </div>

                {/* OTP Dashboard */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 rounded-xl"><Shield size={18} className="text-green-600" /></div>
                        <h3 className="font-serif text-lg text-[#5D4037]">OTP Dashboard</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                            <p className="text-xl font-bold text-green-600">156</p>
                            <p className="text-[9px] text-[#B5A642] uppercase">Successful</p>
                        </div>
                        <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                            <p className="text-xl font-bold text-red-400">2</p>
                            <p className="text-[9px] text-[#B5A642] uppercase">Failed</p>
                        </div>
                        <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                            <p className="text-xl font-bold text-[#FF9933]">98.7%</p>
                            <p className="text-[9px] text-[#B5A642] uppercase">Success Rate</p>
                        </div>
                    </div>
                </div>

                {/* Coupon Engine */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#FF9933]/10 rounded-xl"><Key size={18} className="text-[#FF9933]" /></div>
                        <h3 className="font-serif text-lg text-[#5D4037]">Coupon Engine</h3>
                    </div>
                    <div className="space-y-2">
                        {[
                            { code: "FIRST10", discount: "10%", usage: "124/500", active: true },
                            { code: "SHIVA20", discount: "20%", usage: "67/200", active: true },
                            { code: "DIWALI50", discount: "50%", usage: "200/200", active: false },
                            { code: "SATTVA15", discount: "15%", usage: "89/300", active: true },
                        ].map((c) => (
                            <div key={c.code} className="flex items-center justify-between p-3 bg-[#F9F6F0] rounded-xl">
                                <div className="flex items-center gap-3">
                                    <code className="text-sm font-bold text-[#FF9933] bg-[#FF9933]/10 px-2 py-1 rounded-lg">{c.code}</code>
                                    <span className="text-sm text-[#5D4037]">{c.discount} off</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-[#B5A642]">{c.usage}</span>
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${c.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}>
                                        {c.active ? "Active" : "Expired"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-3 py-2.5 border border-dashed border-[#B5A642]/30 rounded-xl text-sm text-[#B5A642] hover:border-[#FF9933] hover:text-[#FF9933]">+ Generate New Coupon</button>
                </div>

                {/* SEO & Theme */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-50 rounded-xl"><Globe size={18} className="text-purple-500" /></div>
                        <h3 className="font-serif text-lg text-[#5D4037]">SEO &amp; Theme</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1 block">Announcement Bar</label>
                            <input type="text" defaultValue="🌟 Free shipping on orders above ₹2999 | Use code FIRST10" className="w-full px-4 py-2.5 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm focus:outline-none focus:border-[#FF9933]" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1 block">Primary Accent</label>
                            <div className="flex gap-3">
                                {[
                                    { name: "Saffron", color: "#FF9933" },
                                    { name: "Maroon", color: "#8B1A1A" },
                                    { name: "Gold", color: "#B8860B" },
                                    { name: "Green", color: "#2E7D32" },
                                ].map((t) => (
                                    <button key={t.name} className="flex items-center gap-2 px-3 py-2 bg-[#F9F6F0] rounded-xl border border-[#B5A642]/10 hover:border-[#FF9933]">
                                        <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: t.color }} />
                                        <span className="text-xs text-[#5D4037]">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Functions */}
                <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-50 rounded-xl"><Zap size={18} className="text-yellow-600" /></div>
                        <h3 className="font-serif text-lg text-[#5D4037]">Developer Functions</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { label: "Invalidate Cache", desc: "Clear edge cache", cls: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
                            { label: "Push Notification", desc: "Muhurat alert", cls: "bg-[#FF9933]/10 text-[#FF9933] hover:bg-[#FF9933]/20" },
                            { label: "Generate Coupon", desc: "21-day reward", cls: "bg-green-50 text-green-600 hover:bg-green-100" },
                        ].map((fn) => (
                            <button key={fn.label} className={`p-4 rounded-xl text-left transition-colors ${fn.cls}`}>
                                <p className="text-sm font-semibold">{fn.label}</p>
                                <p className="text-[10px] opacity-70 mt-0.5">{fn.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
