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
  RefreshCw,
} from "lucide-react";

// Data structure & tipe properti project
interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "blue" | "red" | "green";
  icon: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  mockBg: string;
}

// Data daftar project portofolio
const projects: Project[] = [
  {
    title: "ACK Teams Hackathon",
    subtitle: "AI Quiz Generator Platform",
    description:
      "Developed at the Build with AI Hackathon event by GDGOC BINUS @Alam Sutera, this platform automates quiz generation for teachers based on selected topics and grade levels.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "blue",
    icon: <Lock size={18} />,
    liveUrl: "https://hackathon.ackteams.com",
    mockBg: "from-blue-600/20 via-indigo-500/10 to-transparent",
  },
  {
    title: "Erpeel School Portal",
    subtitle: "Software Engineering Major Portal",
    description:
      "A facial recognition system built with Teachable Machine during a school event at SMK Plus Pelita Nusantara. Uses a live camera feed to detect and identify individual members in real time.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Education"],
    color: "green",
    icon: <BookOpen size={18} />,
    liveUrl: "https://website-erpeel.vercel.app/",
    mockBg: "from-emerald-600/20 via-teal-500/10 to-transparent",
  },
  {
    title: "Toko Casual",
    subtitle: "E-Commerce Web Application",
    description:
      "A casual apparel e-commerce web app built with native PHP, using JSON file storage for user authentication and a simulated payment process. Features product catalog management, a shopping cart, and mock checkout processing.",
    tags: ["PHP", "HTML5", "CSS3", "E-Commerce", "JSON"],
    color: "red",
    icon: <ShoppingBag size={18} />,
    liveUrl: "https://toko-casual-production.up.railway.app/login.php",
    mockBg: "from-rose-600/20 via-orange-500/10 to-transparent",
  },
];

// Data structure tech stack
interface TechItem {
  name: string;
  category:
    | "Tech & Frameworks"
    | "Cyber Security Tools"
    | "Operating Systems"
    | "Productivity";
  logoUrl: string;
  darkInvert?: boolean;
  tag: string;
}

// List daftar tech stack & tools
const techStack: TechItem[] = [
  // Tech & Frameworks
  {
    name: "HTML5",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    tag: "Markup",
  },
  {
    name: "CSS3",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    tag: "Styling",
  },
  {
    name: "JavaScript",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tag: "Scripting",
  },
  {
    name: "TypeScript",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tag: "Fullstack",
  },
  {
    name: "React",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tag: "Frontend Library",
  },
  {
    name: "React Native",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tag: "Mobile Apps",
  },
  {
    name: "Next.js",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    darkInvert: true,
    tag: "Fullstack",
  },
  {
    name: "Tailwind CSS",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    tag: "Styling",
  },
  {
    name: "PHP",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    tag: "Backend",
  },
  {
    name: "GO Lang",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    tag: "Backend / Microservices",
  },
  {
    name: "Laravel",
    category: "Tech & Frameworks",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    tag: "PHP Framework",
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
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wireshark.svg",
    tag: "Packet Analysis",
  },
  {
    name: "Metasploit",
    category: "Cyber Security Tools",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/metasploit.svg",
    tag: "Penetration Testing",
  },
  {
    name: "Burp Suite",
    category: "Cyber Security Tools",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/portswigger.svg",
    tag: "Web Sec Auditing",
  },

  // Operating Systems
  {
    name: "Kali Linux",
    category: "Operating Systems",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kalilinux.svg",
    tag: "Security OS",
  },
  {
    name: "Manjaro",
    category: "Operating Systems",
    logoUrl: "/Manjaro_Os-removebg-preview.png",
    tag: "Base Arch Linux",
  },
  {
    name: "Athena OS",
    category: "Operating Systems",
    logoUrl: "/athena-os-logo-150x150-removebg-preview.png",
    tag: "Security OS",
  },
  {
    name: "Arch Linux",
    category: "Operating Systems",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/archlinux/archlinux-original.svg",
    tag: "Distro",
  },
  {
    name: "Linux",
    category: "Operating Systems",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    tag: "Kernel",
  },
  {
    name: "Black Arch",
    category:"Operating Systems",
    logoUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrgzoeM3BvZNlWo3CSB6QOfieq4WinwObtSUxhR2pDA&s=10",
    tag:"Pentest OS",
  },
  {
    name: "Windows",
    category: "Operating Systems",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    tag: "OS",
  },

  // Productivity
  {
    name: "VS Code",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    tag: "IDE Editor",
  },
  {
    name: "GitHub",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    darkInvert: true,
    tag: "Version Control",
  },
  {
    name: "Figma",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tag: "UI/UX Design",
  },
  {
    name: "Microsoft Excel",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftexcel.svg",
    darkInvert: true,
    tag: "Data Analysis",
  },
  {
    name: "Microsoft Word",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftword.svg",
    darkInvert: true,
    tag: "Documentation",
  },
  {
    name: "Microsoft PowerPoint",
    category: "Productivity",
    logoUrl:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftpowerpoint.svg",
    darkInvert: true,
    tag: "Presentations",
  },
  {
    name: "Photoshop",
    category: "Productivity",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2hvPAxVs5rt5-wVTKdn4kZDtnfJW8UN90YJuclPriA&s=10",
    darkInvert: true,
    tag: "Editing",
  },
  {
    name:"GIMP",
    category:"Productivity",
    logoUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomIPgSxP7F0r3uR-eXgsytaK7d5YDRj5fWeNwg8WdRA&s=10",
    darkInvert:true,
    tag:"Editing",
  }
];

// Data structure sertifikat
interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  color: "blue" | "red" | "green" | "purple" | "yellow" | "pink";
}

// Data daftar sertifikat
const certificates: Certificate[] = [
  {
    title: "HackerOne Inside for Cyber Security Enthusiast",
    issuer: "CodeLamp And HackerOne",
    date: "2025",
    credentialUrl:
      "/certificates/HackerOne_Inside_for_Cyber_Security_Enthusiast.pdf",
    color: "blue",
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
    credentialUrl:
      "/certificates/Penerapan-Data-Science-dengan-Microsoft-Fabric.pdf",
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
    title:
      "Why Your Game Isn't Selling: Market Validation for Indie Developers",
    issuer: "Dicoding",
    date: "2025",
    credentialUrl: "/certificates/Market-Validation-for-Indie-Developers.pdf",
    color: "green",
  },
  {
    title: "Clash Of Cyber Heist",
    issuer: "Telkom University",
    date: "2025",
    credentialUrl: "/certificates/fsociety_Top10.pdf",
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
    title: "From Vision to Version 1.0: Roadmapping Your Game Effectively",
    issuer: "CodeLamp Indonesia",
    date: "2025",
    credentialUrl:
      "/certificates/From Vision to Version 1.0_ Roadmapping Your Game Effectively.pdf",
    color: "red",
  },
  {
    title: "Game Design: From Hobby to Hook",
    issuer: "CodeLamp Indonesia",
    date: "2025",
    credentialUrl:
      "/certificates/Game Design_ From Hobby to Hook - Hooked in Minutes, Engaged for Days.pdf",
    color: "pink",
  },
];

/**
 * Map Tema Warna (Color Mapping):
 * Menghubungkan kata kunci warna dengan kelas utilitas Tailwind CSS untuk komponen visual.
 */
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
    dot: "bg-purple-600",
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
type WebsiteStatus = "checking" | "online" | "offline";

export default function ProjectGrid({}: { showContent?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, WebsiteStatus>>({});

  // Deteksi status online/offline setiap link live project
  useEffect(() => {
    projects.forEach((project) => {
      if (!project.liveUrl) return;

      setStatusMap((prev) => ({ ...prev, [project.title]: "checking" }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Ping HEAD request dengan fallback GET
      fetch(project.liveUrl, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      })
        .then(() => {
          clearTimeout(timeoutId);
          setStatusMap((prev) => ({ ...prev, [project.title]: "online" }));
        })
        .catch(() => {
          clearTimeout(timeoutId);
          fetch(project.liveUrl!, { mode: "no-cors" })
            .then(() =>
              setStatusMap((prev) => ({ ...prev, [project.title]: "online" })),
            )
            .catch(() =>
              setStatusMap((prev) => ({ ...prev, [project.title]: "offline" })),
            );
        });
    });
  }, []);

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi (Judul Utama & Tab Sub-Navigasi) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-google-blue text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000]">
              Portfolio Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
              Projects &amp; Skills
            </h2>
            <div className="w-16 h-2 bg-google-blue border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-sm mt-2 mx-auto md:mx-0"></div>
          </div>

          {/* Sub Navigation (Tabs) */}
          <div className="flex flex-wrap justify-center gap-2.5 bg-zinc-100 dark:bg-zinc-900/60 p-2 rounded-xl border-2 border-black dark:border-zinc-800 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] mx-auto md:mx-0">
            {(["projects", "tech", "certificates"] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              const labels = {
                projects: { text: "Projects", icon: <Briefcase size={15} /> },
                tech: { text: "Tech Stack", icon: <Terminal size={15} /> },
                certificates: {
                  text: "Certificates",
                  icon: <Award size={15} />,
                },
              };

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-google-blue text-white border-black shadow-[3px_3px_0px_#000]"
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-transparent hover:border-black dark:hover:border-zinc-600"
                  }`}
                >
                  {labels[tab].icon}
                  {labels[tab].text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="min-h-105">
          <AnimatePresence mode="wait">
            {/* Projects Tab */}
            {activeTab === "projects" && (
              <motion.div
                key="projects-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                {projects.map((project) => {
                  const colors = colorMap[project.color];
                  const status = statusMap[project.title] || "checking";

                  return (
                    <div
                      key={project.title}
                      className={`group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-2xl p-5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.12)] ${colors.border} hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.22)] transition-all duration-200`}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Banner preview project */}
                          <div
                            className={`relative w-full aspect-video mb-5 rounded-xl border-2 border-black dark:border-zinc-700 overflow-hidden ${colors.badge} p-4 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] flex flex-col justify-between group/banner bg-zinc-900`}
                          >
                            {/* Live screenshot otomatis */}
                            {project.liveUrl && (
                              <Image
                                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(project.liveUrl)}?w=800&h=500`}
                                alt={`${project.title} live screenshot`}
                                fill
                                unoptimized
                                className="absolute inset-0 object-cover object-top opacity-85 group-hover/banner:scale-105 transition-transform duration-500 z-0"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display =
                                    "none";
                                }}
                              />
                            )}

                            {/* Overlay Lapisan Gelap untuk Keterbacaan Teks */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/60 z-1" />

                            {/* Baris Atas Banner: Ikon Akses & Tombol Link Cepat */}
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
                                    title="Source Code"
                                  >
                                    <Code size={14} />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Badge domain & status online/offline */}
                            <div className="z-10 mt-auto pt-4 flex items-center justify-between gap-2 flex-wrap">
                              <span className="inline-block px-2.5 py-1 bg-black/80 text-white rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20 backdrop-blur-sm">
                                {project.liveUrl
                                  ? new URL(project.liveUrl).hostname
                                  : "Live App"}
                              </span>

                              {/* Indikator Lencana Status Keaktifan Server Target */}
                              {status === "checking" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 text-yellow-300 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-yellow-400/40 backdrop-blur-sm shadow-[1px_1px_0px_#000]">
                                  <RefreshCw
                                    size={10}
                                    className="animate-spin text-yellow-300"
                                  />
                                  Checking
                                </span>
                              )}
                              {status === "online" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 text-emerald-400 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/40 backdrop-blur-sm shadow-[1px_1px_0px_#000]">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                                  Online
                                </span>
                              )}
                              {status === "offline" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 text-rose-400 rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-rose-500/40 backdrop-blur-sm shadow-[1px_1px_0px_#000]">
                                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                  Offline
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Detail Judul Proyek, Sub-judul, dan Deskripsi Singkat */}
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

                        {/* Bottom Tag Pills & Action Button */}
                        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 text-[10px] font-extrabold uppercase shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#000]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 font-black uppercase text-xs rounded-xl shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] transition-all cursor-pointer border-2 border-black ${
                                status === "offline"
                                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-300"
                                  : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-google-blue hover:text-white dark:hover:bg-google-blue dark:hover:text-white hover:border-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
                              }`}
                            >
                              <ExternalLink size={14} />
                              {status === "offline"
                                ? "View Project (Offline) ↗"
                                : "View Project ↗"}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Tab 2: Tech Stack Grid */}
            {activeTab === "tech" && (
              <motion.div
                key="tech-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
              >
                {(
                  [
                    "Tech & Frameworks",
                    "Cyber Security Tools",
                    "Operating Systems",
                    "Productivity",
                  ] as const
                ).map((cat) => {
                  const themeColors = {
                    "Tech & Frameworks": {
                      dot: "bg-google-blue",
                      border: "border-google-blue",
                    },
                    "Cyber Security Tools": {
                      dot: "bg-google-red",
                      border: "border-google-red",
                    },
                    "Operating Systems": {
                      dot: "bg-google-green",
                      border: "border-google-green",
                    },
                    Productivity: {
                      dot: "bg-google-yellow",
                      border: "border-google-yellow",
                    },
                  };

                  const items = techStack.filter((t) => t.category === cat);

                  return (
                    <div key={cat} className="space-y-4">
                      {/* Judul Kategori & Hitungan Jumlah Alat (Tools Count) */}
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

                      {/* Grid Kartu Ikon Teknologi (Responsive Grid 6 Kolom) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                        {items.map((tech) => (
                          <div
                            key={tech.name}
                            className="group flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#000] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.2)] hover:border-google-blue transition-all duration-200 select-none text-center cursor-default min-h-30"
                          >
                            {/* Wadah Logo Ikon Teknologi */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center p-2 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform duration-200 shrink-0">
                              <Image
                                src={tech.logoUrl}
                                alt={tech.name}
                                width={48}
                                height={48}
                                unoptimized
                                className={`w-full h-full object-contain ${tech.darkInvert ? "dark:invert" : ""}`}
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display =
                                    "none";
                                }}
                              />
                            </div>

                            {/* Label Nama Teknologi & Tag Spesialisasi */}
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

            {/* Tab 3: Certificate Grid */}
            {activeTab === "certificates" && (
              <motion.div
                key="certificates-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                {certificates.map((cert) => {
                  const colors = colorMap[cert.color] || colorMap.blue;
                  const thumbFilename = cert.credentialUrl
                    .split("/")
                    .pop()
                    ?.replace(/\.pdf$/i, ".png");
                  const thumbUrl = `/certificates/thumbnails/${thumbFilename}`;

                  return (
                    <div
                      key={cert.title}
                      className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.12)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.25)] transition-all duration-200"
                    >
                      <div>
                        {/* Box Gambar Thumbnail Pratinjau Sertifikat */}
                        <div
                          onClick={() => setSelectedCert(cert.credentialUrl)}
                          className="relative w-full aspect-16/10 mb-4 overflow-hidden rounded-xl border-2 border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] cursor-pointer flex items-center justify-center group/thumb"
                        >
                          <Image
                            src={thumbUrl}
                            alt={cert.title}
                            fill
                            unoptimized
                            className="object-contain object-center transition-transform duration-500 group-hover/thumb:scale-105"
                          />

                          {/* Overlay Tombol Aksi saat Di-hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider backdrop-blur-[1px]">
                            <ExternalLink size={14} />
                            View Certificate
                          </div>

                          {/* Lencana Terverifikasi (Top Left Badge) */}
                          <div
                            className={`absolute top-2.5 left-2.5 px-2 py-1 rounded border-2 border-black ${colors.badge} flex items-center gap-1 shadow-[2px_2px_0px_#000] text-[10px] font-black uppercase tracking-wider`}
                          >
                            <Award size={12} />
                            Verified
                          </div>

                          {/* Tahun Terbit Sertifikat (Top Right Pill) */}
                          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black rounded text-[10px] font-extrabold shadow-[2px_2px_0px_#000]">
                            {cert.date}
                          </div>
                        </div>

                        {/* Judul Sertifikat & Organisasi Penerbit */}
                        <div className="space-y-1.5 mb-5 px-1">
                          <h3
                            className="text-sm sm:text-base font-black font-heading uppercase text-zinc-900 dark:text-white leading-snug line-clamp-2 min-h-10"
                            title={cert.title}
                          >
                            {cert.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase flex items-center gap-1.5 truncate">
                            <BookOpen
                              size={12}
                              className="shrink-0 text-zinc-400"
                            />
                            <span className="truncate">{cert.issuer}</span>
                          </p>
                        </div>
                      </div>

                      {/* Tombol Buka Viewer PDF Sertifikat */}
                      <button
                        onClick={() => setSelectedCert(cert.credentialUrl)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-extrabold uppercase text-xs rounded-xl shadow-[3px_3px_0px_#000] hover:bg-google-blue hover:text-white hover:border-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        View Certificate
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal viewer PDF sertifikat */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[80vh] rounded-2xl border-4 border-black dark:border-zinc-700 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal Popup */}
              <div className="flex items-center justify-between p-4 border-b-4 border-black dark:border-zinc-700 bg-google-blue text-white select-none">
                <span className="text-sm font-black uppercase tracking-wider font-heading">
                  Certificate Viewer
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg border-2 border-black bg-white text-black hover:bg-zinc-150 shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Badan Modal (Iframe PDF) */}
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
