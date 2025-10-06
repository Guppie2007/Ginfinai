'use client'
import type { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Footer: FC = () => {
  const { t } = useTranslation('footer')

  return (
    <footer className="bg-gray-900/95 border-t border-purple-500/30 mt-24 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="p-1 border-2 border-purple-500 rounded-lg w-fit">
              <img
                src="/images/Ginfinai_small_nobg.png"
                alt="GinfinAI Logo"
                className="w-20 h-auto neon-filter"
              />
            </div>
            <p className="text-purple-300 neon-text-sm">{String(t('tagline', 'Innovative AI solutions'))}</p>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                aria-label="WhatsApp"
                href="https://wa.me/+32498420178"
                className="p-2 border border-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                {/* WhatsApp SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 text-white"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
              </a>

              <a
                aria-label="Email"
                href="mailto:info@ginfinai.be"
                className="px-3 py-2 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/20 transition-colors neon-text-sm text-base"
              >
                {String(t('email', 'info@ginfinai.be'))}
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg neon-text">{String(t('menu_title', 'Menu'))}</h4>
            <ul className="space-y-2">
              {[
                { key: 'home', href: '#home' },
                { key: 'services', href: '#doen' },
                { key: 'about', href: '#wiebenik' }
              ].map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-purple-300 hover:text-white transition-colors neon-text-sm text-base relative group"
                  >
                    <span>{String(t(link.key, link.key.charAt(0).toUpperCase() + link.key.slice(1)))}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-1/2"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg neon-text">{String(t('contact_title', 'Contact'))}</h4>
            <ul className="space-y-2 text-purple-300 neon-text-sm">
              <li>
                <a href="mailto:info@ginfinai.be" className="hover:text-white transition-colors">info@ginfinai.be</a>
              </li>
              <li>
                <a href="tel:+32498420178" className="hover:text-white transition-colors">+32 498 42 01 78</a>
              </li>
              <li>Notestraat 64, 1742 Ternat</li>
              <li>BTW BE1012.619.721</li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-between">
            <h4 className="text-white font-semibold mb-4 text-lg neon-text">{String(t('cta_title', 'Get in Touch'))}</h4>
            <a
              href="mailto:info@ginfinai.be"
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta text-center mt-auto"
            >
              {String(t('cta_button', 'Contact Us'))}
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-purple-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 neon-text-sm text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} GinfinAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-purple-300 hover:text-white transition-colors neon-text-sm text-sm">
                {String(t('privacy', 'Privacy'))}
              </Link>
              <Link href="/terms" className="text-purple-300 hover:text-white transition-colors neon-text-sm text-sm">
                {String(t('terms', 'Terms'))}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neon-text-sm {
          text-shadow: 0 0 4px rgba(168, 85, 247, 0.7);
        }

        .neon-button-cta {
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.7);
          border: 2px solid rgba(168, 85, 247, 0.5);
          font-weight: 600;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .neon-button-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent);
          transition: 0.5s;
        }

        .neon-button-cta:hover::before {
          left: 100%;
        }

        @media (min-width: 768px) {
          .neon-text-sm {
            text-shadow: 0 0 6px rgba(168, 85, 247, 0.7);
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer