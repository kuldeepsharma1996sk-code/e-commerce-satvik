"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";

interface SubscriptionToggleProps {
    price: number;
}

export default function SubscriptionToggle({ price }: SubscriptionToggleProps) {
    const [isSubscription, setIsSubscription] = useState(true);
    const discountedPrice = Math.round(price * 0.85);

    return (
        <div className="space-y-4 my-6">
            {/* One-Time Option */}
            <div
                onClick={() => setIsSubscription(false)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${!isSubscription
                        ? "border-[#FF9933] bg-[#FF9933]/5"
                        : "border-[#B5A642]/20 hover:border-[#B5A642]/40"
                    }`}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isSubscription ? "border-[#FF9933]" : "border-[#B5A642]/40"
                                }`}
                        >
                            {!isSubscription && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
                            )}
                        </div>
                        <span className="text-sm font-medium text-[#5D4037]">
                            One-time Offering
                        </span>
                    </div>
                    <span className="font-bold text-[#5D4037]">
                        ₹{price.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* Subscription Option */}
            <div
                onClick={() => setIsSubscription(true)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${isSubscription
                        ? "border-[#FF9933] bg-[#FF9933]/5"
                        : "border-[#B5A642]/20 hover:border-[#B5A642]/40"
                    }`}
            >
                <div className="absolute top-0 right-0 bg-[#FF9933] text-white text-[10px] px-3 py-1 rounded-bl-xl font-bold uppercase tracking-wider">
                    Sattva Savings
                </div>
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${isSubscription ? "border-[#FF9933]" : "border-[#B5A642]/40"
                                }`}
                        >
                            {isSubscription && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-bold text-[#5D4037] flex items-center gap-2">
                                Monthly Ritual{" "}
                                <Leaf size={14} className="text-green-600" />
                            </span>
                            <p className="text-[10px] text-[#5D4037]/60 leading-tight max-w-[200px]">
                                Freshly hand-rolled sticks delivered every 30 days. Pause
                                anytime.
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs line-through text-[#B5A642]">
                            ₹{price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-lg font-bold text-[#FF9933]">
                            ₹{discountedPrice.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
