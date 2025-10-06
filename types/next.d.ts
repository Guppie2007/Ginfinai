// types/next.d.ts
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Locale } from './i18n'

declare module 'next' {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  }

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }
}

declare module 'next-i18next' {
  interface UserConfig {
    i18n: {
      defaultLocale: Locale
      locales: Locale[]
      localeDetection?: boolean
    }
  }
}