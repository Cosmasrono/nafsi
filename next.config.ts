import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**", search: "" }],
  },
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
