"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onFinished: () => void;
}

const FASTFETCH_INFO = [
  { label: "OS", value: "BlackArch Linux x86_64", color: "text-sky-400" },
  { label: "WM", value: "Hyprland (Wayland)", color: "text-sky-400" },
  { label: "Terminal", value: "kitty 0.37.0 (icat)", color: "text-emerald-400" },
  { label: "Shell", value: "zsh 5.9 (powerlevel10k)", color: "text-amber-400" },
  { label: "Author", value: "Rayhan Arie Fahreza", color: "text-zinc-900 dark:text-white" },
  { label: "Role", value: "Software Engineer & Cybersecurity", color: "text-google-blue" },
];

const TOTAL_FETCH_STEPS = 8;

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Step 1: fastfetch command
  const [cmd1, setCmd1] = useState("");
  const [showFastfetch, setShowFastfetch] = useState(false);
  const [visibleFetchLines, setVisibleFetchLines] = useState(0);

  // Step 2: ./portfolio.AppImage command
  const [showPrompt2, setShowPrompt2] = useState(false);
  const [cmd2, setCmd2] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  // Step 3: ✓ done — welcome & final prompt
  const [isDone, setIsDone] = useState(false);

  const isExitingRef = useRef(false);

  const finishImmediately = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    setIsClosing(true);

    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    setTimeout(() => {
      setIsVisible(false);
      onFinished();
    }, 480);
  }, [onFinished]);

  useEffect(() => {
    const cmd1Target = "fastfetch";
    const cmd2Target = "./portfolio.AppImage";
    let timeoutId: NodeJS.Timeout;
    let fetchInterval: NodeJS.Timeout;
    let progInterval: NodeJS.Timeout;

    // 1. Type "fastfetch"
    let i = 0;
    const typeCmd1 = () => {
      if (i <= cmd1Target.length) {
        setCmd1(cmd1Target.slice(0, i));
        i++;
        timeoutId = setTimeout(typeCmd1, 45);
      } else {
        // Reveal fastfetch Kitty icat image + system info line by line
        timeoutId = setTimeout(() => {
          setShowFastfetch(true);
          let line = 0;
          fetchInterval = setInterval(() => {
            line++;
            setVisibleFetchLines(line);
            if (line >= TOTAL_FETCH_STEPS) {
              clearInterval(fetchInterval);
              // Show second prompt after fastfetch finishes rendering
              timeoutId = setTimeout(() => {
                setShowPrompt2(true);
                let j = 0;
                const typeCmd2 = () => {
                  if (j <= cmd2Target.length) {
                    setCmd2(cmd2Target.slice(0, j));
                    j++;
                    timeoutId = setTimeout(typeCmd2, 38);
                  } else {
                    // Start AppImage progress bar
                    setShowProgress(true);
                    progInterval = setInterval(() => {
                      setProgress((prev) => {
                        if (prev >= 100) {
                          clearInterval(progInterval);
                          setIsDone(true);
                          timeoutId = setTimeout(() => {
                            finishImmediately();
                          }, 650);
                          return 100;
                        }
                        const step = Math.floor(Math.random() * 9) + 6;
                        return Math.min(prev + step, 100);
                      });
                    }, 38);
                  }
                };
                timeoutId = setTimeout(typeCmd2, 120);
              }, 140);
            }
          }, 32);
        }, 100);
      }
    };

    timeoutId = setTimeout(typeCmd1, 220);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(fetchInterval);
      clearInterval(progInterval);
    };
  }, [finishImmediately]);

  // Lock page scrolling only while intro loader is active; restore when closing
  useEffect(() => {
    if (!isVisible || isClosing) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isVisible, isClosing]);

  // Allow only Escape key to skip immediately; prevent browser default scroll on space/arrows only while active
  useEffect(() => {
    if (!isVisible || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishImmediately();
      } else if (
        e.key === " " ||
        e.key === "Spacebar" ||
        e.code === "Space" ||
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Home" ||
        e.key === "End"
      ) {
        // Prevent default browser scroll only while loading screen is active
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishImmediately, isVisible, isClosing]);

  if (!isVisible) return null;

  const statusText =
    progress < 35
      ? "mounting squashfs..."
      : progress < 75
      ? "loading ui modules..."
      : progress < 100
      ? "verifying security headers..."
      : "ready";

  const logoRevealPercent = Math.min(
    100,
    Math.round((visibleFetchLines / TOTAL_FETCH_STEPS) * 100)
  );

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F9FA]/85 dark:bg-[#0f1013]/85 backdrop-blur-xl p-4 select-none touch-none overscroll-none cursor-default transition-opacity duration-450 ease-out ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Hyprland Active Window Container with Animated Border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 22 }}
        animate={
          isClosing
            ? { opacity: 0, scale: 1.06, y: -12, filter: "blur(6px)" }
            : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl p-[2px] bg-gradient-to-br from-google-blue via-emerald-400 to-google-yellow shadow-[0_25px_70px_rgba(0,0,0,0.16)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.65)] cursor-default"
      >
        {/* Inner Kitty Terminal Window */}
        <div className="w-full rounded-[14px] bg-[#f2f4f8]/95 dark:bg-[#13151c]/95 text-zinc-800 dark:text-zinc-200 overflow-hidden font-mono text-xs sm:text-[13px]">
          {/* Kitty Tab Bar / Header */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#e3e6ed] dark:bg-[#0d0f14] border-b border-black/10 dark:border-white/10 select-none">
            {/* Left: Window Dots + Kitty Powerline Tabs */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EA4335] border border-black/20" />
                <span className="w-3 h-3 rounded-full bg-[#FBBC05] border border-black/20" />
                <span className="w-3 h-3 rounded-full bg-[#34A853] border border-black/20" />
              </div>

              {/* Active Kitty Tab Pill */}
              <div className="hidden sm:flex items-center gap-1 text-[11px]">
                <span className="px-2.5 py-0.5 rounded-md bg-google-blue text-white font-bold shadow-xs">
                  kitty • zsh ~/portfolio
                </span>
                <span className="px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-500">
                  2:hyprc
                </span>
              </div>
            </div>

            {/* Center: Host Title */}
            <div className="hidden md:block text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 truncate px-2">
              rayhan@c0mra1dddd — kitty
            </div>

            {/* Right: ESC Skip Hint */}
            <button
              onClick={finishImmediately}
              title="Skip (Esc)"
              className="text-[10px] font-mono text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              [ESC]
            </button>
          </div>

          {/* Kitty Terminal Screen Body */}
          <div className="p-4 sm:p-6 space-y-3.5 min-h-[310px] sm:min-h-[330px] flex flex-col justify-start">
            {/* Prompt 1: fastfetch */}
            <div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <span className="text-zinc-400">[</span>
                <span className="text-google-blue font-bold">rayhan</span>
                <span className="text-zinc-400">@</span>
                <span className="text-google-green font-bold">c0mra1dddd</span>
                <span className="text-zinc-400">]$</span>
                <span className="text-zinc-900 dark:text-white font-semibold">
                  {cmd1}
                </span>
                {!showFastfetch && (
                  <span className="inline-block w-2 h-4 bg-google-blue animate-pulse ml-0.5 shadow-[0_0_8px_#4285F4]" />
                )}
              </div>

              {/* Fastfetch Output Grid (Kitty icat BlackArch Logo + System Specs) */}
              {showFastfetch && (
                <div className="mt-3 flex flex-row items-center sm:items-start gap-4 sm:gap-6 pl-1">
                  {/* Left: BlackArch Katana Logo rendered via Kitty Graphics Protocol simulation */}
                  <div
                    className="relative w-24 h-36 sm:w-28 sm:h-40 shrink-0 transition-all duration-100 select-none pointer-events-none"
                    style={{
                      clipPath: `inset(0 0 ${100 - logoRevealPercent}% 0)`,
                    }}
                  >
                    <Image
                      src="/blackarch-logo.webp"
                      alt="BlackArch Linux Logo"
                      fill
                      priority
                      sizes="120px"
                      className="object-contain drop-shadow-[0_0_10px_rgba(66,133,244,0.65)]"
                    />
                  </div>

                  {/* Right: System Info Lines */}
                  <div className="space-y-0.5 text-[11px] sm:text-xs min-w-0 flex-1">
                    {visibleFetchLines >= 1 && (
                      <div className="font-bold">
                        <span className="text-google-blue">rayhan</span>
                        <span className="text-zinc-400">@</span>
                        <span className="text-google-green">c0mra1dddd</span>
                      </div>
                    )}
                    {visibleFetchLines >= 2 && (
                      <div className="text-zinc-400 dark:text-zinc-600 select-none">
                        ----------------------
                      </div>
                    )}
                    {FASTFETCH_INFO.slice(
                      0,
                      Math.max(0, visibleFetchLines - 1)
                    ).map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline gap-2"
                      >
                        <span
                          className={`font-bold ${item.color} min-w-[68px] sm:min-w-[74px]`}
                        >
                          {item.label}:
                        </span>
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate">
                          {item.value}
                        </span>
                      </div>
                    ))}

                    {/* ANSI Color Swatches Row */}
                    {visibleFetchLines >= TOTAL_FETCH_STEPS && (
                      <div className="pt-2 flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-zinc-900 dark:bg-zinc-700 inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-[#EA4335] inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-[#34A853] inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-[#FBBC05] inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-[#4285F4] inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-purple-500 inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-cyan-400 inline-block" />
                        <span className="w-3 h-3 rounded-xs bg-zinc-300 inline-block" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Prompt 2: ./portfolio.AppImage */}
            {showPrompt2 && (
              <div className="pt-1">
                <div className="flex items-center flex-wrap gap-x-1.5">
                  <span className="text-zinc-400">[</span>
                  <span className="text-google-blue font-bold">rayhan</span>
                  <span className="text-zinc-400">@</span>
                  <span className="text-google-green font-bold">c0mra1dddd</span>
                  <span className="text-zinc-400">]$</span>
                  <span className="text-zinc-900 dark:text-white font-semibold">
                    {cmd2}
                  </span>
                  {!showProgress && (
                    <span className="inline-block w-2 h-4 bg-google-blue animate-pulse ml-0.5 shadow-[0_0_8px_#4285F4]" />
                  )}
                </div>

                {/* Progress Bar & Status */}
                {showProgress && (
                  <div className="mt-2 space-y-1.5 pl-1">
                    <div className="flex items-center gap-3">
                      <div className="w-48 sm:w-64 h-2 bg-zinc-300 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-google-blue to-emerald-400 rounded-full transition-all duration-75 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                        {progress}%
                      </span>
                      <span className="hidden sm:inline text-[10px] text-zinc-400 dark:text-zinc-500">
                        ({statusText})
                      </span>
                    </div>

                    {/* Completion Line + New Prompt */}
                    <AnimatePresence>
                      {isDone && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-2 pt-1"
                        >
                          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                            <span>✓</span>
                            <span>done — welcome</span>
                          </div>

                          <div className="flex items-center gap-x-1.5">
                            <span className="text-zinc-400">[</span>
                            <span className="text-google-blue font-bold">
                              rayhan
                            </span>
                            <span className="text-zinc-400">@</span>
                            <span className="text-google-green font-bold">
                              c0mra1dddd
                            </span>
                            <span className="text-zinc-400">]$</span>
                            <span className="inline-block w-2 h-4 bg-zinc-800 dark:bg-zinc-200 animate-pulse ml-0.5" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
