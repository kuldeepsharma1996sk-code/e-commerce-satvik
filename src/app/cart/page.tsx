"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
    const {
        items,
        removeItem,
        updateQuantity,
        subtotal,
        discount,
        total,
        couponCode,
        applyCoupon,
        totalItems,
    } = useCart();

    const [couponInput, setCouponInput] = useState("");
    const [couponError, setCouponError] = useState("");

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        applyCoupon(couponInput);
        if (!["SHIVA20", "DIWALI50", "FIRST10", "SATTVA15"].includes(couponInput.toUpperCase())) {
            setCouponError("Invalid coupon code");
        } else {
            setCouponError("");
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-[#B5A642]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={40} className="text-[#B5A642]" />
                    </div>
                    <h1 className="text-3xl font-serif text-[#5D4037] mb-3">
                        Your Cart is Empty
                    </h1>
                    <p className="text-[#5D4037]/60 mb-8 max-w-sm">
                        Explore our sacred collection and find the perfect piece for your
                        mandir.
                    </p>
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF9933] text-white rounded-2xl font-semibold hover:bg-[#e68a2e] transition-colors"
                    >
                        Start Shopping <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl md:text-4xl font-serif text-[#5D4037] mb-8">
                    Your Cart{" "}
                    <span className="text-lg text-[#B5A642] font-sans">
                        ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.product.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4 p-4 bg-white/60 rounded-2xl border border-[#B5A642]/10"
                            >
                                {/* Product Image Placeholder */}
                                <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-[#F9F6F0] to-[#E8E2D6] rounded-xl flex items-center justify-center">
                                    <span className="text-3xl font-serif text-[#C2B280]/50">
                                        {item.product.name.charAt(0)}
                                    </span>
                                </div>

                                {/* Item Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link
                                                href={`/collection/${item.product.slug}`}
                                                className="font-serif text-lg text-[#5D4037] hover:text-[#FF9933] transition-colors"
                                            >
                                                {item.product.name}
                                            </Link>
                                            {item.isSubscription && (
                                                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF9933]/10 text-[#FF9933]">
                                                    Monthly
                                                </span>
                                            )}
                                            <p className="text-xs text-[#5D4037]/50 mt-0.5">
                                                {item.product.category}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="p-2 text-[#B5A642] hover:text-[#C41E3A] transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Variants */}
                                    {item.selectedVariants &&
                                        Object.entries(item.selectedVariants).length > 0 && (
                                            <div className="flex gap-2 mt-1">
                                                {Object.entries(item.selectedVariants).map(
                                                    ([key, value]) => (
                                                        <span
                                                            key={key}
                                                            className="text-[10px] text-[#B5A642] bg-[#B5A642]/10 px-2 py-0.5 rounded"
                                                        >
                                                            {key}: {value}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}

                                    {/* Qty + Price */}
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2 bg-white/80 rounded-xl border border-[#B5A642]/10">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity - 1)
                                                }
                                                className="p-2 text-[#5D4037]/50 hover:text-[#5D4037]"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium text-[#5D4037] w-6 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity + 1)
                                                }
                                                className="p-2 text-[#5D4037]/50 hover:text-[#5D4037]"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="font-bold text-[#FF9933]">
                                            ₹
                                            {(
                                                (item.isSubscription
                                                    ? Math.round(item.product.price * 0.85)
                                                    : item.product.price) * item.quantity
                                            ).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white/60 rounded-3xl border border-[#B5A642]/10 p-6">
                            <h2 className="text-xl font-serif text-[#5D4037] mb-6">
                                Order Summary
                            </h2>

                            {/* Coupon */}
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                                    Coupon Code
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Tag
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B5A642]"
                                        />
                                        <input
                                            type="text"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                            placeholder="e.g. FIRST10"
                                            className="w-full pl-9 pr-3 py-2.5 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2.5 bg-[#5D4037] text-white rounded-xl text-sm font-semibold hover:bg-[#FF9933] transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponCode && (
                                    <p className="text-xs text-green-600 mt-1 font-medium">
                                        ✓ Code &quot;{couponCode}&quot; applied!
                                    </p>
                                )}
                                {couponError && !couponCode && (
                                    <p className="text-xs text-[#C41E3A] mt-1">{couponError}</p>
                                )}
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-[#5D4037]/70">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{discount.toLocaleString("en-IN")}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm text-[#5D4037]/70">
                                    <span>Shipping</span>
                                    <span className={subtotal >= 999 ? "text-green-600" : ""}>
                                        {subtotal >= 999 ? "FREE" : "₹99"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-[#5D4037] pt-3 border-t border-[#B5A642]/10">
                                    <span>Total</span>
                                    <span>
                                        ₹{(total + (subtotal < 999 ? 99 : 0)).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <Link href="/checkout" className="w-full py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e68a2e] transition-all">
                                Proceed to Checkout
                            </Link>

                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#B5A642]">
                                <ShieldCheck size={14} />
                                <span>Secure Checkout by Razorpay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
