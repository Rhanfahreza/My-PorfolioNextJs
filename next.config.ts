import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
