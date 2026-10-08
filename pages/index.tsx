import Head from 'next/head'
import { useRef, useState } from 'react'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LogoMark from '../components/LogoMark'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'
import BernChat, { BernHandle } from '../components/BernChat'
import ProgressRail from '../components/ProgressRail'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'nl', ['common', 'home'])),
  },
})

type WorkItem = { tag: string; title: string; desc: string; result: string; image: string }
type Step = { title: string; text: string }

const OG_LOCALE: Record<string, string> = { nl: 'nl_BE', en: 'en_GB', fr: 'fr_BE' }
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ginfinai.be'

export default function Home() {
  const { t } = useTranslation('home')
  const { locale = 'nl', defaultLocale = 'nl' } = useRouter()
  const [selected, setSelected] = useState('w0')
  const [open, setOpen] = useState<string | null>('w0')
  const [subject, setSubject] = useState(0)
  const bern = useRef<BernHandle>(null)
  const railWrap = useRef<HTMLDivElement>(null)

  const facts = t('facts', { returnObjects: true }) as unknown as string[]
  const work = t('work.items', { returnObjects: true }) as unknown as WorkItem[]
  const steps = t('approach.steps', { returnObjects: true }) as unknown as Step[]
  const url = SITE + (locale === defaultLocale ? '/' : `/${locale}`)

  const select = (id: string) => {
    setSelected(id)
    setOpen((o) => (o === id ? null : id))
  }

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content={`${SITE}/brand/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={OG_LOCALE[locale] || 'nl_BE'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section id="top" className="dotgrid bg-ink text-white">
        <div className="mx-auto flex max-w-page flex-wrap items-center gap-12 px-6 pb-14 pt-[72px]">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <div className="eyebrow text-ondark-2">{t('hero.eyebrow')}</div>
            <h1 className="m-0 text-[clamp(40px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.025em]">
              {t('hero.title1')}
              <br />
              <span className="text-brand-accent">
                {t('hero.title2')}
                <br />
                {t('hero.title3')}
              </span>
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] leading-relaxed text-ondark">{t('hero.lead')}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contact" className="btn-primary">
                {t('hero.ctaMessage')}
              </a>
              <a href="https://wa.me/32498420178" className="btn-ghost-dark">
                {t('hero.ctaWhatsapp')}
              </a>
            </div>
            <button
              type="button"
              onClick={() => bern.current?.open()}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 self-start border-0 bg-transparent p-0 text-left text-[15px] text-brand-light hover:text-white"
            >
              <img src="/brand/bern-avatar.png" alt="" width={32} height={32} className="h-8 w-8" />
              {t('hero.askBern')}
            </button>
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] justify-center">
            <LogoMark
              onPick={(g) => {
                const id = g === 'web' ? 'w0' : 'a0'
                setSelected(id)
                setOpen(id)
              }}
            />
          </div>
        </div>
        <div className="border-t border-ink-line">
          <ul className="m-0 mx-auto flex max-w-page list-none flex-wrap gap-x-10 gap-y-3 px-6 py-5 text-sm text-ondark-2">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <div ref={railWrap} id="inhoud" className="relative">
        <ProgressRail wrap={railWrap} />

        {/* 01 Diensten */}
        <section id="diensten" className="rp mx-auto flex max-w-page flex-col gap-10 px-6 pb-[72px] pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-[640px] flex-col gap-2.5">
              <div data-rail className="eyebrow text-brand">
                {t('services.eyebrow')}
              </div>
              <h2 className="h2">{t('services.title')}</h2>
            </div>
            <p className="m-0 max-w-[380px] text-base leading-relaxed text-muted">{t('services.intro')}</p>
          </div>
          <Services selected={selected} open={open} onSelect={select} onAsk={setSubject} />
        </section>

        {/* 02 Werk */}
        <section id="werk" className="bg-lavender">
          <div className="rp mx-auto flex max-w-page flex-col gap-10 px-6 py-24">
            <div className="flex max-w-[640px] flex-col gap-2.5">
              <div data-rail className="eyebrow text-brand">
                {t('work.eyebrow')}
              </div>
              <h2 className="h2">{t('work.title')}</h2>
            </div>
            <div className="flex flex-wrap gap-6">
              {work.map((w) => (
                <article key={w.title} className="flex min-w-0 flex-[1_1_480px] flex-col gap-[18px] rounded-[20px] border border-line bg-white p-5">
                  {/* TODO: echte screenshot (next/image) zodra beschikbaar */}
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-selected text-sm text-[#5A5478]">{w.image}</div>
                  <div className="flex flex-col gap-2 px-1 pb-1">
                    <div className="text-[13px] font-semibold uppercase text-brand">{w.tag}</div>
                    <h3 className="m-0 text-2xl font-semibold">{w.title}</h3>
                    <p className="m-0 text-base leading-relaxed text-muted">{w.desc}</p>
                    <p className="m-0 text-[15px] text-[#2C2550]">{w.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Aanpak */}
        <section id="aanpak" className="rp mx-auto flex max-w-page flex-col gap-10 px-6 py-24">
          <div className="flex max-w-[640px] flex-col gap-2.5">
            <div data-rail className="eyebrow text-brand">
              {t('approach.eyebrow')}
            </div>
            <h2 className="h2">{t('approach.title')}</h2>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-4 top-[13px] hidden h-1.5 rounded-[3px] bg-brand nav:block"
              style={{ right: 'calc((100% - 64px) / 3 - 16px)' }}
            />
            <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 p-0">
              {steps.map((s, i) => {
                const last = i === steps.length - 1
                return (
                  <li key={s.title} className="flex flex-col gap-3.5">
                    <span
                      aria-hidden="true"
                      className={
                        'box-border h-8 w-8 rounded-full border-[7px] ' + (last ? 'border-brand-deep bg-brand-light' : 'border-brand bg-white')
                      }
                    />
                    <span className="eyebrow text-brand">{t('approach.step', { n: i + 1 })}</span>
                    <h3 className="m-0 text-[22px] font-semibold">{s.title}</h3>
                    <p className="m-0 max-w-[340px] text-base leading-relaxed text-muted">{s.text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* 04 Over mij */}
        <section id="over" className="bg-ink text-white">
          <div className="rp mx-auto flex max-w-page flex-wrap items-center gap-14 px-6 py-24">
            <img
              src="/images/me_2025.jpg"
              alt={t('about.photoAlt')}
              width={380}
              height={475}
              loading="lazy"
              className="aspect-[4/5] w-[380px] min-w-0 max-w-full flex-[0_1_380px] rounded-3xl object-cover"
            />
            <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
              <div data-rail className="eyebrow text-brand-accent">
                {t('about.eyebrow')}
              </div>
              <h2 className="h2">{t('about.title')}</h2>
              <p className="m-0 max-w-[640px] text-lg leading-[1.65] text-ondark">{t('about.p1')}</p>
              <p className="m-0 text-lg leading-[1.65] text-ondark">{t('about.p2')}</p>
              <div className="flex max-w-[560px] items-center gap-3.5 rounded-2xl bg-ink-3 px-[18px] py-4">
                <img src="/brand/bern-avatar.png" alt="" width={48} height={48} loading="lazy" className="h-12 w-12 flex-shrink-0" />
                <p className="m-0 text-[15px] leading-normal text-ondark" dangerouslySetInnerHTML={{ __html: t('about.bern') }} />
              </div>
            </div>
          </div>
        </section>

        {/* 05 Contact */}
        <section id="contact" className="rp mx-auto flex max-w-page flex-wrap gap-12 px-6 py-24">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
            <div data-rail className="eyebrow text-brand">
              {t('contact.eyebrow')}
            </div>
            <h2 className="h2">{t('contact.title')}</h2>
            <p className="m-0 text-[17px] leading-relaxed text-muted">{t('contact.intro')}</p>
            <div className="flex flex-col border-t border-line">
              <a href="mailto:info@ginfinai.be" className="flex flex-col gap-1 border-b border-line py-4 text-ink no-underline hover:text-brand">
                <span className="text-[13px] text-muted">{t('contact.emailLabel')}</span>
                <span className="text-[17px]">info@ginfinai.be</span>
              </a>
              <a href="https://wa.me/32498420178" className="flex flex-col gap-1 border-b border-line py-4 text-ink no-underline hover:text-brand">
                <span className="text-[13px] text-muted">{t('contact.phoneLabel')}</span>
                <span className="text-[17px]">+32 498 42 01 78</span>
              </a>
              <div className="flex flex-col gap-1 border-b border-line py-4">
                <span className="text-[13px] text-muted">{t('contact.regionLabel')}</span>
                <span className="text-[17px]">{t('contact.region')}</span>
              </div>
            </div>
          </div>
          <div className="relative min-w-0 flex-[1_1_560px] rounded-3xl bg-lavender p-8 max-[480px]:p-5">
            <ContactForm subject={subject} onSubject={setSubject} />
          </div>
        </section>
      </div>

      <BernChat ref={bern} />
    </>
  )
}
