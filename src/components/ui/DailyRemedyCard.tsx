"use client";

import { motion } from "framer-motion";
import { Share2, Sun, Sparkles } from "lucide-react";

interface DailyRemedyCardProps {
    remedy: {
        title: string;
        content: string;
        benefitCategory?: string;
    };
}

export default function DailyRemedyCard({ remedy }: DailyRemedyCardProps) {
    const shareToWhatsApp = () => {
        const text = `✨ *Daily Remedy from Antigravity* ✨\n\n*${remedy.title}*\n${remedy.content}\n\nStart your day with purpose: https://antigravity.in`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-[#F9F6F0] p-6 border border-[#B5A642]/30 shadow-sm"
        >
            {/* Decorative Background Element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF9933]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#B5A642]/10 rounded-full blur-2xl" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-[#B5A642]">
                        <Sun size={18} />
                        <span className="text-xs font-semibold tracking-widest uppercase">
                            Today&apos;s Sattvic Path
                        </span>
                    </div>
                    <button
                        onClick={shareToWhatsApp}
                        className="p-2 rounded-full bg-white/50 text-[#5D4037] hover:bg-white transition-colors"
                        aria-label="Share on WhatsApp"
                    >
                        <Share2 size={16} />
                    </button>
                </div>

                <h3 className="text-2xl font-serif text-[#5D4037] mb-2">
                    {remedy.title}
                </h3>
                <p className="text-[#5D4037]/80 text-sm leading-relaxed mb-6">
                    {remedy.content}
                </p>

                <div className="flex items-center justify-between border-t border-[#B5A642]/10 pt-4">
                    <div className="flex items-center gap-1 text-[10px] text-[#B5A642]">
                        <Sparkles size={12} />
                        <span>
                            Recommended for {remedy.benefitCategory?.toLowerCase() || "prosperity"}
                        </span>
                    </div>
                    <button className="text-xs font-bold text-[#FF9933] underline decoration-2 underline-offset-4 hover:text-[#e68a2e] transition-colors">
                        View Detail
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
