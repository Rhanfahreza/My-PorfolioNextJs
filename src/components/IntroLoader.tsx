"use client";

import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onFinished: () => void;
}

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isColorActive, setIsColorActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // State to track website rendering readiness percentage (0% - 100%)
  const [progress, setProgress] = useState(0);

  const word1 = "RAYHAN".split("");
  const word2 = "ARIE".split("");
  const word3 = "FAHREZA".split("");

  useEffect(() => {
    let targetProgress = 10;

    // Sensor 1: DOM & Document Ready State Detection
    const checkDomReady = () => {
      if (document.readyState === "complete") {
        targetProgress = Math.max(targetProgress, 40);
      } else if (document.readyState === "interactive") {
        targetProgress = Math.max(targetProgress, 25);
      }
    };
    checkDomReady();

    // Sensor 2: Font Readiness Detection (Google Fonts & Web Fonts)
    if (document.fonts) {
      document.fonts.ready.then(() => {
        targetProgress = Math.max(targetProgress, 65);
      });
    }

    // Sensor 3: Media Assets & Image Readiness Detection
    const images = Array.from(document.images);
    let loadedImages = 0;

    if (images.length === 0) {
      targetProgress = Math.max(targetProgress, 85);
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener("load", () => {
            loadedImages++;
            const imgProgress = 65 + Math.floor((loadedImages / images.length) * 25);
            targetProgress = Math.max(targetProgress, imgProgress);
          });
          img.addEventListener("error", () => {
            loadedImages++;
            const imgProgress = 65 + Math.floor((loadedImages / images.length) * 25);
            targetProgress = Math.max(targetProgress, imgProgress);
          });
        }
      });
      if (loadedImages === images.length) {
        targetProgress = Math.max(targetProgress, 90);
      }
    }

    // Sensor 4: Full Window Load Event Detection
    const handleWindowLoad = () => {
      targetProgress = 100;
    };

    if (document.readyState === "complete") {
      targetProgress = 100;
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // Timer Interval: Smoothly drives the percentage counter (smooth increment towards target score)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < targetProgress) {
          const next = prev + Math.ceil((targetProgress - prev) * 0.2) || prev + 1;
          return Math.min(next, 100);
        }

        // When progress hits 100%, clear interval
        if (prev >= 100) {
          clearInterval(interval);
        }
        return prev;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  // Completion Phase after Progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      // 1. Activate Google/GDG brand colors on developer name text
      const colorTimer = setTimeout(() => {
        setIsColorActive(true);
      }, 200);

      // 2. Start fade-out opacity transition on loader screen
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 700);

      // 3. Hide loader component completely and trigger onFinished callback to reveal portfolio
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onFinished();
      }, 1200);

      return () => {
        clearTimeout(colorTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onFinished]);

  if (!isVisible) return null;

  // Helper function to render letters with staggered slide-up animation
  const renderWord = (wordArr: string[], startIndex: number, colorClass: string) => {
    return (
      <span className="inline-flex whitespace-nowrap">
        {wordArr.map((letter, i) => {
          const globalIndex = startIndex + i;
          return (
            <span
              key={globalIndex}
              className="inline-block transform font-poppins font-bold tracking-tight transition-all duration-700 ease-out-expo"
              style={{
                animation: `slideUpFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both`,
                animationDelay: `${globalIndex * 0.04}s`,
                color: isColorActive ? `var(${colorClass})` : "currentColor",
              }}
            >
              {letter}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#F8F9FA] dark:bg-[#0f1013] text-[#202124] dark:text-[#e8eaed] transition-all duration-600 ease-out-expo ${
        isFadingOut ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
    >
      {/* CSS Keyframes Rules */}
      <style>{`
        @keyframes slideUpFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Developer Name Title Animation */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 md:gap-x-6 text-4xl sm:text-6xl md:text-7xl select-none font-poppins font-bold">
        {renderWord(word1, 0, "--color-google-blue")}
        {renderWord(word2, word1.length, "--color-google-red")}
        {renderWord(word3, word1.length + word2.length, "--color-google-green")}
      </div>

      {/* Loading Sensor Progress Bar & Percentage Counter */}
      <div className="mt-8 flex flex-col items-center gap-3 font-poppins font-bold">
        {/* Progress Bar Container with Neo-Brutalism Styling */}
        <div className="w-56 sm:w-72 h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 rounded-full overflow-hidden p-0.5 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
          <div
            className="h-full bg-google-blue rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Percentage Text: LOADING [progress]% */}
        <div className="flex items-center justify-center font-poppins text-xs sm:text-sm font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
          <span>LOADING&nbsp;</span>
          <span className="text-black dark:text-white font-poppins text-sm sm:text-base font-bold">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
