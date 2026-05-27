import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.killough.works",
          },
        ],
        destination: "https://killough.works/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
