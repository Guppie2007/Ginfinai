'use client'
import Link from 'next/link'
import { useState, useEffect, type FC } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('header')

  const currentLanguage = router.locale || 'nl'
  const validLocales = ['nl', 'en', 'fr']

  const changeLanguage = (lang: string) => {
    if (!validLocales.includes(lang)) return
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: lang, scroll: false })
    setLanguageOpen(false)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 20)
      }, 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target as HTMLElement).closest('.language-selector')) {
        setLanguageOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener)
    }
  }, [])

  return (
    <header
      className={clsx(
        'fixed w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/30 shadow-lg'
          : 'bg-transparent border-transparent'
      )}
    >
      {/* Language dropdown */}
      <div className="absolute top-4 right-4 z-50 language-selector">
        <div className="relative">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors text-sm"
          >
            {currentLanguage.toUpperCase()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {languageOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/30 z-50">
              <div className="py-1">
                {validLocales.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={clsx(
                      'block w-full text-left px-4 py-2 text-sm',
                      currentLanguage === lang
                        ? 'text-white bg-purple-500/20'
                        : 'text-purple-300 hover:bg-purple-500/10'
                    )}
                  >
                    {lang === 'nl' ? 'Nederlands' : lang === 'en' ? 'English' : 'Français'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center py-4">
          {/* Left nav */}
          <nav className="hidden md:flex gap-8 justify-self-start">
            <Link
              href="/#home"
              locale={currentLanguage}
              className="text-purple-300 hover:text-white transition-colors neon-text relative group"
            >
              <span className="text-lg font-medium">{t('home', 'Home')}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/#doen"
              locale={currentLanguage}
              className="text-purple-300 hover:text-white transition-colors neon-text relative group"
            >
              <span className="text-lg font-medium">{t('services', 'Services')}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Center logo */}
          <div className="flex justify-center">
            <div className="relative group">
              <div
                className={clsx(
                  'absolute -inset-2 bg-purple-500 rounded-full blur-lg opacity-0 transition-opacity duration-300',
                  scrolled ? 'group-hover:opacity-50' : 'opacity-30'
                )}
              ></div>
              <Link href="/" locale={currentLanguage} className="block p-1 border-2 border-purple-500 rounded-lg transition-all hover:scale-105">
                <img
                  src="/images/Ginfinai_small_nobg.png"
                  alt="GinfinAI Logo"
                  className="h-20 w-auto object-contain neon-filter"
                />
              </Link>
            </div>
          </div>

          {/* Right nav */}
          <nav className="hidden md:flex gap-8 items-center justify-self-end">
            <Link
              href="/#wiebenik"
              locale={currentLanguage}
              className="text-purple-300 hover:text-white transition-colors neon-text relative group"
            >
              <span className="text-lg font-medium">{t('about', 'About')}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </Link>
            <a
              href="mailto:info@ginfinai.be"
              className="px-5 py-2.5 border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-colors rounded-lg neon-text text-lg font-medium hover:shadow-purple-500/30"
            >
              {t('contact', 'Contact')}
            </a>
          </nav>

          {/* Mobile menu */}
          <button
            className="md:hidden absolute right-4 p-2 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {open && (
          <>
            <div
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            ></div>
            <div className="fixed inset-x-0 top-16 z-50 md:hidden border-t border-purple-500/30 bg-gray-900/95 backdrop-blur-sm animate-fadeIn">
              <nav className="flex flex-col gap-4 items-center py-4 px-4">
                {['home', 'services', 'about'].map((key) => (
                  <Link
                    key={key}
                    href={`#${key === 'services' ? 'doen' : key}`}
                    locale={currentLanguage}
                    className="text-purple-300 hover:text-white w-full text-center py-3 border-b border-purple-500/30 neon-text text-xl font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {t(key, key.charAt(0).toUpperCase() + key.slice(1))}
                  </Link>
                ))}
                <a
                  href="mailto:info@ginfinai.be"
                  className="text-purple-300 hover:text-white w-full text-center py-3 bg-purple-500/10 rounded-lg border border-purple-500 neon-text text-xl font-medium mt-2"
                  onClick={() => setOpen(false)}
                >
                  {t('contact', 'Contact')}
                </a>
              </nav>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 6px rgba(168, 85, 247, 0.8);
          font-size: 1.1rem;
        }
        .neon-filter {
          filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.8));
        }
        @media (min-width: 768px) {
          .neon-text {
            font-size: 1.2rem;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Header