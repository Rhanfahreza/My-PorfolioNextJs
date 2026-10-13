"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCard from "@/components/AboutCard";
import ProjectGrid from "@/components/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import IntroLoader from "@/components/IntroLoader";
import SectionTransition, {
  TransitionPayload,
  TransitionType,
} from "@/components/SectionTransition";

export type ExperienceTab = "projects" | "tech" | "certificates";

const SECTION_ORDER = ["#home", "#about", "#work", "#contact"];

// Konsep: Halaman Utama Portofolio (Merakit seluruh komponen: IntroLoader -> Navbar -> Hero -> About -> Portfolio -> Contact)
export default function Home() {
  // State untuk menandai apakah konten utama sudah aktif dan di-render
  const [showContent, setShowContent] = useState(false);
  // State tab yang sedang aktif di seksi Experience (Projects, Tech Stack, Certificates)
  const [activeExperienceTab, setActiveExperienceTab] = useState<ExperienceTab>("projects");
  // State mode tampilan seksi Experience ("menu" untuk menu awal tipografi, "content" untuk isi konten normal)
  const [experienceViewMode, setExperienceViewMode] = useState<"menu" | "content">("content");

  // State seksi yang sedang aktif di viewport (Home, About, Work, Contact)
  const [activeSection, setActiveSection] = useState("#home");

  // State payload transisi window presentation khusus navigasi Navbar
  const [transitionPayload, setTransitionPayload] = useState<TransitionPayload | null>(null);

  // State pending target & timer ref untuk delay 2 detik sesuai permintaan pengguna
  const [pendingTarget, setPendingTarget] = useState<string | null>(null);
  const pendingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pastikan scroll kembali ke paling atas saat halaman dibuka/refresh agar animasi intro loader terlihat utuh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      // Khusus desktop (>= 768px), langsung tampilkan seluruh halaman tanpa delay loading screen
      if (window.innerWidth >= 768) {
        setShowContent(true);
        document.documentElement.setAttribute("data-rendered", "true");
      }
    }

    // Fallback pengaman jika callback IntroLoader tidak terpicu di mobile
    const fallbackTimer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => {
      clearTimeout(fallbackTimer);
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    };
  }, []);

  const handleFinishedIntro = () => {
    setShowContent(true);
    setTimeout(() => {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-rendered", "true");
      }
    }, 350);
  };

  // Handler navigasi khusus via Navbar yang memicu animasi Window Presentation (PPT Style) dengan delay 2 detik
  const handleNavigateSection = (targetHref: string, explicitTab?: ExperienceTab) => {
    if (transitionPayload || pendingTarget === targetHref) return; // Mencegah spam klik saat transisi/pending

    // Jika navigasi menuju ke seksi Experience:
    if (targetHref === "#work") {
      if (explicitTab) {
        setActiveExperienceTab(explicitTab);
        setExperienceViewMode("content");
      } else {
        setExperienceViewMode("menu");
      }
    }

    const currentIndex = SECTION_ORDER.indexOf(activeSection);
    const targetIndex = SECTION_ORDER.indexOf(targetHref);

    if (targetIndex === -1 || currentIndex === targetIndex) {
      const el = document.querySelector(targetHref);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const currentHref = activeSection;

    // Langsung pindahkan indikator aktif di Navbar agar pengguna melihat respon seketika
    setPendingTarget(targetHref);
    setActiveSection(targetHref);

    if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);

    const diff = targetIndex - currentIndex;
    let type: TransitionType;

    if (diff === 1) {
      // Maju 1 langkah berurutan (e.g. Home -> About, About -> Experience, Experience -> Contact)
      type = "slide-up";
    } else if (diff === -1) {
      // Mundur 1 langkah berurutan (e.g. Contact -> Experience, Experience -> About, About -> Home)
      type = "slide-down";
    } else if (diff < -1) {
      // Lompat mundur melewati halaman (e.g. Contact -> Home, Contact -> About, Experience -> Home)
      type = "split-outward";
    } else {
      // Lompat maju melewati halaman (e.g. Home -> Experience, Home -> Contact, About -> Contact)
      type = "split-inward";
    }

    // Delay transisi responsif 0.4 detik (400ms) agar ada feedback visual seketika tanpa jeda lama
    pendingTimerRef.current = setTimeout(() => {
      setPendingTarget(null);
      setTransitionPayload({ type, fromHref: currentHref, targetHref });
    }, 400);
  };

  return (
    <>
      {/* Konsep: Animasi Layar Pembuka (Intro Loader nama pengembang dengan efek warna GDG) */}
      <IntroLoader onFinished={handleFinishedIntro} />

      {/* Konsep: Overlay Animasi Window Presentation (Aktif hanya saat navigasi Navbar) */}
      <SectionTransition
        payload={transitionPayload}
        onFinish={() => setTransitionPayload(null)}
      />

      {/* Konsep: Navigasi Atas/Bawah (Desktop Nav & Floating Mobile Nav) */}
      <Navbar
        showContent={showContent}
        activeExperienceTab={activeExperienceTab}
        onSelectExperienceTab={setActiveExperienceTab}
        activeSection={activeSection}
        onActiveSectionChange={setActiveSection}
        onNavigateSection={handleNavigateSection}
        pendingTarget={pendingTarget}
      />

      {/* Container utama seluruh seksi portofolio */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-0">
        {/* Seksi 1: Hero (Perkenalan utama & tombol aksi) */}
        <Hero
          showContent={showContent}
          onNavigateSection={handleNavigateSection}
        />

        {/* Seksi 2: About (Kartu informasi diri & keahlian teknis) */}
        <AboutCard showContent={showContent} />

        {/* Seksi 3: Project Grid (Daftar portofolio karya & deteksi status website live) */}
        <ProjectGrid
          showContent={showContent}
          activeTab={activeExperienceTab}
          onTabChange={setActiveExperienceTab}
          viewMode={experienceViewMode}
          onViewModeChange={setExperienceViewMode}
        />

        {/* Seksi 4: Contact Form (Formulir pesan Web3Forms & media sosial) */}
        <ContactForm showContent={showContent} />
      </main>
    </>
  );
}
