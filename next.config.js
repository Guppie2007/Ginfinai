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

  // De aparte webpagina is opgegaan in de homepage (sectie Diensten)
  async redirects() {
    return [{ source: '/web', destination: '/#diensten', permanent: false }]
  },
}

export default nextConfig
