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

    return (
      <Html lang={currentLocale}>
        <Head>
          <meta httpEquiv="Content-Language" content={currentLocale} />
          {/* Favicon en app-iconen (GinfinAI-logopakket) */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#130E28" />
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
