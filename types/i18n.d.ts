// types/i18n.d.ts
import 'next-i18next'

declare module 'next-i18next' {
  interface AppWithTranslationProps {
    locale?: string
  }
}

export type Locale = 'nl' | 'en' | 'fr'
// t() geeft altijd een string terug (geen null), zodat teksten rechtstreeks in props passen
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}
