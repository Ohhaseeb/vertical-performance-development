import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't run ESLint during production builds for faster deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
