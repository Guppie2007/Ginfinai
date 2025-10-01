// next.config.js (ESM-style because package.json sets "type": "module")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images served from public/; add domains array if you load remote images
  images: {
    // domains: [],
  },
  // Example: uncomment to expose env vars at build-time
  // env: {
  //   NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  // },
}

export default nextConfig
