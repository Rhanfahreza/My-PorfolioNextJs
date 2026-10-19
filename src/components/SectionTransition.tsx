"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export type TransitionType =
  | "slide-up"
  | "slide-down"
  | "split-outward"
  | "split-inward";

export interface TransitionPayload {
  type: TransitionType;
  fromHref: string;
  targetHref: string;
}

interface SectionTransitionProps {
  payload: TransitionPayload | null;
  onFinish: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  "#home": "Home",
  "#about": "About",
  "#work": "Experience",
  "#contact": "Contact",
};

const GOOGLE_BANDS = [
  { color: "bg-google-blue", delay: 0 },
  { color: "bg-google-red", delay: 0.05 },
  { color: "bg-google-yellow", delay: 0.1 },
  { color: "bg-google-green", delay: 0.15 },
];

/**
 * SectionTransition: Google I/O Kinetic Color Bands.
 * Features 4 staggered Google brand color stripes in Neo-Brutalist style.
 * 100% aligned with the website's color palette and design system.
 */
export default function SectionTransition({
  payload,
  onFinish,
}: SectionTransitionProps) {
  const { reducedMotion } = useDevicePerformance();
  const [phase, setPhase] = useState<"entering" | "holding" | "exiting">("entering");

  const scrollToTarget = (href: string) => {
    if (typeof window === "undefined") return;
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const targetEl = document.querySelector(href) as HTMLElement | null;
    if (targetEl) {
      const top = targetEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "instant" });
    }
  };

  useEffect(() => {
    if (!payload) return;

    if (reducedMotion) {
      scrollToTarget(payload.targetHref);
      onFinish();
      return;
    }

    setPhase("entering");

    // Phase 1: Screen fully covered after 360ms -> instantaneous scroll
    const holdTimer = setTimeout(() => {
      scrollToTarget(payload.targetHref);
      setPhase("exiting");
    }, 380);

    // Phase 2: Exit complete after 740ms -> finish & unmount
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 740);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(finishTimer);
    };
  }, [payload, onFinish, reducedMotion]);

  if (!payload || reducedMotion) return null;

  const targetLabel = SECTION_LABELS[payload.targetHref] || "Portfolio";
  const easeCurve = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
      {/* 4 Staggered Google Color Stripes */}
      <div className="w-full h-full flex flex-col pointer-events-auto">
        {GOOGLE_BANDS.map((band, idx) => (
          <motion.div
            key={idx}
            initial={{ x: "-100%" }}
            animate={
              phase === "entering"
                ? { x: "0%" }
                : { x: "100%" }
            }
            transition={{
              duration: 0.34,
              delay: phase === "entering" ? band.delay : (3 - idx) * 0.04,
              ease: easeCurve,
            }}
            className={`flex-1 w-full ${band.color} border-y border-black dark:border-zinc-800 shadow-md relative`}
          />
        ))}
      </div>

      {/* Center Neo-Brutalist Badge with Google Colors */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          phase === "entering"
            ? { scale: 1, opacity: 1 }
            : { scale: 0.9, opacity: 0 }
        }
        transition={{ duration: 0.25, ease: easeCurve }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
      >
        <div className="px-6 py-3 bg-white dark:bg-zinc-900 border-3 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-google-blue" />
            <span className="w-2.5 h-2.5 rounded-full bg-google-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-google-yellow" />
            <span className="w-2.5 h-2.5 rounded-full bg-google-green" />
          </div>
          <span className="font-sans font-black text-sm uppercase tracking-wider text-black dark:text-white">
            {targetLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
