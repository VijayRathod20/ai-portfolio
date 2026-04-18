import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for external images if needed
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Ensure server-only modules aren't bundled for client
  serverExternalPackages: ["gray-matter", "reading-time"],
};

export default nextConfig;
