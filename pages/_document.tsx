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

          {/* Favicon en app-iconen (GinfinAI-logopakket) */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#130E28" />

          {/* Lettertypes: Onest (tekst), Quicksand Bold (woordmerk, Bern), JetBrains Mono (sectielabels) */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Quicksand:wght@700&family=JetBrains+Mono:wght@400&display=swap"
            rel="stylesheet"
          />

          {/* Analytics */}
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

        </body>
      </Html>
    )
  }
}

export default MyDocument
