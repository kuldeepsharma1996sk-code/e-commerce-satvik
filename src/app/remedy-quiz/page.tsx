"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";

const MONEY_QUIZ_QUESTIONS = [
    {
        id: 1,
        text: "Do you feel money flows into your life but exits just as fast?",
        options: ["Always", "Often", "Rarely"],
    },
    {
        id: 2,
        text: "Is your workspace clutter-free and facing North/East?",
        options: ["Yes", "No", "Partially"],
    },
    {
        id: 3,
        text: "Do you experience frequent unexpected 'hidden' expenses?",
        options: ["Yes", "No"],
    },
    {
        id: 4,
        text: "How would you describe your current financial energy?",
        options: ["Stagnant", "Volatile", "Growing"],
    },
    {
        id: 5,
        text: "Do you regularly light a diya or incense in your home or workspace?",
        options: ["Daily", "Sometimes", "Never"],
    },
    {
        id: 6,
        text: "Is there a Kuber Yantra or Lakshmi idol in your Mandir?",
        options: ["Yes", "No", "I don't have a Mandir"],
    },
    {
        id: 7,
        text: "Do you donate or offer 'Daan' on a regular basis?",
        options: ["Weekly", "Monthly", "Rarely"],
    },
    {
        id: 8,
        text: "Have you ever performed a specific Lakshmi or Kuber puja?",
        options: ["Yes, recently", "Long ago", "Never"],
    },
    {
        id: 9,
        text: "Do you feel anxious or stressed when thinking about money?",
        options: ["Very often", "Sometimes", "Rarely"],
    },
    {
        id: 10,
        text: "Are you ready to commit to a 21-day daily ritual?",
        options: ["Yes, fully", "I will try"],
    },
];

type ScoreCategory = "stagnation" | "expense" | "space" | "commitment";

function calculateScores(answers: Record<number, string>): Record<ScoreCategory, number> {
    const scores: Record<ScoreCategory, number> = {
        stagnation: 0,
        expense: 0,
        space: 0,
        commitment: 0,
    };

    if (answers[1] === "Always") scores.expense += 3;
    else if (answers[1] === "Often") scores.expense += 2;

    if (answers[2] === "No") scores.space += 3;
    else if (answers[2] === "Partially") scores.space += 1;

    if (answers[3] === "Yes") scores.expense += 3;

    if (answers[4] === "Stagnant") scores.stagnation += 3;
    else if (answers[4] === "Volatile") scores.expense += 2;

    if (answers[5] === "Never") scores.space += 2;
    else if (answers[5] === "Sometimes") scores.space += 1;

    if (answers[6] === "No" || answers[6] === "I don't have a Mandir") scores.stagnation += 2;

    if (answers[7] === "Rarely") scores.stagnation += 2;
    else if (answers[7] === "Monthly") scores.stagnation += 1;

    if (answers[8] === "Never") scores.stagnation += 2;
    else if (answers[8] === "Long ago") scores.stagnation += 1;

    if (answers[9] === "Very often") scores.expense += 2;

    if (answers[10] === "Yes, fully") scores.commitment += 3;
    else scores.commitment += 1;

    return scores;
}

interface Recommendation {
    title: string;
    targeting: string;
    product: string;
    mantra: string;
    duration: string;
    steps: string[];
}

function getRecommendation(scores: Record<ScoreCategory, number>): Recommendation {
    const maxCategory = Object.entries(scores)
        .filter(([k]) => k !== "commitment")
        .sort(([, a], [, b]) => b - a)[0][0] as ScoreCategory;

    if (maxCategory === "stagnation") {
        return {
            title: "The Vighnaharta Path",
            targeting: "Removing obstacles to prosperity",
            product: "Ganesh Ji Brass Idol + Modak Prasad Kit",
            mantra: "Om Gan Ganapataye Namah (108 times)",
            duration: "21 Days",
            steps: [
                "Place the Ganesh idol facing North-East in your Mandir",
                "Light a ghee diya every morning at sunrise",
                "Chant the mantra 108 times using a mala",
                "Offer a small Modak or Laddu as Prasad",
            ],
        };
    } else if (maxCategory === "expense") {
        return {
            title: "The Prosperity Lota & Lakshmi Jap",
            targeting: "Stability and wealth retention",
            product: "Prana-Pratishtha Kuber Yantra + Pure Brass Lota",
            mantra: "Om Shreem Mahalakshmaye Namah (108 times)",
            duration: "21 Days",
            steps: [
                "Perform Surya Arghya at sunrise with the Brass Lota",
                "Place the Kuber Yantra in your North-facing safe or locker",
                "Chant the mantra 108 times after Arghya",
                "Avoid lending money on Tuesdays during the ritual",
            ],
        };
    } else {
        return {
            title: "The Sacred Space Purification",
            targeting: "Cleansing negative energy from your environment",
            product: "Guggul Dhoop Cones + Copper Puja Thali Set",
            mantra: "Om Namah Shivaya (108 times)",
            duration: "21 Days",
            steps: [
                "Burn Guggul Dhoop in every room during sunset",
                "Declutter and clean your workspace completely",
                "Set up a small Mandir in the North-East corner",
                "Chant the mantra while lighting the evening diya",
            ],
        };
    }
}

export default function RemedyQuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

    const handleAnswer = (questionId: number, choice: string) => {
        const newAnswers = { ...answers, [questionId]: choice };
        setAnswers(newAnswers);

        if (step < 10) {
            setStep(step + 1);
        } else {
            setIsCalculating(true);
            setTimeout(() => {
                const scores = calculateScores(newAnswers);
                setRecommendation(getRecommendation(scores));
                setIsCalculating(false);
                setStep(11);
            }, 2500);
        }
    };

    const progress = step > 0 && step <= 10 ? (step / 10) * 100 : step === 11 ? 100 : 0;

    return (
        <div className="min-h-screen bg-ivory pb-24">
            {/* Hero */}
            <div className="bg-gradient-to-b from-[#5D4037] to-[#2D2A26] py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                        Interactive Consultation
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif text-white mt-3">
                        Dhan Vriddhi Diagnostic
                    </h1>
                    <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
                        Identify the energy blocks in your financial path and receive a
                        personalized 21-day remedy.
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            {step > 0 && (
                <div className="max-w-md mx-auto px-6 pt-6">
                    <div className="h-1.5 bg-[#B5A642]/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </div>
            )}

            {/* Quiz Engine */}
            <div className="max-w-md mx-auto px-6 py-8 min-h-[450px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {/* === INTRO === */}
                    {step === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto">
                                <Sparkles size={32} className="text-[#FF9933]" />
                            </div>
                            <h2 className="text-2xl font-serif text-[#5D4037]">
                                Money Flow Diagnostic
                            </h2>
                            <p className="text-sm text-[#5D4037]/70 leading-relaxed">
                                Answer 10 simple questions about your financial and spiritual
                                energy. We&apos;ll prescribe a personalized 21-day ritual to
                                unblock prosperity.
                            </p>
                            <div className="flex items-center justify-center gap-4 text-[10px] text-[#B5A642] uppercase tracking-wider">
                                <span>10 Questions</span>
                                <span className="w-1 h-1 bg-[#B5A642] rounded-full" />
                                <span>3 Minutes</span>
                                <span className="w-1 h-1 bg-[#B5A642] rounded-full" />
                                <span>Free</span>
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-4 bg-[#5D4037] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#FF9933] transition-colors"
                            >
                                Begin Consultation <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {/* === QUESTIONS === */}
                    {step > 0 && step <= 10 && !isCalculating && (
                        <motion.div
                            key={`q-${step}`}
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -30, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-[10px] text-[#B5A642] font-bold uppercase tracking-widest">
                                Question {step} of 10
                            </span>
                            <h3 className="text-xl font-serif text-[#5D4037] mt-2 mb-6 leading-relaxed">
                                {MONEY_QUIZ_QUESTIONS[step - 1].text}
                            </h3>
                            <div className="space-y-3">
                                {MONEY_QUIZ_QUESTIONS[step - 1].options.map((opt) => (
                                    <motion.button
                                        key={opt}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswer(step, opt)}
                                        className="w-full p-4 text-left rounded-2xl border-2 border-[#B5A642]/15 hover:border-[#FF9933] hover:bg-[#FF9933]/5 transition-all text-sm text-[#5D4037] font-medium"
                                    >
                                        {opt}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* === CALCULATING === */}
                    {isCalculating && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-6"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="w-16 h-16 border-4 border-[#B5A642]/20 border-t-[#FF9933] rounded-full mx-auto"
                            />
                            <p className="text-lg font-serif italic text-[#5D4037]">
                                Analyzing energy patterns...
                            </p>
                            <p className="text-[10px] text-[#B5A642] uppercase tracking-widest">
                                Mapping your spiritual blueprint
                            </p>
                        </motion.div>
                    )}

                    {/* === RESULT === */}
                    {step === 11 && recommendation && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 size={32} className="text-green-600" />
                                </div>
                                <h2 className="text-2xl font-serif text-[#5D4037]">
                                    Your Prescribed Remedy
                                </h2>
                            </div>

                            <div className="bg-white/70 p-6 rounded-3xl border border-[#B5A642]/20 shadow-sm">
                                <div className="p-4 bg-[#FF9933]/5 rounded-2xl border border-[#FF9933]/20 mb-5">
                                    <p className="font-bold text-[#FF9933] text-lg font-serif">
                                        {recommendation.title}
                                    </p>
                                    <p className="text-xs text-[#5D4037]/60 mt-1">
                                        Targeting: {recommendation.targeting}
                                    </p>
                                </div>

                                {/* Recommended Product */}
                                <div className="mb-5">
                                    <p className="text-[10px] text-[#B5A642] uppercase tracking-wider font-bold mb-1">
                                        Recommended Kit
                                    </p>
                                    <p className="text-sm font-semibold text-[#5D4037]">
                                        {recommendation.product}
                                    </p>
                                </div>

                                {/* Steps */}
                                <div className="mb-5">
                                    <p className="text-[10px] text-[#B5A642] uppercase tracking-wider font-bold mb-2">
                                        Daily Practice
                                    </p>
                                    <ul className="space-y-2">
                                        {recommendation.steps.map((s, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-xs text-[#5D4037]/80"
                                            >
                                                <CheckCircle2
                                                    size={14}
                                                    className="text-green-600 flex-shrink-0 mt-0.5"
                                                />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Mantra */}
                                <div className="p-3 bg-[#5D4037]/5 rounded-xl text-center mb-5">
                                    <p className="text-[10px] text-[#B5A642] uppercase tracking-wider mb-1">
                                        Sacred Mantra
                                    </p>
                                    <p className="text-sm font-serif italic text-[#5D4037]">
                                        &quot;{recommendation.mantra}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-xs text-[#B5A642] mb-5 border-t border-[#B5A642]/10 pt-4">
                                    <span className="font-bold">{recommendation.duration}</span>
                                    <span>of daily practice</span>
                                </div>

                                <Link
                                    href="/collection"
                                    className="w-full py-4 bg-[#FF9933] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#e68a2e] transition-all"
                                >
                                    <ShoppingBag size={18} /> Order Remedy Kit
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
