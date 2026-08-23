"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCard from "@/components/AboutCard";
import TechMarquee from "@/components/TechMarquee";
import ProjectGrid from "@/components/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import IntroLoader from "@/components/IntroLoader";

// Konsep: Halaman Utama Portofolio (Merakit seluruh komponen: IntroLoader -> Navbar -> Hero -> TechMarquee -> About -> Portfolio -> Contact)
export default function Home() {
  // State untuk menandai apakah animasi intro pembuka sudah selesai, sehingga konten utama bisa dimunculkan
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Konsep: Memaksa scroll kembali ke paling atas (top 0) setiap kali halaman di-refresh agar animasi intro loader terlihat utuh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Konsep: Fallback pengaman jika callback IntroLoader tidak terpicu
    const fallbackTimer = setTimeout(() => {
      setShowContent(true);
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      {/* Konsep: Animasi Layar Pembuka (Intro Loader nama pengembang dengan efek warna GDG) */}
      <IntroLoader onFinished={() => setShowContent(true)} />

      {/* Konsep: Navigasi Atas/Bawah (Desktop Nav & Floating Mobile Nav) */}
      <Navbar showContent={showContent} />

      {/* Container utama seluruh seksi portofolio */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        {/* Seksi 1: Hero (Perkenalan utama & tombol aksi) */}
        <Hero showContent={showContent} />

        {/* Seksi Running Text Tech Stack (Ikon teknologi yang terus berjalan horizontal) */}
        <div
          className={`transition-all duration-1000 ease-out-expo delay-600 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <TechMarquee />
        </div>

        {/* Seksi 2: About (Kartu informasi diri & keahlian teknis) */}
        <AboutCard showContent={showContent} />

        {/* Seksi 3: Project Grid (Daftar portofolio karya & deteksi status website live) */}
        <ProjectGrid showContent={showContent} />

        {/* Seksi 4: Contact Form (Formulir pesan Web3Forms & media sosial) */}
        <ContactForm showContent={showContent} />
      </main>
    </>
  );
}
