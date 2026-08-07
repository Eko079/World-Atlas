import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  allowedDevOrigins: ["**.monkeycode-ai.live"]
};

export default nextConfig;
