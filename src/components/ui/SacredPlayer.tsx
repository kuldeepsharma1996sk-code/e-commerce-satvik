"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface SubtitleEntry {
    start: number;
    end: number;
    text: string;
}

const MANTRA_SUBTITLES: SubtitleEntry[] = [
    { start: 0, end: 2, text: "Om" },
    { start: 2, end: 4, text: "Shreem" },
    { start: 4, end: 7, text: "Mahalakshmaye" },
    { start: 7, end: 9, text: "Namah" },
    { start: 9, end: 11, text: "Om" },
    { start: 11, end: 13, text: "Shreem" },
    { start: 13, end: 16, text: "Mahalakshmaye" },
    { start: 16, end: 18, text: "Namah" },
];

interface SacredPlayerProps {
    src?: string;
    poster?: string;
    mantraSubtitles?: SubtitleEntry[];
    japCount?: number;
}

export default function SacredPlayer({
    src,
    poster,
    mantraSubtitles = MANTRA_SUBTITLES,
    japCount = 108,
}: SacredPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentMantra, setCurrentMantra] = useState("");
    const [loopCount, setLoopCount] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const time = videoRef.current.currentTime;
        setCurrentTime(time);

        const active = mantraSubtitles.find(
            (s) => time >= s.start && time <= s.end
        );
        setCurrentMantra(active ? active.text : "");
    };

    const handleEnded = () => {
        if (loopCount + 1 < japCount && videoRef.current) {
            setLoopCount((c) => c + 1);
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        } else {
            setIsPlaying(false);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    const restart = () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        setLoopCount(0);
        setCurrentMantra("");
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-3xl overflow-hidden bg-[#2D2A26] shadow-2xl group">
            {/* Video Element */}
            {src ? (
                <video
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover opacity-80"
                    poster={poster}
                    playsInline
                    muted={isMuted}
                    src={src}
                />
            ) : (
                /* Placeholder when no video src */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2D2A26] to-[#5D4037]">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="text-6xl mb-4"
                    >
                        🕉️
                    </motion.div>
                    <p className="text-white/40 text-sm font-serif italic">
                        Sacred Jap video will appear here
                    </p>
                </div>
            )}

            {/* Mantra Subtitle Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                    {currentMantra && (
                        <motion.h2
                            key={currentMantra + currentTime}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl md:text-6xl font-serif text-[#FF9933] drop-shadow-[0_0_15px_rgba(255,153,51,0.5)]"
                        >
                            {currentMantra}
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>

            {/* Jap Counter */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/70">
                Round{" "}
                <span className="text-[#FF9933] font-bold">{loopCount + 1}</span>
                /{japCount}
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4 text-white">
                    <button
                        onClick={togglePlay}
                        className="p-2 hover:text-[#FF9933] transition-colors"
                    >
                        {isPlaying ? (
                            <Pause size={22} fill="currentColor" />
                        ) : (
                            <Play size={22} fill="currentColor" />
                        )}
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                        <motion.div
                            className="h-full bg-[#FF9933] rounded-full"
                            style={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    <button
                        onClick={restart}
                        className="p-1 hover:text-[#FF9933] transition-colors"
                    >
                        <RotateCcw size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setIsMuted(!isMuted);
                            if (videoRef.current) videoRef.current.muted = !isMuted;
                        }}
                        className="p-1 hover:text-[#FF9933] transition-colors"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
