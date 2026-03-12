"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RitualKit } from "@/data/ritualKits";

interface RitualKitCardProps {
    kit: RitualKit;
    index?: number;
}

export default function RitualKitCard({ kit, index = 0 }: RitualKitCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative rounded-3xl overflow-hidden border border-[#B5A642]/20 bg-gradient-to-br from-white/80 to-[#F9F6F0] hover:shadow-2xl transition-all duration-500"
        >
            {/* Badge */}
            {kit.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#5D4037] text-white">
                        {kit.badge}
                    </span>
                </div>
            )}

            {/* Image Area */}
            <div className="relative h-48 bg-gradient-to-br from-[#C2B280]/20 to-[#FF9933]/10 flex items-center justify-center">
                <div className="text-center">
                    <span className="text-5xl">🪔</span>
                    <p className="text-xs text-[#B5A642] mt-2 font-medium">
                        {kit.items.length} Sacred Items
                    </p>
                </div>
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-[#FF9933] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    {kit.discountPercent}% OFF
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-serif text-xl text-[#5D4037] mb-2 group-hover:text-[#FF9933] transition-colors">
                    {kit.name}
                </h3>
                <p className="text-xs text-[#5D4037]/60 leading-relaxed mb-4 line-clamp-2">
                    {kit.description}
                </p>

                {/* Items List */}
                <div className="space-y-1.5 mb-4">
                    {kit.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#5D4037]/70">
                            <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
                            {item.name}
                            {item.quantity > 1 && <span className="text-[#B5A642]">×{item.quantity}</span>}
                        </div>
                    ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#B5A642]/10">
                    <div>
                        <span className="text-xs line-through text-[#B5A642]">
                            ₹{kit.originalTotal.toLocaleString("en-IN")}
                        </span>
                        <span className="block text-xl font-bold text-[#FF9933]">
                            ₹{kit.discountedPrice.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <Link
                        href={`/collection?kit=${kit.slug}`}
                        className="px-5 py-2.5 bg-[#FF9933] text-white rounded-xl text-sm font-semibold hover:bg-[#e68a2e] transition-colors"
                    >
                        View Kit
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
