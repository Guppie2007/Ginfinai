// i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'nl',
      ns: ['common', 'home', 'header'],
      defaultNS: 'common',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    })
}

export default i18n