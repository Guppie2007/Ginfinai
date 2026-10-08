import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Onest, Quicksand, JetBrains_Mono } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../i18n'

// Lettertypes zelf gehost via next/font: geen Google-verzoek bij elk bezoek, geen render-blokkerende stylesheet
const onest = Onest({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })
const quicksand = Quicksand({ subsets: ['latin'], weight: '700', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: '400', display: 'swap' })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style>{`:root{--font-onest:${onest.style.fontFamily};--font-quicksand:${quicksand.style.fontFamily};--font-mono:${mono.style.fontFamily}}`}</style>
      <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
      <SpeedInsights />
      </div>
    </>
  )
}
export default appWithTranslation(App)
