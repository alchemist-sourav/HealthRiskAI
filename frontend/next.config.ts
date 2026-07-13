import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Turbopack from scanning the user's home directory
    root: process.cwd(),
  },
  // Enforce strict mode for catching potential React issues early
  reactStrictMode: true,
};

export default nextConfig;
