"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderGit2, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

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
  { href: "#work", label: "Portfolio", icon: <FolderGit2 size={16} /> },
  { href: "#contact", label: "Contact", icon: <Mail size={16} /> },
];

export default function Navbar({ showContent = false }: { showContent?: boolean }) {
  // State to track currently active section visible on screen
  const [activeSection, setActiveSection] = useState("#home");

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

  // Nav click handler: smooth scrolls to target section and keeps navbar open for 5 seconds
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSection(href);

    // Flag active navigation to prevent smooth scroll from triggering immediate collapse
    isNavigatingRef.current = true;
    if (navScrollTimerRef.current) clearTimeout(navScrollTimerRef.current);
    navScrollTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
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

        setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
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
        className={`fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-black dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] transition-[opacity,transform] duration-300 ease-out -translate-x-1/2 font-poppins ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-1.5 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
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

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_#000]"
          aria-label="Toggle theme"
        >
          {!mounted ? (
            <div className="w-4 h-4" />
          ) : theme === "dark" ? (
            <Sun size={16} className="text-yellow-400" />
          ) : (
            <Moon size={16} className="text-zinc-800" />
          )}
        </button>
      </nav>

      {/* Floating Mobile Bottom Nav with Apple-Grade Dynamic Island Animation */}
      <div className="fixed bottom-5 left-0 right-0 z-50 md:hidden flex justify-center items-center pointer-events-none px-4 select-none touch-manipulation font-poppins">
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

                  {/* Dark / Light Theme Toggle Button */}
                  <motion.button
                    initial={{ opacity: 0, x: 26, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 26, scale: 0.75 }}
                    transition={{
                      duration: 0.24,
                      delay: 0.08,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                    className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <span className="scale-90">
                      {!mounted ? (
                        <div className="w-4 h-4" />
                      ) : theme === "dark" ? (
                        <Sun size={16} className="text-yellow-400" />
                      ) : (
                        <Moon size={16} />
                      )}
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
                  <span className="font-poppins font-bold text-xs uppercase tracking-widest text-black dark:text-white select-none whitespace-nowrap">
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
