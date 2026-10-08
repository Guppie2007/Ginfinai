import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

const LOCALES = ['nl', 'en', 'fr'] as const

export default function Header() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const current = router.locale || 'nl'

  // Menu sluiten bij navigatie en met Escape
  useEffect(() => {
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    router.events.on('hashChangeStart', close)
    router.events.on('routeChangeStart', close)
    window.addEventListener('keydown', onKey)
    return () => {
      router.events.off('hashChangeStart', close)
      router.events.off('routeChangeStart', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [router.events])

  const links = [
    { href: '/#diensten', label: t('nav.services') },
    { href: '/#werk', label: t('nav.work') },
    { href: '/#aanpak', label: t('nav.approach') },
    { href: '/#over', label: t('nav.about') },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-ink-line bg-ink">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-30 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        {t('skip')}
      </a>
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" aria-label={t('nav.home')} className="flex items-center">
          <img
            src="/brand/ginfinai-logo-horizontaal-op-donker.svg"
            alt="GinfinAI"
            width={176}
            height={40}
            className="block h-10 w-auto"
          />
        </Link>

        <nav aria-label={t('nav.main')} className="hidden items-center gap-7 text-[15px] nav:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ondark no-underline hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div role="group" aria-label={t('nav.language')} className="mr-1.5 hidden gap-0.5 text-[13px] nav:flex">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={router.asPath}
                locale={l}
                scroll={false}
                lang={l}
                aria-current={l === current ? 'true' : undefined}
                className={
                  'px-2 py-3 no-underline ' +
                  (l === current ? 'font-semibold text-white' : 'text-ondark-2 hover:text-white')
                }
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link
            href="/#contact"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-brand px-[18px] text-[15px] font-medium text-white no-underline hover:bg-brand-deep hover:text-white"
          >
            <span className="hidden nav:inline">{t('nav.cta')}</span>
            <span className="nav:hidden">{t('nav.ctaShort')}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A3170] bg-transparent text-white nav:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobiel-menu" aria-label={t('nav.mobile')} className="flex flex-col gap-1 border-t border-ink-line px-6 pb-5 pt-2 nav:hidden">
          {[...links, { href: '/#contact', label: t('nav.contact') }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[17px] text-white no-underline">
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-1 border-t border-ink-line pt-3 text-[15px]">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={router.asPath}
                locale={l}
                scroll={false}
                lang={l}
                aria-current={l === current ? 'true' : undefined}
                className={'px-3 py-3 no-underline ' + (l === current ? 'font-semibold text-white' : 'text-ondark-2')}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
