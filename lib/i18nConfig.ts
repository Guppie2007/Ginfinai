import path from 'path'

/**
 * Config voor serverSideTranslations. Expliciet doorgeven zorgt ervoor dat Vercel
 * de instellingen meebundelt; anders zoekt next-i18next tijdens het draaien naar
 * next-i18next.config.cjs in /var/task en vindt het die niet (500-fout).
 * Houd dit gelijk met next-i18next.config.cjs (die gebruikt next.config.js).
 */
const i18nConfig = {
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'fr'],
    localeDetection: false as const,
  },
  localePath: path.resolve('./public/locales'),
}

export default i18nConfig
