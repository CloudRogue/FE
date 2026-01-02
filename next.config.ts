import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  source: "/api/:path*",
  destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
};

export default nextConfig;
