import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample product imagery is served from Unsplash.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
