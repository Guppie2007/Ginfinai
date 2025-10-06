// types/i18n.d.ts
import 'next-i18next'

declare module 'next-i18next' {
  interface AppWithTranslationProps {
    locale?: string
  }
}

export type Locale = 'nl' | 'en' | 'fr'