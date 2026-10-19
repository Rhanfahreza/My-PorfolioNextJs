"use client";

import { useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

/**
 * GdgBackground: Clean Neo-Brutalist Grid with Spatial Parallax for GDG Symbols.
 * Perfectly harmonized with Google Brand Colors (Blue, Red, Yellow, Green).
 */
export default function GdgBackground() {
  const { canAnimateHeavy, reducedMotion } = useDevicePerformance();

  // Pointer position normalized (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics for floating elements parallax
  const springConfig = { damping: 30, stiffness: 100, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Multi-layered Parallax offsets (different depths for 3D feel)
  const parallaxX1 = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxY1 = useTransform(smoothMouseY, [-1, 1], [-25, 25]);

  const parallaxX2 = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const parallaxY2 = useTransform(smoothMouseY, [-1, 1], [30, -30]);

  const parallaxX3 = useTransform(smoothMouseX, [-1, 1], [-18, 18]);
  const parallaxY3 = useTransform(smoothMouseY, [-1, 1], [18, -18]);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (reducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    },
    [reducedMotion, mouseX, mouseY]
  );

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove, reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-background transition-colors duration-200">
      {/* 1. Crisp Dot Matrix Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. GDG Geometric Shapes with Subtle Parallax */}

      {/* Google Blue Open Bracket `<` */}
      <motion.div
        style={{
          x: canAnimateHeavy ? parallaxX1 : 0,
          y: canAnimateHeavy ? parallaxY1 : 0,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          canAnimateHeavy
            ? { opacity: 0.15, scale: 1, y: [0, -15, 0] }
            : { opacity: 0.15, scale: 1 }
        }
        transition={
          canAnimateHeavy
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue select-none hidden lg:block"
      >
        &lt;
      </motion.div>

      {/* Google Red Slash `/` */}
      <motion.div
        style={{
          x: canAnimateHeavy ? parallaxX2 : 0,
          y: canAnimateHeavy ? parallaxY2 : 0,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          canAnimateHeavy
            ? { opacity: 0.15, scale: 1, y: [0, 15, 0] }
            : { opacity: 0.15, scale: 1 }
        }
        transition={
          canAnimateHeavy
            ? { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }
            : { duration: 0.3 }
        }
        className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red select-none hidden lg:block"
      >
        /
      </motion.div>

      {/* Google Yellow Orbit Ring */}
      <motion.div
        style={{
          x: canAnimateHeavy ? parallaxX3 : 0,
          y: canAnimateHeavy ? parallaxY3 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={
          canAnimateHeavy
            ? { opacity: 0.12, rotate: [0, 180, 360] }
            : { opacity: 0.12 }
        }
        transition={
          canAnimateHeavy
            ? { duration: 25, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
        className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow hidden lg:block"
      />

      {/* Google Green Close Bracket `>` */}
      <motion.div
        style={{
          x: canAnimateHeavy ? parallaxX1 : 0,
          y: canAnimateHeavy ? parallaxY1 : 0,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          canAnimateHeavy
            ? { opacity: 0.15, scale: 1, y: [0, -20, 0] }
            : { opacity: 0.15, scale: 1 }
        }
        transition={
          canAnimateHeavy
            ? { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
            : { duration: 0.3 }
        }
        className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green select-none hidden lg:block"
      >
        &gt;
      </motion.div>

      {/* Subtle Coding Ornaments in Brand Colors */}
      <motion.div
        style={{
          x: canAnimateHeavy ? parallaxX2 : 0,
          y: canAnimateHeavy ? parallaxY3 : 0,
        }}
        className="absolute bottom-[40%] right-[25%] font-mono text-5xl font-extrabold text-google-yellow opacity-10 select-none hidden md:block"
      >
        {"{}"}
      </motion.div>
      <div className="absolute top-[35%] left-[40%] font-mono text-6xl font-black text-google-green opacity-5 select-none hidden md:block">
        +
      </div>
      <div className="absolute bottom-[15%] left-[30%] font-mono text-7xl font-black text-google-yellow opacity-10 select-none hidden md:block">
        ;
      </div>
    </div>
  );
}
