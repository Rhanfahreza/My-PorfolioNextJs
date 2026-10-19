"use client";

import Image from "next/image";
import { Compass, Shield, Server, Terminal } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function AboutCard({ showContent = false }: { showContent?: boolean }) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-16 lg:py-6 relative font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header with Scroll-Trigger */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center md:text-left mb-3.5 sm:mb-4 lg:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white text-xs font-bold uppercase tracking-wider mb-1.5 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000]">
              About Me
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Profile
            </h2>
            <div className="w-16 h-1.5 bg-google-red border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-sm mt-1.5 mx-auto md:mx-0" />
          </div>
        </ScrollReveal>

        {/* ======================================================== */}
        {/* TAMPILAN MOBILE & TABLET (< lg): Format Bertumpuk        */}
        {/* ======================================================== */}
        <div className="lg:hidden flex flex-col gap-6">

          {/* Card 1: Profil & Identitas (Mobile) */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="gdg-card p-5 sm:p-6 flex flex-col gap-5 hover:border-google-blue transition-colors">
              <div className="relative w-full aspect-[4/5] rounded-lg border-2 border-black dark:border-zinc-700 overflow-hidden group shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                <Image
                  src="/Foto-Profil-Github.jpeg"
                  alt="Rayhan Arie Fahreza"
                  fill
                  className="grayscale group-hover:grayscale-0 transition-all duration-500 object-cover object-[center_35%]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-start">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-blue text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                    Software Engineering
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Rayhan Arie Fahreza
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold mt-0.5">
                    SMK Plus Pelita Nusantara Bogor
                  </p>
                  <p className="text-[11px] font-semibold text-google-blue dark:text-google-blue mt-1">
                    Web Development • Go Backend Architecture
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60">
                    <span className="block text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">Backend</span>
                    <span className="block text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Go (Golang)</span>
                  </div>
                  <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60">
                    <span className="block text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">Primary OS</span>
                    <span className="block text-xs font-bold text-zinc-900 dark:text-white mt-0.5">Arch Linux</span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <Compass className="text-google-red" size={14} /> Bogor, Indonesia
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-green text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                    Student
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: About Me Narasi (Mobile) */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="gdg-card p-5 sm:p-6 hover:border-google-yellow transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-google-yellow border border-black shadow-[1px_1px_0px_#000]" />
                <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
                  About Me
                </h3>
              </div>
              <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed text-left font-normal">
                <p>
                  Focused on building modern web applications with security integrated from the ground up. I work across clean frontend interfaces, scalable Go backend architectures, and Linux-native environments.
                </p>
                <p>
                  Beyond writing code, I actively explore web application vulnerabilities, participate in CTF challenges, and build tools designed for performance and reliability.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: 3 Pilar Keahlian Bertumpuk (Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ScrollReveal direction="up" delay={0.15}>
              <div className="gdg-card p-4.5 hover:border-google-blue flex flex-col justify-between transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-blue text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-3 shrink-0">
                    <Server size={17} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Backend
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    Fast &amp; scalable systems with clean Go (Golang) backend architectures.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="gdg-card p-4.5 hover:border-google-red flex flex-col justify-between transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-3 shrink-0">
                    <Shield size={17} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Cybersecurity
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    Web vulnerability audits, XSS auditing, and active CTF challenges.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <div className="gdg-card p-4.5 hover:border-google-green flex flex-col justify-between transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-green text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-3 shrink-0">
                    <Terminal size={17} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Linux Systems
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    Hyprland on Arch Linux, security testing on Kali &amp; Athena OS.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAMPILAN DESKTOP (lg:): Opsi B (Muat 1 Slide di Layar)    */}
        {/* ======================================================== */}
        <div className="hidden lg:block space-y-3.5">

          {/* Tier 1: Wide Editorial Hero Card (Scroll-Triggered) */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="gdg-card p-4.5 lg:p-5 hover:border-google-blue transition-colors">
              <div className="flex flex-row items-stretch gap-6 lg:gap-7">
                
                {/* Foto Profil Vertikal Proporsional */}
                <div className="relative w-40 lg:w-44 aspect-[3/4] shrink-0 rounded-lg border-2 border-black dark:border-zinc-700 overflow-hidden group shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                  <Image
                    src="/Foto-Profil-Github.jpeg"
                    alt="Rayhan Arie Fahreza"
                    fill
                    className="grayscale group-hover:grayscale-0 transition-all duration-500 object-cover object-[center_35%]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                </div>

                {/* Identitas, Narasi Lengkap & Quick Facts */}
                <div className="flex flex-col justify-between w-full text-left">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-blue text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                        Software Engineering
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        SMK Plus Pelita Nusantara Bogor
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      Rayhan Arie Fahreza
                    </h3>
                    <p className="text-xs font-semibold text-google-blue dark:text-google-blue mb-2.5">
                      Web Development • Go Backend Architecture
                    </p>

                    <div className="space-y-1.5 text-zinc-600 dark:text-zinc-300 text-xs sm:text-[13px] leading-relaxed text-left font-normal">
                      <p>
                        Focused on building modern web applications with security integrated from the ground up. I work across clean frontend interfaces, scalable Go backend architectures, and Linux-native environments.
                      </p>
                      <p>
                        Beyond writing code, I actively explore web application vulnerabilities, participate in CTF challenges, and build tools designed for performance and reliability.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2 my-1">
                    <div className="p-2 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000] dark:shadow-none">
                      <span className="block text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">Track</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Software Eng.</span>
                    </div>
                    <div className="p-2 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000] dark:shadow-none">
                      <span className="block text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">Backend</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Go (Golang)</span>
                    </div>
                    <div className="p-2 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000] dark:shadow-none">
                      <span className="block text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">Daily OS</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Arch Linux</span>
                    </div>
                  </div>

                  <div className="pt-2 mt-1.5 border-t-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-600 dark:text-zinc-400">
                      <Compass className="text-google-red" size={13} /> Bogor, West Java, Indonesia
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-green text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                      Student
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Tier 2: 3 Pilar Keahlian Berdampingan (Staggered Scroll-Trigger) */}
          <div className="grid grid-cols-3 gap-3.5 lg:gap-4">

            {/* Pilar 1: Backend */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="gdg-card p-3.5 sm:p-4 hover:border-google-blue flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-8 h-8 rounded border-2 border-black dark:border-zinc-700 bg-google-blue text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-2 shrink-0">
                    <Server size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Backend
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] sm:text-xs leading-relaxed font-normal">
                    Fast &amp; scalable systems with clean Go (Golang) backend architectures.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 2: Cybersecurity */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="gdg-card p-3.5 sm:p-4 hover:border-google-red flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-8 h-8 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-2 shrink-0">
                    <Shield size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Cybersecurity
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] sm:text-xs leading-relaxed font-normal">
                    Web vulnerability audits, XSS auditing, and active CTF challenges.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 3: Linux Systems */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="gdg-card p-3.5 sm:p-4 hover:border-google-green flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-8 h-8 rounded border-2 border-black dark:border-zinc-700 bg-google-green text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] mb-2 shrink-0">
                    <Terminal size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Linux Systems
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] sm:text-xs leading-relaxed font-normal">
                    Hyprland on Arch Linux, security testing on Kali &amp; Athena OS.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
