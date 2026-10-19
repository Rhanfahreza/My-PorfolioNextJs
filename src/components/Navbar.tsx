"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, Sun, Moon, ChevronDown, Terminal, Award } from "lucide-react";
import { useTheme } from "next-themes";

export type ExperienceTab = "projects" | "tech" | "certificates";

// Data structure definition for navigation items (anchor href, label text, and icon)
interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// Primary navigation menu items list
const navLinks: NavLink[] = [
  { href: "#home", label: "Home", icon: <Home size={16} /> },
  { href: "#about", label: "About", icon: <User size={16} /> },
  { href: "#work", label: "Experience", icon: <Briefcase size={16} /> },
  { href: "#contact", label: "Contact", icon: <Mail size={16} /> },
];

// Sub-navigation items for Experience dropdown
const experienceSubTabs: {
  key: ExperienceTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "projects", label: "Projects", icon: <Briefcase size={15} /> },
  { key: "tech", label: "Tech Stack", icon: <Terminal size={15} /> },
  { key: "certificates", label: "Certificates", icon: <Award size={15} /> },
];

interface NavbarProps {
  showContent?: boolean;
  activeExperienceTab?: ExperienceTab;
  onSelectExperienceTab?: (tab: ExperienceTab) => void;
  activeSection?: string;
  onActiveSectionChange?: (section: string) => void;
  onNavigateSection?: (targetHref: string, explicitTab?: ExperienceTab) => void;
  pendingTarget?: string | null;
}

export default function Navbar({
  showContent = false,
  activeExperienceTab = "projects",
  onSelectExperienceTab,
  activeSection: externalActiveSection,
  onActiveSectionChange,
  onNavigateSection,
  pendingTarget = null,
}: NavbarProps) {
  // State to track currently active section visible on screen
  const [activeSection, setActiveSection] = useState(externalActiveSection || "#home");
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (externalActiveSection) {
      setActiveSection(externalActiveSection);
      activeSectionRef.current = externalActiveSection;
    }
  }, [externalActiveSection]);

  // State dropdown hover pada menu Experience di desktop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // next-themes hook to toggle dark / light mode
  const { theme, setTheme } = useTheme();

  // State to track component mount status for client-side rendering (prevents SSR hydration mismatch)
  const [mounted, setMounted] = useState(false);

  // State to control floating mobile navbar expansion visibility
  const [isMobileVisible, setIsMobileVisible] = useState(true);

  // Timer references for auto-hide and scroll navigation protection
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);
  const navScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function: Opens mobile navbar when Menu button is tapped (3-second default inactivity timer)
  const openMobileNav = () => {
    setIsMobileVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsMobileVisible(false);
    }, 3000);
  };

  // Handler pergantian tema dengan efek gelombang lingkaran (Circular Ripple View Transition)
  const toggleTheme = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const nextTheme = theme === "dark" ? "light" : "dark";

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => {
        ready: Promise<void>;
        finished?: Promise<void>;
      };
    };

    // Fallback jika browser belum mendukung View Transitions atau preferensi reduced-motion aktif
    if (
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    // Ambil koordinat pusat tombol sebagai episentrum lingkaran
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);

    // Hitung jarak jari-jari ke sudut layar terjauh
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    // Set CSS variable agar animasi dijalankan secara native oleh GPU Compositor via globals.css
    document.documentElement.style.setProperty("--ripple-x", `${x}px`);
    document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    document.documentElement.style.setProperty("--ripple-radius", `${endRadius}px`);
    document.documentElement.setAttribute("data-theme-transitioning", "true");

    const cleanup = () => {
      document.documentElement.removeAttribute("data-theme-transitioning");
      document.documentElement.style.removeProperty("--ripple-x");
      document.documentElement.style.removeProperty("--ripple-y");
      document.documentElement.style.removeProperty("--ripple-radius");
    };

    try {
      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
      });

      if (transition?.finished) {
        transition.finished.finally(cleanup);
      } else {
        setTimeout(cleanup, 450);
      }
    } catch {
      setTheme(nextTheme);
      cleanup();
    }
  };

  // Nav click handler: smooth scrolls to target section and keeps navbar open for 5 seconds
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSection(href);
    onActiveSectionChange?.(href);

    // Flag active navigation to prevent smooth scroll from triggering immediate collapse
    isNavigatingRef.current = true;
    if (navScrollTimerRef.current) clearTimeout(navScrollTimerRef.current);
    navScrollTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);

    if (onNavigateSection) {
      onNavigateSection(href);
    } else {
      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetEl = document.querySelector(href) as HTMLElement | null;
        if (targetEl) {
          const top = targetEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }

    // Retain expanded mobile navbar for 5 seconds after link selection
    setIsMobileVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsMobileVisible(false);
    }, 5000);
  };

  // Initial 10-second timer on site load: keep mobile navbar visible for 10 seconds before auto-collapsing
  useEffect(() => {
    if (!showContent) return;
    timerRef.current = setTimeout(() => {
      setIsMobileVisible(false);
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (navScrollTimerRef.current) clearTimeout(navScrollTimerRef.current);
    };
  }, [showContent]);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    let rafId: number | null = null;

    // Scroll listener: minimizes mobile navbar on manual user scroll (bypassed during link navigation smooth scroll)
    const handleScroll = () => {
      if (!isNavigatingRef.current) {
        setIsMobileVisible((prev) => {
          if (prev) {
            if (timerRef.current) clearTimeout(timerRef.current);
            return false;
          }
          return prev;
        });
      }

      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        let currentSection = "#home";
        let maxVisibleHeight = 0;

        for (const link of navLinks) {
          const el = document.querySelector(link.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(window.innerHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              currentSection = link.href;
            }
          }
        }

        if (activeSectionRef.current !== currentSection) {
          activeSectionRef.current = currentSection;
          setActiveSection(currentSection);
          onActiveSectionChange?.(currentSection);
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(mountTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Floating Top Navbar */}
      <nav
        className={`fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-black dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] transition-[opacity,transform] duration-300 ease-out -translate-x-1/2 font-sans ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-1.5 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            const isExperience = link.href === "#work";

            if (isExperience) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-150 z-10 ${
                      isDropdownOpen
                        ? "text-google-blue font-bold"
                        : isActive
                        ? "text-black dark:text-white font-bold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {mounted && isActive && (
                      <motion.div
                        layoutId="activeNavIndicatorDesktop"
                        className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                          mass: 0.8,
                        }}
                      />
                    )}
                    <span className={isDropdownOpen ? "text-google-blue font-bold" : ""}>
                      {link.label}
                    </span>
                    <motion.span
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center justify-center"
                    >
                      <ChevronDown
                        size={12}
                        className={`transition-colors ${
                          isDropdownOpen
                            ? "text-google-blue font-bold"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      />
                    </motion.span>
                  </a>

                  {/* Dropdown Menu Unfolding Animation */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.94 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 26,
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 min-w-44"
                      >
                        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-2 border-black dark:border-zinc-700 rounded-xl p-1.5 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.12)] space-y-1">
                          {experienceSubTabs.map((tab) => {
                            return (
                              <button
                                key={tab.key}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setIsDropdownOpen(false);
                                  onSelectExperienceTab?.(tab.key);
                                  setActiveSection("#work");
                                  onActiveSectionChange?.("#work");
                                  if (onNavigateSection) {
                                    onNavigateSection("#work", tab.key);
                                  } else {
                                    const targetEl = document.querySelector("#work");
                                    if (targetEl) {
                                      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                  }
                                }}
                                className="group/item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer text-zinc-800 dark:text-zinc-200 border-2 border-transparent hover:border-black hover:bg-google-blue hover:text-white hover:shadow-[2px_2px_0px_#000] font-bold"
                              >
                                <span className="text-zinc-500 dark:text-zinc-400 group-hover/item:text-white shrink-0 transition-colors">
                                  {tab.icon}
                                </span>
                                <span className="text-xs uppercase tracking-wider whitespace-nowrap font-heading">
                                  {tab.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-150 z-10 ${
                  isActive
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {mounted && isActive && (
                  <motion.div
                    layoutId="activeNavIndicatorDesktop"
                    className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-lg -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Vertical divider line between nav links and theme toggle */}
        <div className="w-0.5 h-5 bg-black/20 dark:bg-zinc-700 mx-1" />

        {/* Dark / Light Mode Toggle Button with Micro-Animation & Ripple */}
        <button
          onClick={toggleTheme}
          className="relative p-2 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_#000] overflow-hidden flex items-center justify-center w-8.5 h-8.5"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!mounted ? (
              <div key="placeholder-dt" className="w-4 h-4" />
            ) : theme === "dark" ? (
              <motion.div
                key="dark-sun-dt"
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Sun size={16} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              </motion.div>
            ) : (
              <motion.div
                key="light-moon-dt"
                initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Moon size={16} className="text-zinc-800" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Floating Mobile Bottom Nav with Apple-Grade Dynamic Island Animation */}
      <div className="fixed bottom-5 left-0 right-0 z-50 md:hidden flex justify-center items-center pointer-events-none px-4 select-none touch-manipulation font-sans">
        {showContent && (
          <motion.div
            layout
            initial={false}
            animate={{
              width: isMobileVisible ? "100%" : "auto",
              maxWidth: isMobileVisible ? "24rem" : "7rem",
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
              mass: 0.8,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isMobileVisible) {
                openMobileNav();
              }
            }}
            className={`pointer-events-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] relative overflow-hidden flex items-center justify-center ${
              isMobileVisible ? "rounded-2xl p-1.5" : "rounded-full cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000]"
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isMobileVisible ? (
                /* EXPANDED CONTENT: Apple-Style Unfolding Blooming Effect (Center -> Outward) */
                <motion.div
                  key="nav-content-expanded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                  className="flex items-center justify-around relative z-10 w-full px-1"
                >
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.href;
                    const offsetPos = (idx - 1.5) * 16;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: offsetPos, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: offsetPos, scale: 0.75 }}
                        transition={{
                          duration: 0.24,
                          delay: 0.02 * idx,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-colors duration-150 z-10 ${
                          isActive
                            ? "text-black dark:text-white font-bold"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        <span className="scale-90">{link.icon}</span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider">{link.label}</span>
                        {mounted && isActive && (
                          <motion.div
                            layoutId="activeMobileNavIndicator"
                            className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-xl -z-10"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                              mass: 0.8,
                            }}
                          />
                        )}
                      </motion.a>
                    );
                  })}

                  {/* Vertical Divider Line between Nav Links and Theme Toggle */}
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-0.5 h-6 bg-black/20 dark:bg-zinc-700 rounded-full mx-0.5 shrink-0"
                  />

                  {/* Dark / Light Theme Toggle Button with Ripple & Spin */}
                  <motion.button
                    initial={{ opacity: 0, x: 26, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 26, scale: 0.75 }}
                    transition={{
                      duration: 0.24,
                      delay: 0.08,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    onClick={toggleTheme}
                    className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer active:scale-95"
                  >
                    <span className="scale-90 flex items-center justify-center w-5 h-5">
                      <AnimatePresence mode="wait" initial={false}>
                        {!mounted ? (
                          <div key="placeholder-mob" className="w-4 h-4" />
                        ) : theme === "dark" ? (
                          <motion.div
                            key="dark-sun-mob"
                            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="flex items-center justify-center"
                          >
                            <Sun size={16} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="light-moon-mob"
                            initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="flex items-center justify-center"
                          >
                            <Moon size={16} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider">
                      {!mounted ? "Theme" : theme === "dark" ? "Light" : "Dark"}
                    </span>
                  </motion.button>
                </motion.div>
              ) : (
                /* COLLAPSED CONTENT: Symmetrical Squeezing Pill Button "MENU" */
                <motion.div
                  key="nav-content-pill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  className="flex items-center justify-center px-7 py-2"
                >
                  <span className="font-sans font-bold text-xs uppercase tracking-widest text-black dark:text-white select-none whitespace-nowrap">
                    Menu
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
}
