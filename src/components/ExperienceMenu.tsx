"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FolderGit2, Cpu, Award, Terminal } from "lucide-react";

export type ExperienceTab = "projects" | "tech" | "certificates";

interface ExperienceMenuProps {
  onSelectTab: (tab: ExperienceTab) => void;
  onSkipToContent?: () => void;
}

const MENU_ITEMS = [
  {
    id: "projects" as ExperienceTab,
    num: "01",
    title: "PROJECTS",
    sub: "Web Apps, Security Tooling & Production Systems",
    tags: ["FULLSTACK", "NEXT.JS", "GO BACKEND", "SECURITY", "LINUX API"],
    count: "4 FEATURED",
    color: "var(--google-blue, #4285F4)",
    badgeBg: "bg-google-blue",
    icon: <FolderGit2 size={24} />,
  },
  {
    id: "tech" as ExperienceTab,
    num: "02",
    title: "TECH STACK",
    sub: "Languages, Frameworks, Databases & Pentest Suites",
    tags: ["TYPESCRIPT", "GO", "DOCKER", "POSTGRESQL", "BURP SUITE", "ARCH LINUX"],
    count: "20+ TOOLS",
    color: "var(--google-green, #34A853)",
    badgeBg: "bg-google-green",
    icon: <Cpu size={24} />,
  },
  {
    id: "certificates" as ExperienceTab,
    num: "03",
    title: "CERTIFICATES",
    sub: "Verified Credentials, Competitions & Security Badges",
    tags: ["GOOGLE GDG", "DICODING", "CYBERSECURITY", "VOCATIONAL HONORS"],
    count: "10+ CREDENTIALS",
    color: "var(--google-yellow, #FBBC05)",
    badgeBg: "bg-google-yellow",
    icon: <Award size={24} />,
  },
];

const GLYPHS = "ABCDEF0123456789!@#$%^&*<>~_=";

function ScrambleText({
  text,
  isHovered,
}: {
  text: string;
  isHovered: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}

export default function ExperienceMenu({
  onSelectTab,
  onSkipToContent,
}: ExperienceMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full py-6 md:py-12"
    >
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b-2 border-black dark:border-zinc-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
            SYSTEM DIRECTORY // SELECT WORKSPACE
          </span>
        </div>
        {onSkipToContent && (
          <button
            onClick={onSkipToContent}
            className="text-xs font-mono font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            [ Skip to all projects ↗ ]
          </button>
        )}
      </div>

      {/* Vertical Typographic Menu List (Sesuai Referensi Video) */}
      <div className="flex flex-col space-y-2 md:space-y-4">
        {MENU_ITEMS.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => onSelectTab(item.id)}
              className={`group relative cursor-pointer rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border-2 select-none overflow-hidden ${
                isHovered
                  ? "bg-white/95 dark:bg-zinc-950 text-zinc-950 dark:text-white border-black dark:border-zinc-600 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.15)] backdrop-blur-sm translate-x-1 sm:translate-x-3"
                  : "bg-zinc-100/70 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 border-transparent hover:border-black/20 dark:hover:border-zinc-800"
              }`}
            >
              {/* Left Accent Bar on Hover */}
              {isHovered && (
                <motion.div
                  layoutId="menuAccentBar"
                  className="absolute left-0 top-0 bottom-0 w-2"
                  style={{ backgroundColor: item.color }}
                />
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
                {/* Bagian Kiri: Nomor Indeks + Huruf Berjalan / Scramble */}
                <div className="flex items-baseline gap-4 sm:gap-6">
                  {/* Nomor Indeks */}
                  <span
                    className={`font-mono text-sm sm:text-lg font-black transition-colors ${
                      isHovered ? "text-google-blue font-bold" : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    /{item.num}
                  </span>

                  {/* Judul Utama dengan Animasi Decrypt Scramble */}
                  <h3
                    className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-heading transition-colors duration-200 ${
                      isHovered
                        ? "text-zinc-950 dark:text-white drop-shadow-xs dark:drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    <ScrambleText text={item.title} isHovered={isHovered} />
                  </h3>
                </div>

                {/* Bagian Kanan: Subtitle, Tag & Ticker Ribbon */}
                <div className="flex items-center gap-4 lg:gap-8 justify-between lg:justify-end">
                  {/* Jumlah item counter badge */}
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                      isHovered
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000]"
                        : "bg-zinc-200/60 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500 border-transparent"
                    }`}
                  >
                    {item.count}
                  </span>

                  {/* Tombol Panah Buka Workspace */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "bg-google-blue text-white border-black shadow-[3px_3px_0px_#000] rotate-45 scale-110"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <ArrowUpRight size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>

              {/* Ticker / Running Ribbon Tags saat Hover (Efek Huruf Berjalan Tambahan) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                      <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest shrink-0 flex items-center gap-1.5">
                        <Terminal size={12} className="text-google-blue" />
                        TAGS:
                      </span>
                      {/* Running Ticker Marquee */}
                      <div className="flex animate-marquee gap-3 w-max">
                        {item.tags.concat(item.tags).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black/15 dark:border-zinc-700 shadow-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Helper */}
      <div className="mt-8 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-500">
        <span className="hidden sm:inline">TIP: CLICK ANY WORKSPACE TO ENTER</span>
        <span className="ml-auto">RAYHAN.ACKTEAMS // ARCH V2.4</span>
      </div>
    </motion.div>
  );
}
