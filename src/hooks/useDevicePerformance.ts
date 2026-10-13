"use client";

import { useState, useEffect } from "react";

export interface DevicePerformance {
  isLowEnd: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  canAnimateHeavy: boolean;
}

/**
 * Hook pendeteksi kapabilitas perangkat ("HP Kentang" & low-spec hardware detection).
 * Mengukur:
 * 1. prefers-reduced-motion (Aksesibilitas & preferensi sistem)
 * 2. navigator.hardwareConcurrency (Jumlah core CPU, <= 4 tergolong entry/budget)
 * 3. navigator.deviceMemory (RAM dalam GB, <= 4GB tergolong low-spec)
 * 4. navigator.connection.saveData (Mode hemat data aktif)
 * 5. Screen viewport mobile
 */
export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isLowEnd: false,
    reducedMotion: false,
    isMobile: false,
    canAnimateHeavy: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Cek prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = reducedMotionQuery.matches;

    // 2. Cek CPU Cores (Budget smartphone biasanya 4 core atau throttling)
    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;

    // 3. Cek RAM (Device Memory API - didukung Chromium / Android)
    const navAny = typeof navigator !== "undefined" ? (navigator as unknown as { deviceMemory?: number; connection?: { saveData?: boolean } }) : {};
    const memory = navAny.deviceMemory || 8;

    // 4. Cek mode hemat data (Save-Data header)
    const saveData = Boolean(navAny.connection?.saveData);

    // 5. Cek lebar layar mobile
    const isMobile = window.innerWidth < 768;

    // Indikator perangkat kentang / low-spec
    const isLowEnd = reducedMotion || saveData || memory <= 4 || (isMobile && cores <= 4);
    const canAnimateHeavy = !isLowEnd && !reducedMotion;

    setPerformance({
      isLowEnd,
      reducedMotion,
      isMobile,
      canAnimateHeavy,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPerformance((prev) => ({
        ...prev,
        reducedMotion: e.matches,
        canAnimateHeavy: !prev.isLowEnd && !e.matches,
      }));
    };

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", handleMotionChange);
      return () => reducedMotionQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  return performance;
}
