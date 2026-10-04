import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/ScavengerHunt",
        destination: "https://elvis.davidlarrimore.com/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
