import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Demo imagery for mock creators until real uploads exist.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
}

export default nextConfig
