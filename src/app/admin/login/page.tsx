"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, LayoutDashboard, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { adminLogin, user } = useAuth();
    const router = useRouter();

    if (user?.isAdmin) {
        router.push("/admin");
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        await new Promise((r) => setTimeout(r, 1000));

        const success = adminLogin(email, password);
        if (success) {
            router.push("/admin");
        } else {
            setError("Access Denied: Invalid administrator credentials.");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Shield size={32} className="text-[#FF9933]" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-sm text-slate-500 mt-2 italic">
                        Access the Sattvik Home Control Center
                    </p>
                </div>

                <form onSubmit={handleLogin} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@satvikhome.com"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#FF9933] transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                                Authentication Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#FF9933] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs text-center font-bold"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Authorize Access <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Demo Hint */}
                    <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
                            Admin Demo Credentials
                        </p>
                        <p className="text-xs text-slate-600">
                            <strong>Email:</strong> admin@satvikhome.com
                        </p>
                        <p className="text-xs text-slate-600">
                            <strong>Password:</strong> AdminSecure123
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                        <Link href="/login" className="hover:text-slate-900 transition-colors">
                            Customer Login
                        </Link>
                        <span>v2.0.4</span>
                    </div>
                </form>

                <div className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-[0.3em]">
                    Secured by Satvik Home Identity
                </div>
            </motion.div>
        </div>
    );
}
