import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import GdgBackground from "@/components/GdgBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

// Konsep: Inisialisasi tipografi modern via Google Fonts (next/font/google) untuk performa cepat tanpa layout shift (CLS)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk", 
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Konsep: Metadata SEO & OpenGraph untuk mengoptimalkan pencarian di Google dan pratinjau link media sosial
export const metadata: Metadata = {
  title: "Rayhan Arie Fahreza | My Personal Website",
  description:
    "Portfolio of Rayhan Arie Fahreza — Major Software Engineer and Cybersecurity . Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Rayhan Arie Fahreza",
    "Software Engineer",
    "Cybersecurity",
    "Portfolio",
    "Next.js",
  ],
};

// Konsep: Root Layout (Pembungkus utama seluruh halaman website berisi konfigurasi HTML, font, tema, dan patching Google Translate)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Script khusus untuk mencegah error DOM React saat fitur Google Translate diaktifkan oleh pengunjung */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Patch DOM Node.prototype.insertBefore dan removeChild agar React tidak crash saat Google Translate menerjemahkan halaman
                const originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function (newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Google Translate DOM mismatch detected during insertBefore, falling back gracefully.');
                    }
                    return this.appendChild(newNode);
                  }
                  return originalInsertBefore.call(this, newNode, referenceNode);
                };

                const originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function (child) {
                  if (child && child.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Google Translate DOM mismatch detected during removeChild, falling back gracefully.');
                    }
                    if (child.parentNode) {
                      return child.parentNode.removeChild(child);
                    }
                    return child;
                  }
                  return originalRemoveChild.call(this, child);
                };

                // Observer otomatis untuk mengoreksi hasil terjemahan kaku dari Google Translate
                const fixTranslationDictionary = () => {
                  const replacements = [
                    { wrong: /^Rumah$/i, correct: "Beranda" },
                    { wrong: /^Pekerjaan Saya$/i, correct: "Portofolio" },
                    { wrong: /^Jelajahi Pekerjaan$/i, correct: "Lihat Portofolio" },
                  ];

                  const walkNodes = (node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                      const trimmed = node.nodeValue ? node.nodeValue.trim() : "";
                      for (const item of replacements) {
                        if (item.wrong.test(trimmed)) {
                          node.nodeValue = node.nodeValue.replace(item.wrong, item.correct);
                        }
                      }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                      if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'INPUT' && node.tagName !== 'TEXTAREA') {
                        node.childNodes.forEach(walkNodes);
                      }
                    }
                  };

                  walkNodes(document.body);
                };

                const observer = new MutationObserver(() => {
                  if (document.documentElement.classList.contains('translated-ltr') || document.documentElement.classList.contains('translated-rtl') || document.querySelector('font')) {
                    fixTranslationDictionary();
                  }
                });

                document.addEventListener('DOMContentLoaded', () => {
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    characterData: true
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative transition-colors duration-200" suppressHydrationWarning>
        {/* Provider Tema Gelap/Terang & Latar Belakang Animasi GDG */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <GdgBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
