// next.config.js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// Ensure next-i18next server-side helper loads the CommonJS config
process.env.I18NEXT_DEFAULT_CONFIG_PATH = './next-i18next.config.cjs'
const nextI18NextConfig = require('./next-i18next.config.cjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ]
  },

  // De aparte webpagina is opgegaan in de homepage (sectie Diensten)
  async redirects() {
    return [{ source: '/web', destination: '/#diensten', permanent: false }]
  },
}

export default nextConfig
