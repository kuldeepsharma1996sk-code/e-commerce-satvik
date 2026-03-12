"use client";

import AdminShell from "@/components/admin/AdminShell";
import { useState } from "react";
import { Play, Plus, Clock, Trash2, ArrowRight, Sparkles } from "lucide-react";

const QUIZ_RULES = [
    { condition: 'Answer "Hidden Expenses" + "Stagnant"', product: "Prana-Pratishtha Kuber Yantra", category: "expense" },
    { condition: 'Answer "Lack of Clarity" + "No Mandir"', product: "Ganesh Ji Brass Idol", category: "stagnation" },
    { condition: 'Answer "Low Space Energy" + "Never"', product: "Guggul Dhoop Cones + Copper Thali", category: "space" },
];

const MANTRA_TIMELINE = [
    { start: "00:00", end: "00:02", text: "Om" },
    { start: "00:02", end: "00:04", text: "Shreem" },
    { start: "00:04", end: "00:07", text: "Mahalakshmaye" },
    { start: "00:07", end: "00:09", text: "Namah" },
];

const REMEDIES_SCHEDULE = [
    { day: "Monday", planet: "Moon", remedy: "Surya Arghya with Copper Lota", active: true },
    { day: "Tuesday", planet: "Mars", remedy: "Hanuman Chalisa (7x)", active: true },
    { day: "Wednesday", planet: "Mercury", remedy: "Budha Beej Mantra (108x)", active: false },
    { day: "Thursday", planet: "Jupiter", remedy: "Guru Mantra with Yellow Thread", active: true },
    { day: "Friday", planet: "Venus", remedy: "Lakshmi Aarti with Ghee Diya", active: true },
    { day: "Saturday", planet: "Saturn", remedy: "Shani Mantra (108x) + Til Daan", active: true },
    { day: "Sunday", planet: "Sun", remedy: "Aditya Hridaya Stotra", active: true },
];

export default function RitualLabAdmin() {
    const [activeSection, setActiveSection] = useState<"remedies" | "mantra" | "logic">("remedies");

    return (
        <AdminShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-serif text-[#5D4037]">The Ritual Lab</h1>
                    <p className="text-xs text-[#B5A642]">
                        Manage remedies, mantra sync, and diagnostic quiz logic
                    </p>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-2 bg-white rounded-xl p-1 border border-[#B5A642]/10">
                    {[
                        { id: "remedies" as const, label: "Remedy Schedule" },
                        { id: "mantra" as const, label: "Mantra Sync" },
                        { id: "logic" as const, label: "Quiz Logic" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === tab.id
                                ? "bg-[#FF9933] text-white"
                                : "text-[#5D4037]/50 hover:text-[#5D4037]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Remedy Scheduler */}
                {activeSection === "remedies" && (
                    <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-lg text-[#5D4037]">
                                7-Day Planetary Rituals
                            </h3>
                            <button className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider hover:underline">
                                + Add Remedy
                            </button>
                        </div>
                        <div className="space-y-2">
                            {REMEDIES_SCHEDULE.map((r) => (
                                <div
                                    key={r.day}
                                    className={`flex items-center justify-between p-4 rounded-xl ${r.active ? "bg-[#F9F6F0]" : "bg-red-50/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 text-center">
                                            <p className="text-xs font-bold text-[#5D4037]">{r.day.slice(0, 3)}</p>
                                            <p className="text-[9px] text-[#B5A642]">{r.planet}</p>
                                        </div>
                                        <p className="text-sm text-[#5D4037]">{r.remedy}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${r.active
                                                ? "bg-green-50 text-green-600"
                                                : "bg-red-50 text-red-400"
                                                }`}
                                        >
                                            {r.active ? "Active" : "Draft"}
                                        </span>
                                        <button className="text-[#B5A642] hover:text-[#FF9933] p-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mantra Sync Tool */}
                {activeSection === "mantra" && (
                    <div className="space-y-4">
                        {/* Video Upload */}
                        <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                            <h3 className="font-serif text-lg text-[#5D4037] mb-4">
                                Jap Video Manager
                            </h3>
                            <div className="aspect-video bg-[#2D2A26] rounded-xl flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <Play size={40} className="text-white/20 mx-auto mb-2" />
                                    <p className="text-white/30 text-sm">
                                        Upload or paste HLS video URL
                                    </p>
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="https://stream.mux.com/example-video.m3u8"
                                className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#B5A642]/10 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                            />
                        </div>

                        {/* Subtitle Timeline */}
                        <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-serif text-lg text-[#5D4037]">
                                    Breathing Subtitles
                                </h3>
                                <button className="flex items-center gap-1.5 text-xs text-[#FF9933] font-semibold hover:underline">
                                    <Plus size={14} /> Add Cue
                                </button>
                            </div>
                            <div className="space-y-2">
                                {MANTRA_TIMELINE.map((cue, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 bg-[#F9F6F0] rounded-xl"
                                    >
                                        <Clock size={14} className="text-[#B5A642] flex-shrink-0" />
                                        <input
                                            type="text"
                                            defaultValue={cue.start}
                                            className="w-16 px-2 py-1.5 bg-white border border-[#B5A642]/10 rounded-lg text-xs text-center text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                        />
                                        <span className="text-[#B5A642]">→</span>
                                        <input
                                            type="text"
                                            defaultValue={cue.end}
                                            className="w-16 px-2 py-1.5 bg-white border border-[#B5A642]/10 rounded-lg text-xs text-center text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={cue.text}
                                            className="flex-1 px-3 py-1.5 bg-white border border-[#B5A642]/10 rounded-lg text-sm text-[#5D4037] font-serif focus:outline-none focus:border-[#FF9933]"
                                        />
                                        <button className="text-red-300 hover:text-red-500 p-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-3 bg-[#5D4037] text-white rounded-xl text-sm font-semibold hover:bg-[#FF9933] transition-colors">
                                Save & Sync to Frontend
                            </button>
                        </div>
                    </div>
                )}

                {/* Quiz Logic Builder */}
                {activeSection === "logic" && (
                    <div className="bg-white rounded-2xl border border-[#B5A642]/10 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-serif text-lg text-[#5D4037]">
                                    Diagnostic Logic Builder
                                </h3>
                                <p className="text-xs text-[#B5A642]">
                                    Map quiz answers to product recommendations
                                </p>
                            </div>
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#FF9933]/10 text-[#FF9933] rounded-lg text-xs font-semibold hover:bg-[#FF9933]/20">
                                <Plus size={14} /> Add Rule
                            </button>
                        </div>

                        <div className="space-y-3">
                            {QUIZ_RULES.map((rule, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-4 bg-[#F9F6F0] rounded-xl"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#B5A642] bg-[#B5A642]/10 px-2 py-0.5 rounded">
                                                IF
                                            </span>
                                            <p className="text-sm text-[#5D4037]">{rule.condition}</p>
                                        </div>
                                        <div className="flex items-center gap-2 ml-6">
                                            <ArrowRight size={12} className="text-[#FF9933]" />
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-2 py-0.5 rounded">
                                                RECOMMEND
                                            </span>
                                            <p className="text-sm text-[#5D4037] font-medium">
                                                {rule.product}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#B5A642]/10 text-[#B5A642]">
                                            {rule.category}
                                        </span>
                                        <button className="p-1.5 text-red-300 hover:text-red-500">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-4 bg-[#5D4037]/5 rounded-xl">
                            <p className="text-xs text-[#5D4037]/60 flex items-center gap-2">
                                <Sparkles size={14} className="text-[#FF9933]" />
                                <strong>Scoring Engine:</strong> Categories with highest points
                                determine the recommendation. Edit weights in{" "}
                                <code className="text-[#FF9933]">remedy-quiz/page.tsx</code>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AdminShell>
    );
}
