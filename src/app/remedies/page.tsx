"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import DailyRemedyCard from "@/components/ui/DailyRemedyCard";
import PanchangWidget from "@/components/ui/PanchangWidget";
import { todaysRemedy, todaysPanchang, rashiPredictions } from "@/data/astrology";
import Link from "next/link";

export default function RemediesPage() {
    const [selectedRashi, setSelectedRashi] = useState<string | null>(null);
    const selectedPrediction = rashiPredictions.find((r) => r.rashi === selectedRashi);

    const shareRemedy = () => {
        const text = `✨ *Daily Remedy from Antigravity* ✨\n\n*${todaysRemedy.title}*\n${todaysRemedy.content}\n\nRead more: https://antigravity.in/remedies`;
        if (navigator.share) {
            navigator.share({ title: "Today's Remedy", text }).catch(() => { });
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        }
    };

    return (
        <div className="min-h-screen bg-ivory pb-24">
            {/* Hero */}
            <div className="bg-gradient-to-b from-[#5D4037] to-[#2D2A26] py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-[#FF9933]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-10 w-48 h-48 bg-[#B5A642]/5 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles size={16} className="text-[#FF9933]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                            Your Spiritual Companion
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mt-3">
                        Daily Guidance
                    </h1>
                    <p className="text-white/50 mt-3 max-w-lg mx-auto">
                        Begin each day with ancient wisdom. Explore your horoscope, the
                        Panchang, and today&apos;s spiritual remedy.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Remedy + Panchang */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <div>
                        <h2 className="text-2xl font-serif text-[#5D4037] mb-6 flex items-center gap-2">
                            <Sun size={20} className="text-[#FF9933]" /> Today&apos;s Remedy
                        </h2>
                        <DailyRemedyCard remedy={todaysRemedy} />
                    </div>
                    <div id="panchang">
                        <h2 className="text-2xl font-serif text-[#5D4037] mb-6 flex items-center gap-2">
                            <Moon size={20} className="text-[#B5A642]" /> Today&apos;s Panchang
                        </h2>
                        <PanchangWidget data={todaysPanchang} />
                    </div>
                </div>

                {/* Rashi Horoscope Section */}
                <section>
                    <div className="text-center mb-10">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                            Personalized Predictions
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#5D4037] mt-3">
                            Your Daily Horoscope
                        </h2>
                        <p className="text-[#5D4037]/60 mt-2">
                            Select your Rashi to reveal today&apos;s prediction
                        </p>
                    </div>

                    {/* Rashi Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                        {rashiPredictions.map((rashi) => (
                            <motion.button
                                key={rashi.rashi}
                                onClick={() => setSelectedRashi(rashi.rashi)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 rounded-2xl text-center transition-all border-2 ${selectedRashi === rashi.rashi
                                    ? "border-[#FF9933] bg-[#FF9933]/10 shadow-lg"
                                    : "border-[#B5A642]/10 bg-white/40 hover:border-[#B5A642]/30"
                                    }`}
                            >
                                <span className="text-2xl block mb-1">{rashi.symbol}</span>
                                <span className="text-xs font-bold text-[#5D4037] block">
                                    {rashi.rashi}
                                </span>
                                <span className="text-[10px] text-[#B5A642]">
                                    {rashi.rashiHindi}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Selected Rashi Prediction */}
                    {selectedPrediction && (
                        <motion.div
                            key={selectedPrediction.rashi}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto p-6 md:p-8 bg-white/60 rounded-3xl border border-[#B5A642]/20 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-[#FF9933]/10 rounded-2xl flex items-center justify-center text-3xl">
                                    {selectedPrediction.symbol}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-[#5D4037]">
                                        {selectedPrediction.rashi}
                                    </h3>
                                    <p className="text-sm text-[#B5A642]">
                                        {selectedPrediction.rashiHindi}
                                    </p>
                                </div>
                            </div>

                            <p className="text-[#5D4037]/80 leading-relaxed mb-6">
                                {selectedPrediction.prediction}
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                                    <p className="text-[10px] text-[#B5A642] uppercase font-semibold mb-1">
                                        Lucky Number
                                    </p>
                                    <p className="text-xl font-bold text-[#FF9933]">
                                        {selectedPrediction.luckyNumber}
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                                    <p className="text-[10px] text-[#B5A642] uppercase font-semibold mb-1">
                                        Lucky Color
                                    </p>
                                    <p className="text-sm font-bold text-[#5D4037]">
                                        {selectedPrediction.luckyColor}
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-[#F9F6F0] rounded-xl">
                                    <p className="text-[10px] text-[#B5A642] uppercase font-semibold mb-1">
                                        Lucky Time
                                    </p>
                                    <p className="text-xs font-bold text-[#5D4037]">
                                        {selectedPrediction.luckyTime}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={shareRemedy}
                                className="w-full py-3 bg-[#5D4037] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#FF9933] transition-colors"
                            >
                                <Share2 size={16} /> Share on WhatsApp
                            </button>
                        </motion.div>
                    )}
                </section>

                {/* CTA to Shop */}
                <section className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-[#FF9933]/10 to-[#B5A642]/10 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-serif text-[#5D4037] mb-3">
                            Enhance Your Daily Practice
                        </h3>
                        <p className="text-[#5D4037]/60 mb-6 max-w-md mx-auto">
                            Explore our curated collection of pooja essentials that complement
                            your daily spiritual routine.
                        </p>
                        <Link
                            href="/collection"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF9933] text-white rounded-2xl font-semibold hover:bg-[#e68a2e] transition-colors"
                        >
                            Explore Collection <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
