"use client";

import { useRef, useState, useCallback } from "react";
import { animate, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

/**
 * Lanyard: Interactive 3D Neo-Brutalist ID Card with Google GDG Holographic Sheen.
 * 100% aligned with the site's Neo-Brutalist & Google brand color palette.
 */
export default function Lanyard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { canAnimateHeavy, reducedMotion } = useDevicePerformance();
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for physical 2D translation (dragging & strap tension)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Motion values for 3D card tilt (-1 to 1 range)
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);

  // Physics spring configuration for smooth, realistic inertia
  const tiltSpringConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const smoothTiltX = useSpring(rawTiltX, tiltSpringConfig);
  const smoothTiltY = useSpring(rawTiltY, tiltSpringConfig);

  // 3D rotation angles derived from spring values
  const rotateX = useTransform(smoothTiltY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothTiltX, [-1, 1], [-15, 15]);

  // Dynamic light & holographic sheen positions matching Google 4-color foil
  const lightPositionX = useTransform(smoothTiltX, [-1, 1], ["15%", "85%"]);
  const lightPositionY = useTransform(smoothTiltY, [-1, 1], ["15%", "85%"]);
  const foilTranslateX = useTransform(smoothTiltX, [-1, 1], ["-40%", "40%"]);

  // Strap anchor point: x = 150, y = 20 (top rivet pin)
  // Strap target point: x = 150 + dragX, y = 116 + dragY (card clip)
  const leftStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const xNum = typeof x === "number" ? x : 0;
    const yNum = typeof y === "number" ? y : 0;
    const startX = 144;
    const startY = 20;
    const targetX = 146 + xNum;
    const targetY = 116 + yNum;

    const cp1X = startX + xNum * 0.12;
    const cp1Y = startY + 35;
    const cp2X = startX + xNum * 0.72;
    const cp2Y = targetY - 25;
    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  });

  const rightStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const xNum = typeof x === "number" ? x : 0;
    const yNum = typeof y === "number" ? y : 0;
    const startX = 156;
    const startY = 20;
    const targetX = 154 + xNum;
    const targetY = 116 + yNum;

    const cp1X = startX + xNum * 0.12;
    const cp1Y = startY + 35;
    const cp2X = startX + xNum * 0.72;
    const cp2Y = targetY - 25;
    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  });

  const centerStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const xNum = typeof x === "number" ? x : 0;
    const yNum = typeof y === "number" ? y : 0;
    const startX = 150;
    const startY = 20;
    const targetX = 150 + xNum;
    const targetY = 116 + yNum;

    const cp1X = startX + xNum * 0.12;
    const cp1Y = startY + 35;
    const cp2X = startX + xNum * 0.72;
    const cp2Y = targetY - 25;
    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
  });

  // Dynamic roll derived from horizontal drag momentum
  const dragRoll = useTransform(dragX, [-220, 0, 220], [-18, 0, 18]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current || isDragging || reducedMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      rawTiltX.set(Math.max(-1, Math.min(1, normalizedX)));
      rawTiltY.set(Math.max(-1, Math.min(1, normalizedY)));
    },
    [isDragging, reducedMotion, rawTiltX, rawTiltY]
  );

  const handlePointerLeave = useCallback(() => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }, [rawTiltX, rawTiltY]);

  return (
    <div className="flex flex-col items-center select-none relative w-[310px] mx-auto min-h-[490px] overflow-visible">
      {/* 1. Realistic Rivet Pin Anchor */}
      <div className="absolute top-[20px] left-[150px] -translate-x-1/2 -translate-y-1/2 z-40 w-7 h-7 flex items-center justify-center pointer-events-none">
        <div className="w-6 h-6 rounded-full border-2 border-black dark:border-zinc-700 bg-linear-to-b from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900 shadow-md flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-inner" />
        </div>
      </div>

      {/* 2. Soft Pendulum Oscillation */}
      <motion.div
        animate={
          canAnimateHeavy && !isDragging
            ? { rotateZ: [-1.4, 1.4, -1.4] }
            : { rotateZ: 0 }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "150px 20px" }}
        className="relative w-full h-full flex flex-col items-center overflow-visible"
      >
        {/* SVG Lanyard Strap with subtle Google colored stitching */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          <svg
            width="300"
            height="480"
            viewBox="0 0 300 480"
            className="overflow-visible"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
          >
            {/* Left Strap Ribbon */}
            <motion.path
              d={leftStrapPath}
              stroke="#18181b"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right Strap Ribbon */}
            <motion.path
              d={rightStrapPath}
              stroke="#27272a"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Clean Contrast Stitch Line */}
            <motion.path
              d={centerStrapPath}
              stroke="#71717a"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* 3. Draggable ID Card */}
        <motion.div
          drag
          dragConstraints={{ top: -60, left: -220, right: 220, bottom: 180 }}
          dragElastic={0.18}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            animate(dragX, 0, { type: "spring", stiffness: 280, damping: 22 });
            animate(dragY, 0, { type: "spring", stiffness: 280, damping: 22 });
            rawTiltX.set(0);
            rawTiltY.set(0);
          }}
          whileDrag={{ scale: 1.04, cursor: "grabbing" }}
          style={{
            x: dragX,
            y: dragY,
            rotateZ: dragRoll,
            cursor: "grab",
            top: "116px",
          }}
          className="absolute z-30 flex flex-col items-center overflow-visible"
        >
          {/* Metal Badge Clip */}
          <div className="flex flex-col items-center z-40 -mb-2 pointer-events-none">
            <div className="w-5 h-3 bg-zinc-900 border border-black rounded-xs shadow-xs" />
            <div className="w-4 h-4 rounded-full border-2 border-zinc-400 bg-transparent -mt-1 shadow-xs" />
            <div className="w-6 h-3 bg-zinc-700 border border-black rounded-sm -mt-1 shadow-sm" />
          </div>

          {/* 3D Tilt Container */}
          <div
            style={{ perspective: 1000 }}
            className="relative flex flex-col items-center"
          >
            {/* Punch Slot Badge Hole */}
            <div className="w-10 h-3.5 bg-white dark:bg-zinc-800 rounded-full border-2 border-black dark:border-zinc-700 shadow-inner flex items-center justify-center -mb-2 z-40 pointer-events-none">
              <div className="w-6 h-1.5 bg-zinc-900 dark:bg-zinc-950 rounded-full" />
            </div>

            {/* Neo-Brutalist White Card Frame */}
            <motion.div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                rotateX: reducedMotion ? 0 : rotateX,
                rotateY: reducedMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-56 h-[335px] rounded-2xl border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#000] overflow-hidden group cursor-grab active:cursor-grabbing"
            >
              {/* Inner Card Container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 flex flex-col justify-between">
                
                {/* Photo Layer */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/Foto-Profil-Github.jpeg"
                    alt="Rayhan Arie Fahreza"
                    fill
                    className="object-cover object-[center_25%] select-none pointer-events-none"
                    draggable={false}
                    unoptimized
                    priority
                  />

                  {/* Dynamic Google-Brand Holographic Sheen (Foil Reflection) */}
                  <motion.div
                    style={{
                      x: foilTranslateX,
                      transform: "translateZ(30px)",
                    }}
                    className="pointer-events-none absolute inset-[-50%] z-20 mix-blend-color-dodge opacity-30 dark:opacity-40 rotate-25"
                  >
                    <div className="w-full h-full bg-[linear-gradient(115deg,transparent_20%,rgba(66,133,244,0.35)_35%,rgba(234,67,53,0.3)_45%,rgba(251,188,5,0.35)_55%,rgba(52,168,83,0.3)_65%,transparent_80%)]" />
                  </motion.div>

                  {/* Radial Smooth Glass Reflection Light following the pointer */}
                  <motion.div
                    style={{
                      left: lightPositionX,
                      top: lightPositionY,
                      transform: "translateZ(35px)",
                    }}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-44 h-44 z-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,transparent_65%)] mix-blend-overlay"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
