import type { NextConfig } from "next";

// Fix: Override stale system DATABASE_URL (old SQLite path) with correct Neon URL
// This runs before any application code or Prisma Client initialization
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_cznt6ZJxaUk9@ep-nameless-meadow-aye60ib0.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
