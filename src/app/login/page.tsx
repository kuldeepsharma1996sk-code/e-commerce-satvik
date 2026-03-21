"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    if (isAuthenticated) {
        router.push("/profile");
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        await new Promise((r) => setTimeout(r, 800));

        const success = login(email, password);
        if (success) {
            router.push("/profile");
        } else {
            setError("Invalid email or password. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center pb-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#e68a2e] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#FF9933]/20">
                        <Sparkles size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-serif text-[#5D4037]">Welcome Back</h1>
                    <p className="text-sm text-[#5D4037]/50 mt-2">
                        Enter your sacred space
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="bg-white/60 rounded-3xl border border-[#B5A642]/10 p-6 md:p-8 backdrop-blur-sm">
                    {/* Email */}
                    <div className="mb-5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                            Email
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A642]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="bhakt@satvikhome.com"
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-[#B5A642]/20 rounded-xl text-[#5D4037] placeholder:text-[#B5A642]/40 focus:outline-none focus:border-[#FF9933] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A642]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-11 pr-12 py-3.5 bg-white/80 border border-[#B5A642]/20 rounded-xl text-[#5D4037] placeholder:text-[#B5A642]/40 focus:outline-none focus:border-[#FF9933] transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B5A642] hover:text-[#5D4037]"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-[#C41E3A] text-sm mb-4 bg-[#C41E3A]/5 px-4 py-2 rounded-xl"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e68a2e] transition-all disabled:opacity-70"
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <>
                                Enter Your Space <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    {/* Demo Hint */}
                    <div className="mt-6 p-4 bg-[#B5A642]/5 rounded-xl text-center">
                        <p className="text-[10px] text-[#B5A642] uppercase tracking-wider font-semibold mb-1">
                            Demo Credentials
                        </p>
                        <p className="text-xs text-[#5D4037]/60">
                            <strong>Email:</strong> bhakt@satvikhome.com
                        </p>
                        <p className="text-xs text-[#5D4037]/60">
                            <strong>Password:</strong> Shanti123
                        </p>
                    </div>
                </form>

                <p className="text-center text-xs text-[#5D4037]/40 mt-6">
                    New to Satvik Home?{" "}
                    <Link href="/collection" className="text-[#FF9933] font-semibold hover:underline">
                        Start Shopping
                    </Link>
                </p>

                <div className="mt-8 text-center uppercase tracking-[0.2em] text-[10px] text-[#B5A642] font-bold">
                    <Link href="/admin" className="hover:text-[#FF9933] transition-colors">
                        Admin Access
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
