"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

type CheckoutStep = "address" | "otp" | "payment" | "success";

export default function CheckoutPage() {
    const { items, total, subtotal, clearCart } = useCart();
    const [step, setStep] = useState<CheckoutStep>("address");
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        line1: "",
        city: "",
        state: "",
        pincode: "",
    });

    // OTP state
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [resendTimer, setResendTimer] = useState(30);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Payment state
    const [, setPaymentProcessing] = useState(false);

    // Resend timer
    useEffect(() => {
        if (step === "otp" && resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [step, resendTimer]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otpValues];
        newOtp[index] = value.slice(-1);
        setOtpValues(newOtp);
        setOtpError("");

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const verifyOtp = () => {
        const otp = otpValues.join("");
        if (otp === "108108") {
            setPaymentProcessing(true);
            setStep("payment");
            // Simulate payment processing
            setTimeout(() => {
                setPaymentProcessing(false);
                setStep("success");
                clearCart();
            }, 3500);
        } else {
            setOtpError("Invalid OTP. Please try again. (Hint: 108108)");
        }
    };

    const isAddressValid =
        address.name && address.phone && address.line1 && address.city && address.pincode;

    if (items.length === 0 && step !== "success") {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center pb-24 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-serif text-[#5D4037] mb-4">
                        Add items to your cart first
                    </h1>
                    <Link
                        href="/collection"
                        className="text-[#FF9933] font-semibold hover:underline"
                    >
                        Browse Collection →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory pb-24">
            <div className="max-w-lg mx-auto px-4 py-8">
                {/* Step Indicator */}
                {step !== "success" && (
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {(["address", "otp", "payment"] as const).map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === s
                                        ? "bg-[#FF9933] text-white"
                                        : ["address", "otp", "payment"].indexOf(step) > i
                                            ? "bg-green-500 text-white"
                                            : "bg-[#B5A642]/10 text-[#B5A642]"
                                        }`}
                                >
                                    {["address", "otp", "payment"].indexOf(step) > i ? "✓" : i + 1}
                                </div>
                                {i < 2 && (
                                    <div
                                        className={`w-12 h-0.5 ${["address", "otp", "payment"].indexOf(step) > i
                                            ? "bg-green-500"
                                            : "bg-[#B5A642]/10"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* === ADDRESS STEP === */}
                    {step === "address" && (
                        <motion.div
                            key="address"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin size={18} className="text-[#FF9933]" />
                                <h1 className="text-2xl font-serif text-[#5D4037]">
                                    Delivery Address
                                </h1>
                            </div>

                            <div className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-6 space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1.5 block">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={address.name}
                                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                        placeholder="Satvik Sharma"
                                        className="w-full px-4 py-3 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1.5 block">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={address.phone}
                                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                        placeholder="9876543210"
                                        className="w-full px-4 py-3 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1.5 block">
                                        Address Line 1
                                    </label>
                                    <input
                                        type="text"
                                        value={address.line1}
                                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                                        placeholder="House/Flat No., Building, Street"
                                        className="w-full px-4 py-3 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1.5 block">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            placeholder="New Delhi"
                                            className="w-full px-4 py-3 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#B5A642] mb-1.5 block">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            value={address.pincode}
                                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                            placeholder="110001"
                                            className="w-full px-4 py-3 bg-white/80 border border-[#B5A642]/20 rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => { setStep("otp"); setResendTimer(30); }}
                                disabled={!isAddressValid}
                                className="w-full mt-6 py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e68a2e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Continue to Verification <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}

                    {/* === OTP STEP === */}
                    {step === "otp" && (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-center"
                        >
                            <button
                                onClick={() => setStep("address")}
                                className="flex items-center gap-1 text-sm text-[#B5A642] mb-6 hover:text-[#FF9933]"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>

                            <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={28} className="text-[#FF9933]" />
                            </div>
                            <h1 className="text-2xl font-serif text-[#5D4037] mb-2">
                                Verify Your Identity
                            </h1>
                            <p className="text-sm text-[#5D4037]/50 mb-8">
                                We&apos;ve sent a sacred code to{" "}
                                <strong>+91 {address.phone}</strong>
                            </p>

                            {/* OTP Input Boxes */}
                            <div className="flex justify-center gap-3 mb-6">
                                {otpValues.map((val, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { otpRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={val}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none ${val
                                            ? "border-[#FF9933] bg-[#FF9933]/5 text-[#5D4037]"
                                            : "border-[#B5A642]/20 bg-white/60 text-[#5D4037]"
                                            } focus:border-[#FF9933]`}
                                    />
                                ))}
                            </div>

                            {otpError && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#C41E3A] text-sm mb-4"
                                >
                                    {otpError}
                                </motion.p>
                            )}

                            <button
                                onClick={verifyOtp}
                                disabled={otpValues.some((v) => !v)}
                                className="w-full py-4 bg-[#FF9933] text-white rounded-2xl font-bold shadow-lg hover:bg-[#e68a2e] transition-all disabled:opacity-40"
                            >
                                Verify &amp; Pay ₹{(total + (subtotal < 999 ? 99 : 0)).toLocaleString("en-IN")}
                            </button>

                            <p className="text-xs text-[#B5A642] mt-4">
                                {resendTimer > 0 ? (
                                    <>Resend code in {resendTimer}s</>
                                ) : (
                                    <button
                                        onClick={() => setResendTimer(30)}
                                        className="text-[#FF9933] font-semibold hover:underline"
                                    >
                                        Resend Code
                                    </button>
                                )}
                            </p>

                            <p className="text-[10px] text-[#B5A642]/50 mt-6">
                                Demo OTP: <strong>108108</strong>
                            </p>
                        </motion.div>
                    )}

                    {/* === PAYMENT PROCESSING === */}
                    {step === "payment" && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="w-16 h-16 border-4 border-[#B5A642]/20 border-t-[#FF9933] rounded-full"
                            />
                            <p className="text-lg font-serif text-[#5D4037] animate-pulse">
                                Securing your divine connection...
                            </p>
                            <p className="text-[10px] text-[#B5A642] uppercase tracking-widest">
                                Processing via Razorpay
                            </p>
                        </motion.div>
                    )}

                    {/* === SUCCESS === */}
                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <span className="text-4xl">🙏</span>
                            </motion.div>
                            <h1 className="text-3xl font-serif text-[#5D4037] mb-3">
                                Order Blessed!
                            </h1>
                            <p className="text-sm text-[#5D4037]/60 mb-2">
                                Your sacred items are being prepared with care and devotion.
                            </p>
                            <p className="text-xs text-[#B5A642] mb-8">
                                Order ID: ORD-2026-{Math.floor(1000 + Math.random() * 9000)}
                            </p>

                            <div className="bg-[#FF9933]/5 rounded-2xl border border-[#FF9933]/20 p-5 mb-6">
                                <p className="text-sm font-serif text-[#5D4037] mb-1">
                                    ✨ Start Your Spiritual Journey
                                </p>
                                <p className="text-xs text-[#5D4037]/60">
                                    Your 21-day ritual tracker is now available in your profile
                                    dashboard.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/profile"
                                    className="w-full py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                                >
                                    Go to My Dashboard <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/"
                                    className="text-sm text-[#B5A642] hover:text-[#FF9933]"
                                >
                                    Return to Home
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
