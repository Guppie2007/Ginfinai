import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../lib/i18nConfig'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'nl', ['common'], i18nConfig)),
  },
})

export default function NotFound() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{`${t('notFound.title')} · GinfinAI`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section id="inhoud" className="mx-auto flex max-w-[720px] flex-col items-start gap-5 px-6 py-32">
        <div className="eyebrow text-brand">404</div>
        <h1 className="h2">{t('notFound.title')}</h1>
        <p className="m-0 text-lg text-muted">{t('notFound.text')}</p>
        <Link href="/" className="btn-primary">
          {t('notFound.home')}
        </Link>
      </section>
    </>
  )
}
