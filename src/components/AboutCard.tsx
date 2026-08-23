"use client";

import Image from "next/image";
import { Compass } from "lucide-react";

export default function AboutCard({ showContent = false }: { showContent?: boolean }) {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div
          className={`text-center md:text-left mb-12 transition-all duration-1000 ease-out-expo delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-google-red text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000]">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
            Profile
          </h2>
          <div className="w-40 h-2 bg-google-red border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-sm mt-2 mx-auto md:mx-0"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Kartu Profil & Foto (Sticky Card) */}
          <div
            className={`w-full lg:w-[320px] xl:w-87.5 shrink-0 lg:sticky lg:top-28 transition-all duration-700 ease-out-expo delay-450 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <div className="gdg-card overflow-hidden hover:border-google-blue flex flex-col gap-6 p-6">
              {/* Foto profil */}
              <div className="relative w-full aspect-4/5 rounded-lg border-2 border-black dark:border-zinc-700 overflow-hidden group shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000]">
                <Image
                  src="/Foto-Profil-Github.jpeg"
                  alt="Rayhan Arie Fahreza"
                  fill
                  priority
                  className="grayscale group-hover:grayscale-0 transition-all duration-500 object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
              </div>

              {/* Info singkat */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-start">
                  <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-wider rounded border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000]">
                    Software Engineering
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase">
                    Rayhan Arie Fahreza
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold mt-0.5">
                    SMK Plus Pelita Nusantara Bogor
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <Compass className="text-google-red" size={14} /> Bogor, Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom narasi / deskripsi profil */}
          <div className="flex-1 w-full flex flex-col gap-6">

            {/* Perkenalan Diri */}
            <div
              className={`gdg-card p-6 md:p-8 hover:border-google-yellow transition-all duration-700 ease-out-expo delay-500 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-google-yellow border border-black" />
                About Me
              </h3>
              <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed text-justify font-medium">
                Focused on building modern web applications with security integrated from the ground up. I work across frontend design, secure backend architecture, Linux environments, and hands-on security audits.              </p>
            </div>

            {/* Grid backend & UI/UX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Backend Development */}
              <div
                className={`gdg-card p-6 hover:border-google-blue transition-all duration-700 ease-out-expo delay-550 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded border-2 border-black dark:border-zinc-700 bg-google-blue text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] shrink-0">
                    <span>⚙️</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-zinc-900 dark:text-white mb-2 uppercase">
                      Backend
                    </h3>
                    <p className="text-zinc-800 dark:text-zinc-200 text-xs leading-relaxed text-justify font-medium">
                      I focus on building fast, scalable, and reliable backend systems. I write clean code and rely on Go (Golang) to deliver lightweight, high-efficiency architectures.</p>
                  </div>
                </div>
              </div>

              {/* UI/UX Design */}
              <div
                className={`gdg-card p-6 hover:border-google-yellow transition-all duration-700 ease-out-expo delay-550 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded border-2 border-black dark:border-zinc-700 bg-google-yellow text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] shrink-0">
                    <span>🎨</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-zinc-900 dark:text-white mb-2 uppercase">
                      UI/UX
                    </h3>
                    <p className="text-zinc-800 dark:text-zinc-200 text-xs leading-relaxed text-justify font-medium">
                      I start every project in Figma to map out the user experience before writing code. This keeps my workflow centered on building clean wireframes, interactive prototypes, and functional interfaces.                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Linux & Cybersecurity */}
            <div
              className={`gdg-card p-6 md:p-8 hover:border-google-green transition-all duration-700 ease-out-expo delay-600 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded border-2 border-black dark:border-zinc-700 bg-google-green text-white flex items-center justify-center shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] shrink-0">
                  <span className="text-xl select-none">🐧</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2 uppercase">
                    Linux
                  </h3>
                  <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed text-justify font-medium">
                    Linux-native workflow centered on system customization and security testing. Experienced in ricing Hyprland on Arch Linux, as well as web application auditing, XSS vulnerability testing, and network analysis on Kali and Athena OS</p>
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </section>
  );
}
