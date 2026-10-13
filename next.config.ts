import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Izinkan akses dev server dari IP LAN (HP) dan Tailscale
  allowedDevOrigins: [
    "192.168.1.11:5173",
    "192.168.1.11",
    "192.168.1.33:5173",
    "192.168.1.33",
    "100.120.199.102:5173",
    "100.120.199.102",
  ],
  // Global HTTP Headers for Cross-Origin Resource Sharing (CORS)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
