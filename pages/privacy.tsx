import Head from 'next/head'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { asArray } from '../components/asArray'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'nl', ['common', 'privacy'])),
  },
})

type Section = { h: string; p: string[] }

export default function Privacy() {
  const { t } = useTranslation('privacy')
  const sections = asArray<Section>(t('sections', { returnObjects: true }))

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="robots" content="noindex" />
      </Head>
      <article id="inhoud" className="mx-auto flex max-w-[720px] flex-col gap-8 px-6 py-24">
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow text-brand">{t('eyebrow')}</div>
          <h1 className="h2">{t('title')}</h1>
          <p className="m-0 text-sm text-muted">{t('updated')}</p>
        </div>
        {sections.map((s) => (
          <section key={s.h} className="flex flex-col gap-3">
            <h2 className="m-0 text-[22px] font-semibold">{s.h}</h2>
            {s.p.map((p) => (
              <p key={p} className="m-0 text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </>
  )
}
