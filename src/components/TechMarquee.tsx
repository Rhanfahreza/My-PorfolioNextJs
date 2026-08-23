"use client";

import { motion } from "framer-motion";

// Konsep: Interface tipe data untuk setiap teknologi (Nama teknologi & kode warna identitasnya)
interface TechItem {
  name: string;
  color: string;
}

// Konsep: Daftar teknologi utama yang dikuasai
const techStack: TechItem[] = [
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "PHP", color: "#777BB4" },
  { name: "GO Lang", color: "#044bffff" },
  { name: "GitHub", color: "#181717" },
  { name: "Laravel", color: "#EE2E03" },
  { name: "Figma", color: "#24CB71" },
];

// Konsep: Sub-komponen lencana (badge) bergaya Neo-Brutalisme untuk menampilkan 1 ikon & nama teknologi
function TechBadge({ tech }: { tech: TechItem }) {
  return (
    <div className="group flex items-center gap-2.5 px-4 py-2.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all select-none shrink-0 cursor-default">
      <div
        className="w-3 h-3 rounded-full border border-black dark:border-zinc-700 shrink-0 group-hover:scale-110 transition-transform duration-150"
        style={{ backgroundColor: tech.color }}
      />
      <span className="text-sm font-bold text-black dark:text-white whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

// Konsep: Komponen Marquee (Running text horizontal otomatis yang menampilkan daftar teknologi tanpa henti)
export default function TechMarquee() {
  // Menggandakan array techStack agar animasi marquee berjalan terus-menerus tanpa jeda (looping seamless)
  const duplicated = [...techStack, ...techStack];

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-sm font-black uppercase tracking-widest text-black dark:text-white mb-2">
            Tech Stack
          </h2>
          <p className="text-gray-800 dark:text-gray-200 font-bold text-sm">
            Technologies I work with and love
          </p>
        </motion.div>
      </div>

      {/* Konsep: Container baris running text yang berjalan dari kanan ke kiri */}
      <div className="relative py-4">
        <div className="flex animate-marquee w-max gap-6">
          {duplicated.map((tech, idx) => (
            <TechBadge key={`${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
