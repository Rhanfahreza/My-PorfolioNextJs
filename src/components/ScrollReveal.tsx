"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  scale?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

/**
 * ScrollReveal: High-performance scroll-triggered entrance wrapper.
 * - Elements remain hidden until scrolled into the viewport.
 * - Triggers smooth GPU-accelerated entrance with customizable stagger.
 * - Automatically falls back to immediate visibility when prefers-reduced-motion is active.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  duration = 0.65,
  className = "",
  scale = 1,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const { reducedMotion } = useDevicePerformance();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsetDirections = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = offsetDirections[direction] || offsetDirections.up;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
