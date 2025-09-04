import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Para repositórios username.github.io, não precisa de basePath
  // basePath: process.env.NODE_ENV === 'production' ? '/rogeriocordeiro.github.io' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/rogeriocordeiro.github.io/' : '',
};

export default nextConfig;
