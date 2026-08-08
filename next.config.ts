import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles deployment natively — do NOT use output: "standalone" */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
