"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function Lanyard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Koordinat posisi drag kartu ID Card berbasis motion value Framer Motion
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Perhitungan path kurva Bezier SVG dinamis untuk tali sebelah kiri.
  // Titik jangkar (anchor) tali berada di posisi atas (x = 100, y = -144).
  // Titik hubung pada kartu bergerak mengikuti posisi drag (x = 100 + dragX, y = 122 + dragY).
  // Menggunakan rumus kurva Bezier agar kelengkungan tali merespons gerakan tarik (drag) secara alami.
  const leftStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const targetX = 100 + (x as number);
    const targetY = 122 + (y as number);
    // Lengkungan kurva tali kiri yang berawal dari koordinat atas y = -144
    return `M 94 -144 C 94 -60, ${96 + (x as number) * 0.3} ${70 + (y as number) * 0.3}, ${targetX} ${targetY}`;
  });

  const rightStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const targetX = 100 + (x as number);
    const targetY = 122 + (y as number);
    // Lengkungan kurva tali kanan yang berawal dari koordinat atas y = -144
    return `M 106 -144 C 106 -60, ${104 + (x as number) * 0.3} ${70 + (y as number) * 0.3}, ${targetX} ${targetY}`;
  });

  // Path SVG dinamis khusus untuk pergerakan teks di sepanjang tali
  const textStrapPath = useTransform([dragX, dragY], ([x, y]) => {
    const targetX = 100 + (x as number);
    const targetY = 122 + (y as number);
    return `M 94 -144 C 94 -60, ${96 + (x as number) * 0.3} ${70 + (y as number) * 0.3}, ${targetX} ${targetY}`;
  });

  useEffect(() => {
    // Alur animasi masuk (entrance) diikuti efek ayunan lembut (pendulum idle) saat komponen dimuat
    const sequence = async () => {
      // Efek jatuh/masuk dari atas dengan redaman pegas (spring physics) menyerupai bandul nyata
      await controls.start({
        y: [-600, 0],
        rotateZ: [55, 0],
        transition: {
          y: { type: "spring", stiffness: 90, damping: 12, mass: 1.4 },
          rotateZ: { type: "spring", stiffness: 35, damping: 3, mass: 1.5 },
          duration: 3.5,
        },
      });

      // Loop konstan untuk animasi ayunan santai saat diam (idle swinging)
      while (true) {
        await controls.start({
          rotateZ: 2,
          x: 5,
          transition: { duration: 3, ease: "easeInOut" },
        });
        await controls.start({
          rotateZ: -2,
          x: -5,
          transition: { duration: 3, ease: "easeInOut" },
        });
      }
    };
    sequence();
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 15;
    const rotateX = -((e.clientY - centerY) / rect.height) * 15;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="flex flex-col items-center select-none pt-4 relative min-h-125">
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-3 border-zinc-700 dark:border-zinc-400 bg-zinc-200 dark:bg-zinc-800 shadow-md" />
        <div className="absolute w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-100" />
      </div>

      {/* Kanvas SVG untuk merender tali dinamis (menghubungkan pengait atas hingga ke kartu ID) */}
      <div className="absolute inset-0 pointer-events-none z-20 flex justify-center">
        <svg
          width="200"
          height="470"
          viewBox="0 -150 200 470"
          className="overflow-visible"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
        >
          <defs>
            {/* Mengikat elemen path SVG dinamis sebagai lintasan berjalannya teks */}
            <motion.path id="dynamicTextPath" d={textStrapPath} />
          </defs>

          {/* Tali fisik realistis dua lapis berwarna gelap */}
          <motion.path
            d={leftStrapPath}
            stroke="#18181b"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            d={rightStrapPath}
            stroke="#27272a"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />

          {/* Garis jahitan (detail serabut) di bagian tengah tali */}
          <motion.path
            d={leftStrapPath}
            stroke="#3f3f46"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 4"
          />

          {/* Render Teks Berjalan Mengikuti Lintasan Path: "LANYARD 3D" */}
          <text fill="#ffffff" fontSize="7" fontWeight="bold" letterSpacing="1">
            <textPath href="#dynamicTextPath" startOffset="45%">
              LANYARD 3D • LANYARD 3D
            </textPath>
          </text>
        </svg>
      </div>

      <motion.div
        drag
        dragSnapToOrigin={true}
        dragConstraints={{ top: -40, left: -100, right: 100, bottom: 150 }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        style={{
          x: dragX,
          y: dragY,
          transformOrigin: "top center",
          cursor: "grab",
          marginTop: "135px",
        }}
        animate={controls}
        className="relative z-30"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
          style={{
            transition: "transform 0.1s ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Pengait Klip Kartu (Penghubung antara tali dan kartu ID) */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 flex flex-col items-center z-40">
            {/* Konektor Plastik */}
            <div className="w-5 h-4 bg-zinc-800 rounded-sm border border-zinc-700" />
            {/* Cincin Logam */}
            <div className="w-4 h-4 rounded-full border-2 border-zinc-400 bg-transparent -mt-1" />
          </div>

          {/* Lubang punch pada kartu untuk pengait */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/60 backdrop-blur-md rounded-full z-40 flex items-center justify-center border border-white/30 shadow-sm">
            <div className="w-5 h-1.5 bg-black/30 rounded-full" />
          </div>

          {/* Bingkai Kartu (Tempat holder plastik warna putih) */}
          <div
            className="w-52.5 h-78.75 bg-white dark:bg-zinc-100 rounded-2xl border-4 border-white dark:border-zinc-200 p-1 shadow-2xl"
            style={{
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Konten Utama Dalam (Foto Profil Penuh) */}
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
          </div>

          {/* Efek Kilatan Pantulan Cahaya Kaca (Realistic Glass Reflection) */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded-2xl" />
        </div>
      </motion.div>
    </div>
  );
}
