import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { 
    unoptimized: true 
  },
  // Порт можно задать и здесь
  // Но для разработки лучше через package.json
};

export default nextConfig;
