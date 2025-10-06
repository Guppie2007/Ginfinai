// next-i18next.config.js (CommonJS)
const path = require('path')

const i18n = {
  defaultLocale: 'nl',
  locales: ['nl', 'en', 'fr'],
  localeDetection: false,
}

const nextI18NextConfig = {
  i18n,
  // location of translation files
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = nextI18NextConfig
