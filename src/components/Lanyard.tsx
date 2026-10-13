"use client";

import { useRef, useState, useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export default function Lanyard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { canAnimateHeavy } = useDevicePerformance();
  const [isDragging, setIsDragging] = useState(false);

  // Motion values yang secara langsung mengikat posisi kartu dan ujung tali
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Titik jangkar atas: x = 150, y = 20 (tepat di tengah pin gantungan)
  // Ujung bawah tali: x = 150 + dragX, y = 116 + dragY (tepat di pengait klip kartu)
  const leftStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const xNum = x as number;
    const yNum = y as number;
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
    const xNum = x as number;
    const yNum = y as number;
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
    const xNum = x as number;
    const yNum = y as number;
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

  // Rotasi dinamis kartu saat ditarik mengikuti arah tarikan
  const cardRotate = useTransform(dragX, [-200, 0, 200], [-18, 0, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimateHeavy || isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 14;
    const rotateX = -((e.clientY - centerY) / rect.height) * 14;
    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="flex flex-col items-center select-none relative w-[300px] mx-auto min-h-[480px] overflow-visible">
      {/* 1. Titik Paku / Rivet Pin Gantungan Atas yang Realistis */}
      <div className="absolute top-[20px] left-[150px] -translate-x-1/2 -translate-y-1/2 z-40 w-7 h-7 flex items-center justify-center">
        {/* Ring Luar Metalik */}
        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 dark:border-zinc-300 bg-linear-to-b from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900 shadow-md flex items-center justify-center">
          {/* Rivet Lubang Dalam */}
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-inner" />
        </div>
      </div>

      {/* 2. Kontainer Ayunan Pendulum Lembut (Berporos Tepat di Lubang Pin Atas) */}
      <motion.div
        animate={
          canAnimateHeavy && !isDragging
            ? { rotateZ: [-1.4, 1.4, -1.4] }
            : { rotateZ: 0 }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "150px 20px" }}
        className="relative w-full h-full flex flex-col items-center overflow-visible"
      >
        {/* Kanvas SVG: Tali Lanyard Realistis Langsung Terhubung ke Klip */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
          <svg
            width="300"
            height="480"
            viewBox="0 0 300 480"
            className="overflow-visible"
            style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.25))" }}
          >
            {/* Pita Tali Kiri */}
            <motion.path
              d={leftStrapPath}
              stroke="#18181b"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Pita Tali Kanan */}
            <motion.path
              d={rightStrapPath}
              stroke="#27272a"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />

            {/* Garis Jahitan Tali Realistis di Tengah */}
            <motion.path
              d={centerStrapPath}
              stroke="#52525b"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* 3. Kartu ID Badge Draggable (Terkunci Sempurna dengan Ujung Tali) */}
        <motion.div
          drag
          dragConstraints={{ top: -70, left: -240, right: 240, bottom: 200 }}
          dragElastic={0.18}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            animate(dragX, 0, { type: "spring", stiffness: 280, damping: 22 });
            animate(dragY, 0, { type: "spring", stiffness: 280, damping: 22 });
            if (cardRef.current) {
              cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
            }
          }}
          whileDrag={{ scale: 1.04, cursor: "grabbing" }}
          style={{
            x: dragX,
            y: dragY,
            rotateZ: cardRotate,
            cursor: "grab",
            top: "116px",
          }}
          className="absolute z-30 flex flex-col items-center overflow-visible"
        >
          {/* Elemen Pengait Fisik Realistis (Klip Logam + Pengikat Pita) */}
          <div className="flex flex-col items-center z-40 -mb-2">
            {/* Crimp clamp penjepit pita tali */}
            <div className="w-5 h-3 bg-zinc-900 border border-zinc-700 rounded-xs shadow-xs" />
            {/* Ring logam oval */}
            <div className="w-4 h-4 rounded-full border-2 border-zinc-400 bg-transparent -mt-1 shadow-xs" />
            {/* Klip kait logam ke lubang kartu */}
            <div className="w-6 h-3 bg-zinc-700 border border-zinc-500 rounded-sm -mt-1 shadow-sm" />
          </div>

          {/* Kartu ID Card dengan 3D tilt */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex flex-col items-center"
            style={{
              transition: "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Lubang punch slot badge */}
            <div className="w-10 h-3.5 bg-white/70 dark:bg-zinc-800/80 backdrop-blur-md rounded-full border border-black/20 dark:border-white/20 shadow-inner flex items-center justify-center -mb-2 z-40">
              <div className="w-6 h-1.5 bg-zinc-800 dark:bg-black rounded-full" />
            </div>

            {/* Holder Bingkai Kartu ID Bergaya Neo-Brutalisme */}
            <div
              className="w-52.5 h-78.75 bg-white dark:bg-zinc-100 rounded-2xl border-4 border-black dark:border-zinc-800 p-1 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] relative"
            >
              {/* Foto Profil Penuh Bersih (Tanpa Teks) */}
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-zinc-200 dark:bg-zinc-300">
                <Image
                  src="/Foto-Profil-Github.jpeg"
                  alt="Rayhan Photo"
                  fill
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                  unoptimized
                  priority
                />
              </div>

              {/* Efek Kilatan Kaca Glossy */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-2xl" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
