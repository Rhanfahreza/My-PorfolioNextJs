"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code,
  Lock,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
  X,
  ShoppingBag,
  LayoutGrid,
  CheckCircle2,
  Info,
} from "lucide-react";
import ExperienceMenu from "./ExperienceMenu";
import ScrollReveal from "./ScrollReveal";

export interface ProjectCaseStudy {
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  impact: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "blue" | "red" | "green";
  icon: React.ReactNode;
  badgeLabel: "Live App" | "Interactive Demo" | "Open-Source CLI";
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  caseStudy: ProjectCaseStudy;
}

const projects: Project[] = [
  {
    title: "ACK Teams Hackathon",
    subtitle: "AI Quiz Generator Platform",
    description:
      "Automated assessment platform built at Build with AI Hackathon (GDGoC BINUS @Alam Sutera) that creates curriculum-aligned quizzes from topics in seconds.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Generative AI"],
    color: "blue",
    icon: <Lock size={18} />,
    badgeLabel: "Live App",
    liveUrl: "https://hackathon.ackteams.com",
    gradient: "from-blue-600 to-indigo-900",
    caseStudy: {
      role: "Frontend & AI Integration Engineer (Acknowledge Teams)",
      timeline: "2025 • Hackathon",
      problem:
        "Guru dan pengajar menghabiskan waktu berjam-jam untuk merancang, memformat, dan menyesuaikan kuis berdasarkan topik dan tingkatan kelas siswa secara manual.",
      solution:
        "Mengembangkan platform web Next.js responsif yang terintegrasi dengan generative AI prompt engineering untuk memproduksi kuis pilihan ganda terstruktur secara otomatis.",
      impact:
        "Memangkas durasi penyusunan kuis dari beberapa jam menjadi kurang dari 30 detik pada demonstrasi hackathon.",
    },
  },
  {
    title: "Erpeel School Portal",
    subtitle: "RPL Department Portal & Live Face Recognition",
    description:
      "Official Software Engineering (RPL) department portal at SMK Plus Pelita Nusantara, featuring real-time AI face recognition built with Teachable Machine.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Teachable Machine", "WebRTC"],
    color: "green",
    icon: <BookOpen size={18} />,
    badgeLabel: "Interactive Demo",
    liveUrl: "https://website-erpeel.vercel.app/",
    gradient: "from-emerald-600 to-teal-950",
    caseStudy: {
      role: "Lead Web Developer",
      timeline: "2025 • School Exhibition",
      problem:
        "Pengunjung pameran dan calon siswa baru di SMK Plus Pelita Nusantara membutuhkan wadah terpusat untuk memahami kurikulum jurusan RPL sekaligus menguji hasil karya teknologi siswa secara langsung.",
      solution:
        "Membangun portal informasi jurusan RPL lengkap dengan modul showcase machine learning pengenalan wajah (Teachable Machine & WebRTC) yang dapat mendeteksi wajah siswa secara real-time.",
      impact:
        "Menjadi pusat demonstrasi interaktif utama selama pameran sekolah, mendemonstrasikan implementasi machine learning di browser kepada ratusan pengunjung.",
    },
  },
  {
    title: "Toko Casual",
    subtitle: "E-Commerce Web Application",
    description:
      "Lightweight casualwear e-commerce storefront with native PHP and JSON storage, featuring session authentication, cart CRUD, and checkout simulation.",
    tags: ["PHP", "JSON Storage", "HTML5", "CSS3", "Railway"],
    color: "red",
    icon: <ShoppingBag size={18} />,
    badgeLabel: "Live App",
    liveUrl: "https://toko-casual-production.up.railway.app/login.php",
    gradient: "from-rose-600 to-amber-950",
    caseStudy: {
      role: "Full-Stack Developer",
      timeline: "2024 • Web Project",
      problem:
        "Pelaku usaha pakaian kasual memerlukan etalase online mandiri yang responsif dengan fitur keranjang belanja dan simulasi pembayaran tanpa dependensi database yang berat.",
      solution:
        "Merancang aplikasi web native PHP dengan penyimpanan data JSON terstruktur, session management autentikasi aman, dan simulasi proses checkout.",
      impact:
        "Sukses di-deploy pada Railway Cloud dan menjadi portofolio fundamental dalam penguasaan arsitektur backend murni dan state management.",
    },
  },
  {
    title: "SuperJamboyTools",
    subtitle: "Automated Attack Surface Recon & Audit CLI",
    description:
      "Python-based reconnaissance and web security audit engine designed to automate endpoint discovery, HTTP security header audits, and surface analysis.",
    tags: ["Python", "Web Security", "Reconnaissance", "Linux CLI"],
    color: "blue",
    icon: <Terminal size={18} />,
    badgeLabel: "Open-Source CLI",
    liveUrl: "https://github.com/Rhanfahreza/SuperJamboyyy-Tools",
    githubUrl: "https://github.com/Rhanfahreza/SuperJamboyyy-Tools",
    gradient: "from-cyan-700 to-blue-950",
    caseStudy: {
      role: "Creator & Security Developer",
      timeline: "2025 • Open Source",
      problem:
        "Melakukan pemindaian target dan verifikasi HTTP security headers secara manual satu per satu memakan waktu lama saat tahap awal CTF maupun audit keamanan web.",
      solution:
        "Membangun automation engine berbasis CLI Python yang menyatukan alur reconnaissance, port checking, dan inspeksi respon headers ke dalam satu eksekusi terminal.",
      impact:
        "Mempersingkat fase reconnaissance awal dan dipublikasikan secara terbuka di GitHub sebagai modul edukasi cybersecurity.",
    },
  },
];

interface TechItem {
  name: string;
  category:
    | "Tech & Frameworks"
    | "Cyber Security Tools"
    | "Operating Systems"
    | "Productivity"
    | "Database";
  logoUrl: string;
  darkInvert?: boolean;
  tag: string;
}

const techStack: TechItem[] = [
  // Tech & Frameworks
  {
    name: "HTML5",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    tag: "Markup",
  },
  {
    name: "CSS3",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    tag: "Styling",
  },
  {
    name: "JavaScript",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tag: "Scripting",
  },
  {
    name: "TypeScript",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tag: "Fullstack",
  },
  {
    name: "React",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tag: "Frontend",
  },
  {
    name: "Go (Golang)",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    tag: "Backend",
  },
  {
    name: "Tailwind CSS",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    tag: "Styling",
  },
  {
    name: "PHP",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    tag: "Backend",
  },
  {
    name: "Next.js",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    darkInvert: true,
    tag: "Fullstack",
  },
  {
    name: "Go Fiber",
    category: "Tech & Frameworks",
    logoUrl: "https://avatars.githubusercontent.com/u/59947262?s=160&v=4",
    tag: "Go Framework",
  },
  {
    name: "Laravel",
    category: "Tech & Frameworks",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    tag: "PHP Framework",
  },

  // Database
  {
    name: "MySQL",
    category: "Database",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    tag: "RDBMS",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    tag: "RDBMS",
  },

  // Cyber Security
  {
    name: "Nmap",
    category: "Cyber Security Tools",
    logoUrl: "/Nmap-removebg-preview.png",
    tag: "Network Audit",
  },
  {
    name: "Wireshark",
    category: "Cyber Security Tools",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wireshark/wireshark-original.svg",
    tag: "Packet Analysis",
  },
  {
    name: "Metasploit",
    category: "Cyber Security Tools",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/metasploit/metasploit-original.svg",
    tag: "Penetration Testing",
  },
  {
    name: "Burp Suite",
    category: "Cyber Security Tools",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/burpsuite/burpsuite-original.svg",
    tag: "Web Sec Audit",
  },
  {
    name: "Aircrack-ng",
    category: "Cyber Security Tools",
    logoUrl: "/Nmap-removebg-preview.png",
    tag: "Network Sec",
  },

  // Operating Systems
  {
    name: "Arch Linux",
    category: "Operating Systems",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg",
    tag: "Daily Driver OS",
  },
  {
    name: "Kali Linux",
    category: "Operating Systems",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kalilinux/kalilinux-original.svg",
    tag: "Security Distro",
  },
  {
    name: "Athena OS",
    category: "Operating Systems",
    logoUrl: "/athena-os-logo-150x150-removebg-preview.png",
    tag: "Pentest OS",
  },
  {
    name: "Manjaro",
    category: "Operating Systems",
    logoUrl: "/Manjaro_Os-removebg-preview.png",
    tag: "Arch-Based OS",
  },
  {
    name: "Windows",
    category: "Operating Systems",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    tag: "OS",
  },

  // Productivity
  {
    name: "VS Code",
    category: "Productivity",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    tag: "Editor",
  },
  {
    name: "GitHub",
    category: "Productivity",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    darkInvert: true,
    tag: "VCS",
  },
  {
    name: "Figma",
    category: "Productivity",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tag: "UI/UX",
  },
  {
    name: "Docker",
    category: "Productivity",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    tag: "Containers",
  },
];

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  color: "blue" | "red" | "green" | "purple" | "yellow" | "pink";
}

const certificates: Certificate[] = [
  {
    title: "Clash Of Cyber Heist (Top 10 Team fsociety)",
    issuer: "Telkom University",
    date: "2025",
    credentialUrl: "/certificates/fsociety_Top10.pdf",
    color: "green",
  },
  {
    title: "HackerOne Inside for Cyber Security Enthusiast",
    issuer: "CodeLamp And HackerOne",
    date: "2025",
    credentialUrl: "/certificates/HackerOne_Inside_for_Cyber_Security_Enthusiast.pdf",
    color: "blue",
  },
  {
    title: "Webinar Introduction to Capture the Flag",
    issuer: "Dicoding",
    date: "2025",
    credentialUrl: "/certificates/Webinar-Introduction-to-Capture-the-Flag.pdf",
    color: "green",
  },
  {
    title: "Belajar Dasar Artificial Intelligence (AI)",
    issuer: "Dicoding And Google Cloud Partner",
    date: "2025",
    credentialUrl: "/certificates/Belajar-Dasar-AI-DICODING.pdf",
    color: "blue",
  },
  {
    title: "Penerapan Data Science Dengan Microsoft Fabric",
    issuer: "Dicoding And Microsoft",
    date: "2025",
    credentialUrl: "/certificates/Penerapan-Data-Science-dengan-Microsoft-Fabric.pdf",
    color: "blue",
  },
  {
    title: "Why Your Game Isn't Selling: Market Validation",
    issuer: "Dicoding",
    date: "2025",
    credentialUrl: "/certificates/Market-Validation-for-Indie-Developers.pdf",
    color: "green",
  },
  {
    title: "Content Mastery",
    issuer: "Galeria Potensi Indonesia",
    date: "2025",
    credentialUrl: "/certificates/Content-Mastery.pdf",
    color: "red",
  },
  {
    title: "Teknik Berbicara di Depan Umum",
    issuer: "Galeria Potensi Indonesia",
    date: "2025",
    credentialUrl: "/certificates/Teknik Bicara Di Depan Umum.pdf",
    color: "red",
  },
  {
    title: "From Vision to Version 1.0: Game Roadmapping",
    issuer: "CodeLamp Indonesia",
    date: "2025",
    credentialUrl: "/certificates/From Vision to Version 1.0_ Roadmapping Your Game Effectively.pdf",
    color: "red",
  },
  {
    title: "Game Design: From Hobby to Hook",
    issuer: "CodeLamp Indonesia",
    date: "2025",
    credentialUrl: "/certificates/Game Design_ From Hobby to Hook - Hooked in Minutes, Engaged for Days.pdf",
    color: "pink",
  },
];

const colorMap = {
  blue: {
    badge: "bg-google-blue text-white",
    border: "hover:border-google-blue",
    dot: "bg-google-blue",
  },
  red: {
    badge: "bg-google-red text-white",
    border: "hover:border-google-red",
    dot: "bg-google-red",
  },
  green: {
    badge: "bg-google-green text-white",
    border: "hover:border-google-green",
    dot: "bg-google-green",
  },
  purple: {
    badge: "bg-purple-600 text-white",
    border: "hover:border-purple-600",
    dot: "bg-google-purple",
  },
  yellow: {
    badge: "bg-google-yellow text-black",
    border: "hover:border-google-yellow",
    dot: "bg-google-yellow",
  },
  pink: {
    badge: "bg-pink-500 text-white",
    border: "hover:border-pink-500",
    dot: "bg-pink-500",
  },
};

type TabType = "projects" | "tech" | "certificates";

interface ProjectGridProps {
  showContent?: boolean;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  viewMode?: "menu" | "content";
  onViewModeChange?: (mode: "menu" | "content") => void;
}

const TAB_INDEX: Record<TabType, number> = {
  projects: 0,
  tech: 1,
  certificates: 2,
};

export default function ProjectGrid({
  activeTab: externalTab,
  onTabChange,
  viewMode: externalViewMode,
  onViewModeChange,
}: ProjectGridProps) {
  const [internalTab, setInternalTab] = useState<TabType>("projects");
  const activeTab = externalTab ?? internalTab;
  const setActiveTab = onTabChange ?? setInternalTab;

  const [internalViewMode, setInternalViewMode] = useState<"menu" | "content">("content");
  const viewMode = externalViewMode ?? internalViewMode;
  const setViewMode = onViewModeChange ?? setInternalViewMode;

  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const [prevTab, setPrevTab] = useState<TabType>(activeTab);
  const [direction, setDirection] = useState<number>(1);

  if (activeTab !== prevTab) {
    const dir = TAB_INDEX[activeTab] >= TAB_INDEX[prevTab] ? 1 : -1;
    setDirection(dir);
    setPrevTab(activeTab);
  }

  // Keyboard accessibility: Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
        setActiveCaseStudy(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const easeSmooth = [0.16, 1, 0.3, 1] as const;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.05}>
          <AnimatePresence mode="wait">
            {viewMode === "menu" ? (
              <ExperienceMenu
                key="experience-menu-view"
                onSelectTab={(selectedTab) => {
                  setActiveTab(selectedTab);
                  setViewMode("content");
                }}
                onSkipToContent={() => {
                  setViewMode("content");
                }}
              />
            ) : (
              <motion.div
                key="experience-content-view"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <button
                        onClick={() => setViewMode("menu")}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] transition-all hover:-translate-y-0.5 cursor-pointer"
                        title="Kembali ke Menu Awal Experience"
                      >
                        <LayoutGrid size={13} className="text-google-blue" />
                        <span>← Menu Hub</span>
                      </button>
                      <span className="text-xs font-mono font-bold text-zinc-400">/</span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-google-blue">
                        {activeTab}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
                      {activeTab === "projects"
                        ? "Featured Projects"
                        : activeTab === "tech"
                        ? "Tech Arsenal & Lab"
                        : "Verified Credentials"}
                    </h2>
                    <div className="w-16 h-2 bg-google-blue border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] rounded-sm mt-2 mx-auto md:mx-0" />
                  </div>

                  {/* Sub-nav Tabs */}
                  <div
                    role="tablist"
                    className="flex justify-center md:justify-end gap-2 bg-zinc-100 dark:bg-zinc-900/60 p-1.5 rounded-xl border-2 border-black dark:border-zinc-800 shadow-[3px_3px_0px_#000]"
                  >
                    {(["projects", "tech", "certificates"] as TabType[]).map((tab) => {
                      const isActive = activeTab === tab;
                      const labels = {
                        projects: { text: "Projects", icon: <Briefcase size={13} /> },
                        tech: { text: "Tech Stack", icon: <Terminal size={13} /> },
                        certificates: { text: "Certificates", icon: <Award size={13} /> },
                      };

                      return (
                        <button
                          key={tab}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveTab(tab)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black uppercase rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? "bg-google-blue text-white border-black shadow-[2px_2px_0px_#000]"
                              : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent hover:border-black/20"
                          }`}
                        >
                          {labels[tab].icon}
                          <span className="hidden sm:inline">{labels[tab].text}</span>
                          <span className="sm:hidden">{labels[tab].text.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-105 overflow-hidden relative w-full">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    {/* Projects Tab */}
                    {activeTab === "projects" && (
                      <motion.div
                        key="projects-tab"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.65, ease: easeSmooth }}
                        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
                      >
                        {projects.map((project) => {
                          const colors = colorMap[project.color];

                          return (
                            <div
                              key={project.title}
                              className={`group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-2xl p-5 shadow-[4px_4px_0px_#000] ${colors.border} hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-200`}
                            >
                              <div className="flex flex-col h-full justify-between">
                                <div>
                                  {/* Project Banner Header */}
                                  <div
                                    className={`relative w-full aspect-16/9 mb-5 rounded-xl border-2 border-black dark:border-zinc-700 overflow-hidden bg-gradient-to-br ${project.gradient} p-4 shadow-[2px_2px_0px_#000] flex flex-col justify-between`}
                                  >
                                    <div className="flex items-center justify-between z-10">
                                      <div className="w-10 h-10 rounded-lg bg-white text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                                        {project.icon}
                                      </div>

                                      <div className="flex items-center gap-1.5">
                                        {project.githubUrl && (
                                          <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-lg bg-white text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-zinc-100 transition-colors"
                                            title="GitHub Repository"
                                          >
                                            <Code size={14} />
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    {/* Badge Status */}
                                    <div className="z-10 mt-auto pt-4 flex items-center justify-between gap-2">
                                      <span className="inline-block px-2.5 py-1 bg-black/80 text-white rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20 backdrop-blur-sm">
                                        {project.badgeLabel}
                                      </span>
                                      <button
                                        onClick={() => setActiveCaseStudy(project)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-black rounded-md text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-google-yellow transition-colors cursor-pointer"
                                      >
                                        <Info size={11} />
                                        Case Study
                                      </button>
                                    </div>
                                  </div>

                                  {/* Title & Description */}
                                  <div className="space-y-2 mb-4">
                                    <h3 className="text-xl font-black font-heading uppercase text-zinc-900 dark:text-white leading-tight">
                                      {project.title}
                                    </h3>
                                    <p className="text-xs font-extrabold font-heading text-google-blue dark:text-blue-400 uppercase tracking-wider">
                                      {project.subtitle}
                                    </p>
                                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                                      {project.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Tags & Action Button */}
                                <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 text-[10px] font-extrabold uppercase shadow-[1px_1px_0px_#000]"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="flex gap-2">
                                    {project.liveUrl && (
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 font-black uppercase text-xs rounded-xl shadow-[3px_3px_0px_#000] border-2 border-black bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-google-blue hover:text-white transition-all cursor-pointer"
                                      >
                                        <ExternalLink size={14} />
                                        Launch Demo ↗
                                      </a>
                                    )}
                                    <button
                                      onClick={() => setActiveCaseStudy(project)}
                                      className="px-4 py-2.5 rounded-xl border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white text-xs font-black uppercase shadow-[3px_3px_0px_#000] hover:bg-zinc-100 transition-all cursor-pointer"
                                    >
                                      Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Tech Stack Tab */}
                    {activeTab === "tech" && (
                      <motion.div
                        key="tech-tab"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.65, ease: easeSmooth }}
                        className="w-full space-y-10"
                      >
                        {(
                          [
                            "Tech & Frameworks",
                            "Database",
                            "Cyber Security Tools",
                            "Operating Systems",
                            "Productivity",
                          ] as const
                        ).map((cat) => {
                          const themeColors = {
                            "Tech & Frameworks": { dot: "bg-google-blue" },
                            Database: { dot: "bg-google-purple" },
                            "Cyber Security Tools": { dot: "bg-google-red" },
                            "Operating Systems": { dot: "bg-google-green" },
                            Productivity: { dot: "bg-google-yellow" },
                          };

                          const items = techStack.filter((t) => t.category === cat);

                          return (
                            <div key={cat} className="space-y-4">
                              <div className="flex items-center gap-3 pb-2 border-b-2 border-black dark:border-zinc-800">
                                <span
                                  className={`w-3.5 h-3.5 rounded-full ${themeColors[cat].dot} border-2 border-black shadow-[1px_1px_0px_#000]`}
                                />
                                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
                                  {cat}
                                </h3>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 rounded border border-black dark:border-zinc-700">
                                  {items.length} Tools
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                                {items.map((tech) => (
                                  <div
                                    key={tech.name}
                                    className="group flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:border-google-blue transition-all duration-200 select-none text-center cursor-default min-h-30"
                                  >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center p-2 shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform duration-200 shrink-0">
                                      <Image
                                        src={tech.logoUrl}
                                        alt={tech.name}
                                        width={48}
                                        height={48}
                                        className={`w-full h-full object-contain ${tech.darkInvert ? "dark:invert" : ""}`}
                                      />
                                    </div>

                                    <div className="mt-2.5 space-y-1 w-full">
                                      <h4
                                        className="text-xs font-black uppercase text-zinc-950 dark:text-white truncate font-heading"
                                        title={tech.name}
                                      >
                                        {tech.name}
                                      </h4>
                                      <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 truncate max-w-full">
                                        {tech.tag}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Certificates Tab */}
                    {activeTab === "certificates" && (
                      <motion.div
                        key="certificates-tab"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.65, ease: easeSmooth }}
                        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                      >
                        {certificates.map((cert) => {
                          const colors = colorMap[cert.color] || colorMap.blue;
                          const thumbFilename = cert.credentialUrl
                            .split("/")
                            .pop()
                            ?.replace(/\.pdf$/i, ".webp");
                          const thumbUrl = `/certificates/thumbnails/${thumbFilename}`;

                          return (
                            <div
                              key={cert.title}
                              className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all duration-200"
                            >
                              <div>
                                <div
                                  onClick={() => setSelectedCert(cert.credentialUrl)}
                                  className="relative w-full aspect-16/10 mb-4 overflow-hidden rounded-xl border-2 border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-[2px_2px_0px_#000] cursor-pointer flex items-center justify-center group/thumb"
                                >
                                  <Image
                                    src={thumbUrl}
                                    alt={cert.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain object-center transition-transform duration-500 group-hover/thumb:scale-105"
                                  />

                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider backdrop-blur-[1px]">
                                    <ExternalLink size={14} />
                                    View Certificate
                                  </div>

                                  <div
                                    className={`absolute top-2.5 left-2.5 px-2 py-1 rounded border-2 border-black ${colors.badge} flex items-center gap-1 shadow-[2px_2px_0px_#000] text-[10px] font-black uppercase tracking-wider`}
                                  >
                                    <Award size={12} />
                                    Verified
                                  </div>

                                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black rounded text-[10px] font-extrabold shadow-[2px_2px_0px_#000]">
                                    {cert.date}
                                  </div>
                                </div>

                                <div className="space-y-1.5 mb-5 px-1">
                                  <h3
                                    className="text-sm sm:text-base font-black font-heading uppercase text-zinc-900 dark:text-white leading-snug line-clamp-2 min-h-10"
                                    title={cert.title}
                                  >
                                    {cert.title}
                                  </h3>
                                  <p className="text-[11px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase flex items-center gap-1.5 truncate">
                                    <BookOpen size={12} className="shrink-0 text-zinc-400" />
                                    <span className="truncate">{cert.issuer}</span>
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedCert(cert.credentialUrl)}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-extrabold uppercase text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:bg-google-blue hover:text-white transition-all cursor-pointer"
                              >
                                <ExternalLink size={13} />
                                Open PDF
                              </button>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl border-4 border-black dark:border-zinc-700 shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b-4 border-black dark:border-zinc-700 bg-google-blue text-white select-none">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block opacity-90">
                    Project Case Study
                  </span>
                  <h3 className="text-lg font-black uppercase tracking-tight font-heading">
                    {activeCaseStudy.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-1.5 rounded-lg border-2 border-black bg-white text-black hover:bg-zinc-150 shadow-[2px_2px_0px_#000] cursor-pointer"
                  aria-label="Close case study modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-left">
                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
                  <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-700">
                    Role: {activeCaseStudy.caseStudy.role}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-700">
                    Timeline: {activeCaseStudy.caseStudy.timeline}
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl border-2 border-black dark:border-zinc-700 bg-rose-50 dark:bg-rose-950/30">
                    <h4 className="font-black uppercase text-google-red mb-1 text-xs tracking-wider">
                      1. Masalah (The Challenge)
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {activeCaseStudy.caseStudy.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border-2 border-black dark:border-zinc-700 bg-blue-50 dark:bg-blue-950/30">
                    <h4 className="font-black uppercase text-google-blue mb-1 text-xs tracking-wider">
                      2. Solusi &amp; Peran Saya (The Solution)
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {activeCaseStudy.caseStudy.solution}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border-2 border-black dark:border-zinc-700 bg-emerald-50 dark:bg-emerald-950/30">
                    <h4 className="font-black uppercase text-google-green mb-1 text-xs tracking-wider">
                      3. Hasil &amp; Dampak (The Result)
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {activeCaseStudy.caseStudy.impact}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {activeCaseStudy.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-black/20 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {activeCaseStudy.liveUrl && (
                  <a
                    href={activeCaseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-google-blue text-white font-bold uppercase text-xs rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    Open Live Deployment
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[80vh] rounded-2xl border-4 border-black dark:border-zinc-700 shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b-4 border-black dark:border-zinc-700 bg-google-blue text-white select-none">
                <span className="text-sm font-black uppercase tracking-wider font-heading">
                  Certificate Viewer
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg border-2 border-black bg-white text-black hover:bg-zinc-150 shadow-[2px_2px_0px_#000] cursor-pointer"
                  aria-label="Close certificate modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 bg-zinc-150 dark:bg-zinc-950 p-2">
                <iframe
                  src={selectedCert}
                  className="w-full h-full rounded-xl border-2 border-black dark:border-zinc-800"
                  title="Certificate PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
