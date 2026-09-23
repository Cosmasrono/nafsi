import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/programmes",
        permanent: true,
      },
      {
        source: "/projects/:slug*",
        destination: "/programmes/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
