import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Only initialize the react-i18next integration on the client
// This avoids hydration errors when server-rendering with next-i18next
if (typeof window !== 'undefined') {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      // we don't provide resources here; serverSideTranslations will hydrate them
      lng: 'nl',
      fallbackLng: 'nl',
      ns: ['common', 'home', 'header', 'web', 'footer'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      debug: false,
    })
  }
}

export default i18n
