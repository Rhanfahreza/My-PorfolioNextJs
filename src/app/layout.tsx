import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import GdgBackground from "@/components/GdgBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://rayhan.ackteams.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rayhan Arie Fahreza — Web Developer, Go & Cybersecurity",
    template: "%s | Rayhan Arie Fahreza",
  },
  description:
    "Portfolio of Rayhan Arie Fahreza: Software Engineering student specializing in Next.js, Go (Golang) backend architecture, web security auditing, and Linux.",
  keywords: [
    "Rayhan Arie Fahreza",
    "Software Engineer Bogor",
    "Go Backend Developer",
    "Next.js Developer Indonesia",
    "Web Security Researcher",
    "CTF Player Indonesia",
    "Acknowledge Teams",
    "ACK Teams",
    "SMK Plus Pelita Nusantara",
  ],
  authors: [{ name: "Rayhan Arie Fahreza", url: SITE_URL }],
  creator: "Rayhan Arie Fahreza",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: SITE_URL,
    siteName: "Rayhan Arie Fahreza Portfolio",
    title: "Rayhan Arie Fahreza — Web Developer, Go & Cybersecurity",
    description:
      "Building fast, resilient web applications with Next.js & Go—hardened through offensive security testing and CTF research.",
    images: [
      {
        url: "/Foto-Profil-Github.jpeg",
        width: 800,
        height: 800,
        alt: "Rayhan Arie Fahreza — Software Engineering & Cybersecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayhan Arie Fahreza — Web Developer, Go & Cybersecurity",
    description:
      "Software Engineering student focused on Next.js, Go backend systems, XSS auditing, and Arch Linux.",
    images: ["/Foto-Profil-Github.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rayhan Arie Fahreza",
  url: SITE_URL,
  image: `${SITE_URL}/Foto-Profil-Github.jpeg`,
  jobTitle: "Software Developer & Cybersecurity Enthusiast",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "SMK Plus Pelita Nusantara Bogor",
  },
  memberOf: {
    "@type": "Organization",
    name: "Acknowledge Teams (ACK Teams)",
    url: "https://www.ackteams.com/",
  },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Go (Golang)",
    "Web Application Security",
    "Cross-Site Scripting (XSS) Auditing",
    "Capture The Flag (CTF)",
    "Arch Linux",
  ],
  sameAs: [
    "https://github.com/Rhanfahreza",
    "https://www.linkedin.com/in/rayhan-arie-fahreza-6408a138a/",
    "https://www.instagram.com/rayhanarfhrz/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col relative transition-colors duration-200"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <GdgBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
