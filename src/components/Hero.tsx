"use client";

import { Code2, Mail } from "lucide-react";
import Lanyard from "./Lanyard";

// Konsep: Komponen Hero (Seksi utama teratas website berisi perkenalan singkat, tombol navigasi cepat, dan kartu ID 3D Lanyard)
export default function Hero({
  showContent = false,
}: {
  showContent?: boolean;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Konsep: Pola garis grid latar belakang dengan opacity transparan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Container utama konten hero (Animasi fade-in berurutan) */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full transition-opacity duration-500 ease-out-expo ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Konsep: Kolom Kiri (Area teks nama, profesi, deskripsi perkenalan, dan tombol tindakan) */}
          <div className="w-full lg:w-2/3 flex flex-col items-start gap-6">
            {/* Nama lengkap pengembang */}
            <h1
              className={`text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight transition-all duration-1000 ease-out-expo delay-100 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Rayhan Arie Fahreza
            </h1>

            {/* Narasi singkat tentang fokus keahlian (Software Engineer & Cybersecurity) */}
            <p
              className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed text-justify font-normal transition-all duration-1000 ease-out-expo delay-200 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A Vocational High School student majoring in Software Engineering
              at SMK Plus Pelita Nusantara Bogor. I have a strong interest in
              bridging elegant modern web development with cybersecurity
              practices. Beyond optimizing code, I typically divide my time
              between pursuing academic goals, fine-tuning system
              configurations, and hunting for security vulnerabilities.{" "}
            </p>

            {/* Konsep: Tombol Call-To-Action (CTA) berani bergaya Neo-Brutalisme (Explore Work & Connect) */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 transition-all duration-1000 ease-out-expo delay-300 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="#work"
                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-google-blue text-white border-2 border-black dark:border-zinc-700 rounded-lg font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000]"
              >
                <Code2 size={18} />
                Explore Work
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-lg font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000]"
              >
                <Mail size={18} />
                Let&apos;s Connect
              </a>
            </div>
          </div>

          {/* Konsep: Kolom Kanan (Simulasi kartu ID lanyard 3D interaktif) */}
          <div
            className={`hidden sm:block w-full lg:w-1/3 shrink-0 transition-all duration-1000 ease-out-expo delay-250 ${
              showContent
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-12 scale-95"
            }`}
          >
            <Lanyard />
          </div>
        </div>
      </div>
    </section>
  );
}
