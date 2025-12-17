import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xwuvbztgpwhbwohontuh.supabase.co',
        pathname: '/**',
      },
    ],
  },
  // Optimize for production
  output: 'standalone',
};

export default nextConfig;
