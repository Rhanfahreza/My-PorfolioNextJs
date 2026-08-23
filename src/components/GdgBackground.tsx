"use client";

import { motion } from "framer-motion";

// Konsep: Komponen Latar Belakang GDG (Ornamen titik-titik radial grid & elemen geometris melayang dengan warna Google/GDG)
export default function GdgBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-background transition-colors duration-200">
      {/* Konsep: Pola titik-titik radial grid transparan */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* GDG Geometric Shapes / Coding symbols in Google Colors */}

      {/* Konsep: Simbol kurung siku buka `<` melayang berwarna Google Blue */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1, y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[4%] font-mono text-[160px] font-black text-google-blue select-none hidden lg:block"
      >
        &lt;
      </motion.div>

      {/* Konsep: Simbol garis miring `/` melayang berwarna Google Red */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1, y: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[45%] right-[5%] font-mono text-[180px] font-black text-google-red select-none hidden lg:block"
      >
        /
      </motion.div>

      {/* Konsep: Ornamen cincin bundar melayang berwarna Google Yellow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12, x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[6%] w-36 h-36 rounded-full border-18 border-google-yellow hidden lg:block"
      />

      {/* Konsep: Simbol kurung siku tutup `>` melayang berwarna Google Green */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1, y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[8%] font-mono text-[150px] font-black text-google-green select-none hidden lg:block"
      >
        &gt;
      </motion.div>

      {/* Konsep: Ornamen dekorasi tambahan (bulatan merah, kotak biru miring, & simbol coding lainnya) */}
      <div className="absolute top-[10%] right-[30%] w-6 h-6 rounded-full bg-google-red opacity-10 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[60%] left-[25%] w-8 h-8 bg-google-blue opacity-10 rotate-25 rounded-md" />
      <div className="absolute bottom-[40%] right-[25%] font-mono text-5xl font-extrabold text-google-yellow opacity-10 select-none">{"{}"}</div>
      <div className="absolute top-[35%] left-[40%] font-mono text-6xl font-black text-google-green opacity-5 select-none">+</div>
      <div className="absolute bottom-[15%] left-[30%] font-mono text-7xl font-black text-google-yellow opacity-10 select-none">;</div>
    </div>
  );
}
