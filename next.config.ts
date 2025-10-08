import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://github.com/Zytronium.png'), ],
  },
};

export default nextConfig;
