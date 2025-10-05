import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    domains: [
      'media.formula1.com', // 🔥 Tämä rivi ratkaisee virheen
      'www.formula1.com',
      'api.openf1.org',
    ],
    formats: ['image/avif', 'image/webp', ]
  },
};


export default nextConfig;
