"use client";

import { Code2, Mail, ShieldCheck } from "lucide-react";
import Lanyard from "./Lanyard";

interface HeroProps {
  showContent?: boolean;
  onNavigateSection?: (href: string) => void;
}

export default function Hero({
  onNavigateSection,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-visible pt-24 pb-12"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="w-full lg:w-2/3 flex flex-col items-start gap-5">

            {/* Primary Heading */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono font-bold tracking-widest text-google-blue">
                c0mraidddd // SOFTWARE ENGINEERING &amp; CYBERSECURITY
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                Rayhan Arie Fahreza
              </h1>
            </div>

            {/* Concise Bio */}
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed text-left font-normal">
              Software Engineering student at{" "}
              <strong className="font-bold text-zinc-900 dark:text-white">
                SMK Plus Pelita Nusantara Bogor
              </strong>{" "}
              and member of{" "}
              <strong className="font-bold text-zinc-900 dark:text-white">
                Acknowledge Teams
              </strong>
              . I engineer full-stack web applications with{" "}
              <span className="font-semibold text-google-blue">Next.js</span> &amp;{" "}
              <span className="font-semibold text-google-blue">Go (Golang)</span>,
              while actively competing in CTFs and auditing web vulnerabilities from my{" "}
              <span className="font-mono text-sm font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-black/20 dark:border-zinc-700">
                Arch + Hyprland
              </span>{" "}
              setup.
            </p>

            {/* Quick Proof Badges (Always on 1 line) */}
            <div className="flex flex-nowrap items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/90 shadow-[2px_2px_0px_#000] shrink-0 whitespace-nowrap">
                <ShieldCheck size={14} className="text-google-red shrink-0" />
                Top 10 Clash of Cyber Telkom Univ (fsociety)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/90 shadow-[2px_2px_0px_#000] shrink-0 whitespace-nowrap">
                Go Backend Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/90 shadow-[2px_2px_0px_#000] shrink-0 whitespace-nowrap">
                XSS &amp; Recon Auditing
              </span>
            </div>

            {/* Neo-Brutalist Call-To-Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <a
                href="#work"
                onClick={(e) => {
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection("#work");
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-google-blue text-white border-2 border-black dark:border-zinc-700 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                <Code2 size={18} />
                Explore Projects
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection("#contact");
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                <Mail size={18} />
                Let&apos;s Connect
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D ID Lanyard (Hidden on mobile, only visible on desktop lg+) */}
          <div className="hidden lg:flex justify-center lg:w-1/3 shrink-0 overflow-visible">
            <Lanyard />
          </div>
        </div>
      </div>
    </section>
  );
}
