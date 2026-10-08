import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../i18n'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
export default appWithTranslation(App)
