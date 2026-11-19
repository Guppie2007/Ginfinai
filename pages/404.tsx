import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import Link from 'next/link'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../lib/i18nConfig'
import BernChat, { BernHandle } from '../components/BernChat'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'nl', ['common'], i18nConfig)),
  },
})

export default function NotFound() {
  const { t } = useTranslation('common')
  const bern = useRef<BernHandle>(null)
  return (
    <>
      <Head>
        <title>{`${t('notFound.title')} · GinfinAI`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section id="inhoud" className="dotgrid bg-ink text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-start justify-center gap-5 px-6 py-24">
          <Image src="/brand/bern-avatar.png" alt="" width={72} height={72} unoptimized className="h-[72px] w-[72px]" />
          <div className="eyebrow text-ondark-2">404</div>
          <h1 className="h2 m-0 text-white">{t('notFound.title')}</h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-ondark">{t('notFound.text')}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/" className="btn-primary whitespace-nowrap">
              {t('notFound.home')}
            </Link>
            <button type="button" onClick={() => bern.current?.open()} className="btn-ghost-dark cursor-pointer bg-transparent">
              {t('notFound.ask')}
            </button>
          </div>
        </div>
      </section>
      <BernChat ref={bern} />
    </>
  )
}
