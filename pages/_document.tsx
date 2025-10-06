import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
// Ensure the CJS config is used by server-side helpers
process.env.I18NEXT_DEFAULT_CONFIG_PATH = './next-i18next.config.cjs'
const nextI18NextConfig = require('../next-i18next.config.cjs')

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const currentLocale = (this.props as any).__NEXT_DATA__?.locale || nextI18NextConfig.i18n.defaultLocale
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    return (
      <Html lang={currentLocale}>
        <Head>
          <meta httpEquiv="Content-Language" content={currentLocale} />
          {/* hreflang alternates for SEO */}
          {nextI18NextConfig.i18n.locales.map((lng: string) => (
            <link
              key={lng}
              rel="alternate"
              hrefLang={lng}
              href={`${siteUrl}/${lng === nextI18NextConfig.i18n.defaultLocale ? '' : lng}`}
            />
          ))}

          {/* Fonts and Analytics */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-2DP92KLE3B"></script>
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2DP92KLE3B');` }} />

          {/* Structured Data */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
            "@context": {
              "name": {"@id": "http://xmlns.com/foaf/0.1/name","@language": "en"},
              "age": {"@id": "http://xmlns.com/foaf/0.1/age","@type": "http://www.w3.org/2001/XMLSchema#integer"},
              "worksFor": "http://schema.org/worksFor",
              "knowsAbout": "http://schema.org/knowsAbout",
              "jobTitle": "http://schema.org/jobTitle",
              "knows": {"@id": "http://xmlns.com/foaf/0.1/knows","@type": "@id"},
              "attendee": {"@id": "http://schema.org/attendee","@type": "@id"},
              "startDate": {"@id": "http://schema.org/startDate","@type": "http://www.w3.org/2001/XMLSchema#date"}
            },
            "@id": "https://ginfinai.be/#me",
            "@type": "http://schema.org/Person",
            "name": "Gerben Ceuppens",
            "age": 23,
            "worksFor": {
              "@id":"https://aisquare.be/",
              "@type": "http://schema.org/Organization",
              "name": "AI Square"
            },
            "knowsAbout": "GraphRAG",
            "jobTitle": "Student MSc Computer Science Engineering",
            "attendee": {
              "@id": "https://pietercolpaert.be/teaching/kg/#2024-2025",
              "@type": "http://schema.org/CourseInstance",
              "startDate": "2025-02-14"
            },
            "knows": [
              "https://sandervandamme.com#me",
              "https://lynnvkerckhove.github.io/graphPub/docs/LynnVK.ttl#me",
              "https://bavop.github.io/rep/#me"
            ]
          }` }} />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* WhatsApp widget styles and script (loaded client-side) */}
          <style dangerouslySetInnerHTML={{ __html: `
            .wa__btn { background-color: #a855f7 !important; border: 2px solid rgba(168,85,247,0.5) !important; box-shadow: 0 0 15px rgba(168,85,247,0.7) !important; transition: all 0.3s ease !important; }
            .wa__btn:hover { background-color: #9349d8 !important; box-shadow: 0 0 20px rgba(168,85,247,0.9) !important; transform: translateY(-2px) !important; }
            .wa__widget_container { border-radius: 12px !important; box-shadow: 0 0 30px rgba(168,85,247,0.3) !important; border: 1px solid rgba(168,85,247,0.3) !important; background: rgba(17,24,39,0.95) !important; backdrop-filter: blur(10px) !important; }
          ` }} />
          <script src="https://d2mpatx37cqexb.cloudfront.net/delightchat-whatsapp-widget/embeds/embed.min.js" async></script>
          <script dangerouslySetInnerHTML={{ __html: `
            var wa_btnSetting = {"btnColor":"#a855f7","ctaText":"","cornerRadius":50,"marginBottom":20,"marginLeft":20,"marginRight":20,"btnPosition":"right","whatsAppNumber":"32498420178","welcomeMessage":"Hallo!\\nHoe kan ik u helpen?","zIndex":999999,"btnColorScheme":"dark"};
            var wa_widgetSetting = {"title":"GinfinAI","subTitle":"Antwoord normaal gezien binnen de dag","headerBackgroundColor":"#a855f7","headerColorScheme":"light","greetingText":"Hallo! \\n+Hoe kan ik u helpen?","ctaText":"Stuur een bericht","btnColor":"#a855f7","cornerRadius":12,"welcomeMessage":"Hallo! Hoe kan ik u helpen?","btnColorScheme":"dark","brandImage":"/images/Ginfinai_small_nobg.png","brandSize":"50","darkHeaderColorScheme":{"title":"#e5e7eb","subTitle":"#9ca3af"}};
            window.onload = function() { if(window._waEmbed) { _waEmbed(wa_btnSetting, wa_widgetSetting); setTimeout(()=>{ const widget=document.querySelector('.wa__widget_container'); if(widget) widget.classList.add('custom-wa-widget'); },1000);} };
          ` }} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
