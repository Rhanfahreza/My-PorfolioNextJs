"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

export default function SectionTransition({
  payload,
  onFinish,
}: SectionTransitionProps) {
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Refs untuk slide lama (yang sedang ditutup) dan slide baru (yang sedang dibuka)
  const oldContentRef = useRef<HTMLDivElement>(null);
  const newContentRef = useRef<HTMLDivElement>(null);

  // Refs untuk split doors (belah dua)
  const leftDoorContentRef = useRef<HTMLDivElement>(null);
  const rightDoorContentRef = useRef<HTMLDivElement>(null);

  // Helper untuk menduplikasi node DOM seksi target dengan presisi 100%
  const populateClone = (container: HTMLElement | null, sourceSelector: string) => {
    if (!container) return;
    const sourceEl = document.querySelector(sourceSelector) as HTMLElement | null;
    if (!sourceEl) return;

    container.innerHTML = "";
    const clone = sourceEl.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));

    // Pastikan semua elemen yang memiliki kelas transisi tampil 100% jelas di clone
    clone.classList.remove("opacity-0", "pointer-events-none", "translate-y-4", "translate-y-8");
    clone.classList.add("opacity-100", "translate-y-0");
    clone.querySelectorAll(".opacity-0").forEach((el) => {
      el.classList.remove("opacity-0", "pointer-events-none", "translate-y-4", "translate-y-8");
      el.classList.add("opacity-100", "translate-y-0");
    });

    container.appendChild(clone);
  };

  const scrollToTarget = (href: string) => {
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

    if (payload.type === "slide-up" || payload.type === "slide-down") {
      // Isi slide lama (yang mau ditutup) dan slide baru (yang mau dibuka) secara bersamaan
      populateClone(oldContentRef.current, payload.fromHref);
      populateClone(newContentRef.current, payload.targetHref);
    } else if (payload.type === "split-outward" || payload.type === "split-inward") {
      const sourceSelector =
        payload.type === "split-outward" ? payload.fromHref : payload.targetHref;
      populateClone(leftDoorContentRef.current, sourceSelector);
      populateClone(rightDoorContentRef.current, sourceSelector);

      if (payload.type === "split-outward") {
        // Untuk split-outward, tepat sebelum pintu membelah ke samping,
        // halaman di belakang pintu diam-diam langsung diposisikan ke target tujuan
        scrollToTarget(payload.targetHref);
      }
    }
  }, [payload]);

  if (!payload) return null;

  // Easing kurva halus dan mantap bergaya presentasi desktop (Hyprland Wayland compositor)
  const easeSmooth = [0.16, 1, 0.3, 1] as const;

  const handleComplete = () => {
    if (!payload) return;
    if (payload.type !== "split-outward") {
      scrollToTarget(payload.targetHref);
    }
    onFinishRef.current();
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-auto overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 1. SLIDE UP (PUSH UP: Slide lama naik ke atas, slide baru naik dr bawah) */}
      {/* ------------------------------------------------------------------ */}
      {payload.type === "slide-up" && (
        <>
          {/* Slide Lama: Awal 0%, bergerak serempak ke atas menuju -100% */}
          <motion.div
            key="slide-up-old"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: easeSmooth }}
            className="absolute inset-0 bg-[#F8F9FA] dark:bg-[#0f1013] overflow-hidden z-30"
          >
            {/* GDG Background Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue opacity-15 select-none hidden lg:block">
                &lt;
              </div>
              <div className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red opacity-15 select-none hidden lg:block">
                /
              </div>
              <div className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow opacity-12 hidden lg:block" />
              <div className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green opacity-15 select-none hidden lg:block">
                &gt;
              </div>
            </div>

            {/* Kontainer Isi Slide Lama */}
            <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
              <div
                ref={oldContentRef}
                className="w-full h-full overflow-hidden pointer-events-none relative"
              />
            </div>
          </motion.div>

          {/* Slide Baru: Awal 100% (di bawah), bergerak serempak ke atas menuju 0% */}
          <motion.div
            key="slide-up-new"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, ease: easeSmooth }}
            onAnimationComplete={handleComplete}
            className="absolute inset-0 bg-[#F8F9FA] dark:bg-[#0f1013] border-t-2 border-black dark:border-zinc-700 shadow-[0_-12px_32px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Top Google Accent Line di ujung atas slide baru */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex z-30 pointer-events-none">
              <div className="flex-1 bg-google-blue" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-green" />
            </div>

            {/* GDG Background Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue opacity-15 select-none hidden lg:block">
                &lt;
              </div>
              <div className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red opacity-15 select-none hidden lg:block">
                /
              </div>
              <div className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow opacity-12 hidden lg:block" />
              <div className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green opacity-15 select-none hidden lg:block">
                &gt;
              </div>
            </div>

            {/* Kontainer Isi Slide Baru */}
            <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
              <div
                ref={newContentRef}
                className="w-full h-full overflow-hidden pointer-events-none relative"
              />
            </div>
          </motion.div>
        </>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 2. SLIDE DOWN (PUSH DOWN: Slide lama turun ke bawah, slide baru dr atas) */}
      {/* -------------------------------------------------------------------- */}
      {payload.type === "slide-down" && (
        <>
          {/* Slide Lama: Awal 0%, bergerak serempak ke bawah menuju 100% */}
          <motion.div
            key="slide-down-old"
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.95, ease: easeSmooth }}
            className="absolute inset-0 bg-[#F8F9FA] dark:bg-[#0f1013] overflow-hidden z-30"
          >
            {/* GDG Background Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue opacity-15 select-none hidden lg:block">
                &lt;
              </div>
              <div className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red opacity-15 select-none hidden lg:block">
                /
              </div>
              <div className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow opacity-12 hidden lg:block" />
              <div className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green opacity-15 select-none hidden lg:block">
                &gt;
              </div>
            </div>

            {/* Kontainer Isi Slide Lama */}
            <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
              <div
                ref={oldContentRef}
                className="w-full h-full overflow-hidden pointer-events-none relative"
              />
            </div>
          </motion.div>

          {/* Slide Baru: Awal -100% (di atas), bergerak serempak ke bawah menuju 0% */}
          <motion.div
            key="slide-down-new"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, ease: easeSmooth }}
            onAnimationComplete={handleComplete}
            className="absolute inset-0 bg-[#F8F9FA] dark:bg-[#0f1013] border-b-2 border-black dark:border-zinc-700 shadow-[0_12px_32px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Bottom Google Accent Line di ujung bawah slide baru */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 flex z-30 pointer-events-none">
              <div className="flex-1 bg-google-green" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-blue" />
            </div>

            {/* GDG Background Ornaments */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue opacity-15 select-none hidden lg:block">
                &lt;
              </div>
              <div className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red opacity-15 select-none hidden lg:block">
                /
              </div>
              <div className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow opacity-12 hidden lg:block" />
              <div className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green opacity-15 select-none hidden lg:block">
                &gt;
              </div>
            </div>

            {/* Kontainer Isi Slide Baru */}
            <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
              <div
                ref={newContentRef}
                className="w-full h-full overflow-hidden pointer-events-none relative"
              />
            </div>
          </motion.div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. SPLIT OUTWARD (Membelah ke Samping Membuka Target)  */}
      {/* ---------------------------------------------------- */}
      {payload.type === "split-outward" && (
        <>
          {/* Pintu Kiri (Sliding to Left dari 0% ke -100%) */}
          <motion.div
            key="split-out-left"
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.05, ease: easeSmooth }}
            onAnimationComplete={handleComplete}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#F8F9FA] dark:bg-[#0f1013] border-r-2 border-black dark:border-zinc-700 shadow-[8px_0px_24px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Dot Texture */}
            <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#4285f4 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Sisi Kiri Konten (Lebar 200% dari parent 50vw = 100vw, Left 0) dengan wrapper max-w-7xl */}
            <div className="w-[200%] h-full absolute left-0 top-0 pointer-events-none overflow-hidden">
              <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div
                  ref={leftDoorContentRef}
                  className="w-full h-full overflow-hidden pointer-events-none relative"
                />
              </div>
            </div>

            {/* Garis Aksen Vertikal pada Pertemuan Tengah (Seam) */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 flex flex-col z-30 pointer-events-none">
              <div className="flex-1 bg-google-blue" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-green" />
            </div>
          </motion.div>

          {/* Pintu Kanan (Sliding to Right dari 0% ke 100%) */}
          <motion.div
            key="split-out-right"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.05, ease: easeSmooth }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#F8F9FA] dark:bg-[#0f1013] border-l-2 border-black dark:border-zinc-700 shadow-[-8px_0px_24px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Dot Texture */}
            <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#4285f4 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Sisi Kanan Konten (Lebar 200% dari parent 50vw = 100vw, Left -100%) dengan wrapper max-w-7xl */}
            <div className="w-[200%] h-full absolute left-[-100%] top-0 pointer-events-none overflow-hidden">
              <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div
                  ref={rightDoorContentRef}
                  className="w-full h-full overflow-hidden pointer-events-none relative"
                />
              </div>
            </div>

            {/* Garis Aksen Vertikal pada Pertemuan Tengah (Seam) */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 flex flex-col z-30 pointer-events-none">
              <div className="flex-1 bg-google-green" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-blue" />
            </div>
          </motion.div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. SPLIT INWARD (Menutup dari Sisi Membawa Konten Baru) */}
      {/* ---------------------------------------------------- */}
      {payload.type === "split-inward" && (
        <>
          {/* Pintu Kiri (Masuk dari kiri -100% ke 0%) */}
          <motion.div
            key="split-in-left"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.05, ease: easeSmooth }}
            onAnimationComplete={handleComplete}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#F8F9FA] dark:bg-[#0f1013] border-r-2 border-black dark:border-zinc-700 shadow-[8px_0px_24px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Dot Texture */}
            <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#4285f4 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Sisi Kiri Konten Baru (Lebar 200%, Left 0) dengan wrapper max-w-7xl */}
            <div className="w-[200%] h-full absolute left-0 top-0 pointer-events-none overflow-hidden">
              <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div
                  ref={leftDoorContentRef}
                  className="w-full h-full overflow-hidden pointer-events-none relative"
                />
              </div>
            </div>

            {/* Garis Aksen Vertikal */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 flex flex-col z-30 pointer-events-none">
              <div className="flex-1 bg-google-blue" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-green" />
            </div>
          </motion.div>

          {/* Pintu Kanan (Masuk dari kanan 100% ke 0%) */}
          <motion.div
            key="split-in-right"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.05, ease: easeSmooth }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#F8F9FA] dark:bg-[#0f1013] border-l-2 border-black dark:border-zinc-700 shadow-[-8px_0px_24px_rgba(0,0,0,0.35)] overflow-hidden z-40"
          >
            {/* Dot Texture */}
            <div
              className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#4285f4 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Sisi Kanan Konten Baru (Lebar 200%, Left -100%) dengan wrapper max-w-7xl */}
            <div className="w-[200%] h-full absolute left-[-100%] top-0 pointer-events-none overflow-hidden">
              <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div
                  ref={rightDoorContentRef}
                  className="w-full h-full overflow-hidden pointer-events-none relative"
                />
              </div>
            </div>

            {/* Garis Aksen Vertikal */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 flex flex-col z-30 pointer-events-none">
              <div className="flex-1 bg-google-green" />
              <div className="flex-1 bg-google-yellow" />
              <div className="flex-1 bg-google-red" />
              <div className="flex-1 bg-google-blue" />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
