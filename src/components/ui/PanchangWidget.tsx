"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Moon, Sun } from "lucide-react";
import { PanchangData } from "@/data/astrology";

interface PanchangWidgetProps {
    data?: PanchangData;
}

export default function PanchangWidget({ data }: PanchangWidgetProps) {
    const panchang = data || {
        tithi: "Shukla Ekadashi",
        nakshatra: "Rohini",
        yoga: "Siddhi",
        karana: "Bava",
        abhijitMuhurat: "11:45 AM - 12:30 PM",
        sunrise: "06:42 AM",
        sunset: "06:15 PM",
        moonrise: "03:22 PM",
        rahukaal: "10:30 AM - 12:00 PM",
        location: "New Delhi, IN",
        isAuspicious: true,
        auspiciousMessage:
            "Ekadashi is a divine time to bring home a new Idol. Explore the collection.",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-md mx-auto p-6 rounded-3xl backdrop-blur-lg border shadow-xl transition-all duration-700 ${panchang.isAuspicious
                    ? "bg-gradient-to-br from-white/50 to-[#FF9933]/5 border-[#FF9933]/30"
                    : "bg-white/40 border-[#B5A642]/20"
                }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-[#5D4037] flex items-center gap-2">
                    Today&apos;s Panchang
                </h2>
                <div className="flex items-center gap-1 text-[10px] text-[#B5A642] font-bold uppercase tracking-wider">
                    <MapPin size={12} /> {panchang.location}
                </div>
            </div>

            {/* Auspicious Pulse Indicator */}
            {panchang.isAuspicious && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-xl border border-green-200">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-[11px] text-green-700 font-medium">
                        Auspicious time in progress
                    </span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col p-3 bg-white/60 rounded-2xl border border-[#B5A642]/10">
                    <span className="text-[10px] text-[#B5A642] uppercase font-semibold">
                        Tithi
                    </span>
                    <span className="text-sm font-bold text-[#5D4037]">
                        {panchang.tithi}
                    </span>
                </div>
                <div className="flex flex-col p-3 bg-white/60 rounded-2xl border border-[#B5A642]/10">
                    <span className="text-[10px] text-[#B5A642] uppercase font-semibold">
                        Nakshatra
                    </span>
                    <span className="text-sm font-bold text-[#5D4037]">
                        {panchang.nakshatra}
                    </span>
                </div>
                <div className="flex flex-col p-3 bg-white/60 rounded-2xl border border-[#B5A642]/10">
                    <span className="text-[10px] text-[#B5A642] uppercase font-semibold">
                        Yoga
                    </span>
                    <span className="text-sm font-bold text-[#5D4037]">
                        {panchang.yoga}
                    </span>
                </div>
                <div className="flex flex-col p-3 bg-white/60 rounded-2xl border border-[#B5A642]/10">
                    <span className="text-[10px] text-[#B5A642] uppercase font-semibold">
                        Rahu Kaal
                    </span>
                    <span className="text-sm font-bold text-[#C41E3A]">
                        {panchang.rahukaal}
                    </span>
                </div>
            </div>

            {/* Abhijit Muhurat Highlight */}
            <div className="mt-4 p-4 bg-[#FF9933]/10 rounded-2xl border border-[#FF9933]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF9933] rounded-full text-white">
                        <Clock size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-[#FF9933] font-bold uppercase">
                            Abhijit Muhurat
                        </p>
                        <p className="text-sm font-bold text-[#5D4037]">
                            {panchang.abhijitMuhurat}
                        </p>
                    </div>
                </div>
                <button className="text-[10px] bg-[#5D4037] text-white px-3 py-1.5 rounded-full hover:bg-[#FF9933] transition-colors">
                    All Timings
                </button>
            </div>

            {/* Muhurat Shopping Prompt */}
            {panchang.isAuspicious && panchang.auspiciousMessage && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-3 bg-gradient-to-r from-[#FF9933]/10 to-[#B5A642]/10 rounded-xl text-center"
                >
                    <p className="text-[11px] text-[#5D4037]/80 italic">
                        ✨ {panchang.auspiciousMessage}
                    </p>
                </motion.div>
            )}

            {/* Sunrise / Sunset Row */}
            <div className="mt-4 flex justify-around text-[#B5A642] text-xs">
                <div className="flex items-center gap-2">
                    <Sun size={14} /> {panchang.sunrise}
                </div>
                <div className="flex items-center gap-2">
                    <Moon size={14} /> {panchang.sunset}
                </div>
            </div>
        </motion.div>
    );
}
