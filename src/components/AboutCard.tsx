"use client";

import Image from "next/image";
import { Compass, Shield, Server, Terminal } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function AboutCard({ showContent = false }: { showContent?: boolean }) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-16 lg:py-10 relative font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center md:text-left mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white text-xs font-bold uppercase tracking-wider mb-1.5 shadow-[2px_2px_0px_#000]">
              About Me
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Profile &amp; Background
            </h2>
            <div className="w-16 h-1.5 bg-google-red border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] rounded-sm mt-1.5 mx-auto md:mx-0" />
          </div>
        </ScrollReveal>

        {/* Single Responsive Profile Card (No DOM Duplication) */}
        <div className="space-y-4">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="gdg-card p-5 sm:p-7 hover:border-google-blue transition-colors">
              <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
                {/* Profile Photo */}
                <div className="relative w-44 sm:w-48 lg:w-52 aspect-[3/4] shrink-0 rounded-xl border-2 border-black dark:border-zinc-700 overflow-hidden group shadow-[4px_4px_0px_#000]">
                  <Image
                    src="/Foto-Profil-Github.jpeg"
                    alt="Rayhan Arie Fahreza"
                    fill
                    sizes="(max-width: 1024px) 200px, 220px"
                    className="grayscale group-hover:grayscale-0 transition-all duration-500 object-cover object-[center_35%]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                </div>

                {/* Identity & In-Depth Bio */}
                <div className="flex flex-col justify-between w-full text-left">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-blue text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                        Software Engineering
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        SMK Plus Pelita Nusantara Bogor
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      Rayhan Arie Fahreza
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-google-blue mb-3">
                      Full-Stack Web Development • Go Backend Architecture • Security Testing
                    </p>

                    <div className="space-y-2.5 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                      <p>
                        Great software shouldn&apos;t just look sharp and run fast—it must be resilient by design. My journey in technology started with curiosity about how web systems work under the hood and evolved into a dual focus: <strong>engineering scalable applications</strong> and <strong>breaking them to make them safer</strong>.
                      </p>
                      <p>
                        On the engineering side, I craft responsive web interfaces with <strong>Next.js, TypeScript, and Tailwind CSS</strong>, backed by high-concurrency <strong>Go (Golang)</strong> services and relational databases. On the security side, I build automated reconnaissance tools, hunt for <strong>Cross-Site Scripting (XSS)</strong> and logic flaws, and placed <strong>Top 10 at Telkom University&apos;s Clash of Cyber Heist CTF</strong> with my team.
                      </p>
                    </div>
                  </div>

                  {/* Quick Facts Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 my-2">
                    <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000]">
                      <span className="block text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Track</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Software Eng.</span>
                    </div>
                    <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000]">
                      <span className="block text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Backend</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Go (Golang)</span>
                    </div>
                    <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000]">
                      <span className="block text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Daily OS</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Arch Linux</span>
                    </div>
                    <div className="p-2.5 rounded border border-black/15 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 shadow-[1px_1px_0px_#000]">
                      <span className="block text-[10px] uppercase text-zinc-400 font-bold tracking-wider">Security Labs</span>
                      <span className="block text-xs font-extrabold text-zinc-900 dark:text-white mt-0.5 truncate">Kali &amp; Athena OS</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-1 border-t-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-600 dark:text-zinc-400">
                      <Compass className="text-google-red" size={14} /> Bogor, West Java, Indonesia
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-google-green text-white text-[10px] font-bold uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                      Student
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Pillars of Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollReveal direction="up" delay={0.15}>
              <div className="gdg-card p-4.5 hover:border-google-blue flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-blue text-white flex items-center justify-center shadow-[2px_2px_0px_#000] mb-2.5 shrink-0">
                    <Server size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Backend Architecture
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    Developing high-concurrency microservices and APIs with Go (Golang), Fiber, and clean architecture principles.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="gdg-card p-4.5 hover:border-google-red flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white flex items-center justify-center shadow-[2px_2px_0px_#000] mb-2.5 shrink-0">
                    <Shield size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Offensive Web Security
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    OWASP Top 10 auditing, Cross-Site Scripting (XSS) assessments, Burp Suite testing, and competitive CTF problem solving.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <div className="gdg-card p-4.5 hover:border-google-green flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="w-9 h-9 rounded border-2 border-black dark:border-zinc-700 bg-google-green text-white flex items-center justify-center shadow-[2px_2px_0px_#000] mb-2.5 shrink-0">
                    <Terminal size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase mb-1 tracking-tight">
                    Linux &amp; Security Tooling
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed font-normal">
                    Customized Arch Linux with Hyprland WM, security environments on Kali and Athena OS, and automated Python recon scripts.
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
