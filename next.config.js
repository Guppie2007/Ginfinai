// next.config.js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// Ensure next-i18next server-side helper loads the CommonJS config
process.env.I18NEXT_DEFAULT_CONFIG_PATH = './next-i18next.config.cjs'
const nextI18NextConfig = require('./next-i18next.config.cjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: nextI18NextConfig.i18n,

  // images configuration
  images: {
    // domains: [],
  },

  // For development convenience
  // This is not part of i18n but general Next.js config
  eslint: {
     ignoreDuringBuilds: true,
  },
}

export default nextConfig