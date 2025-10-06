'use client'
import Head from 'next/head'
import type { NextPage } from 'next'
import { motion } from 'framer-motion'
import ParticlesBackground from '../components/ParticlesBackground'
import InfinityOrbit from '../components/InfinityOrbit'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'nl', ['common', 'home', 'web', 'footer'])),
    },
  }
}

const Web: NextPage = () => {
  const { t } = useTranslation('web')
  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>

      {/* Main container with padding-top to account for fixed header */}
      <div className="pt-24"> {/* Added padding to prevent content from being hidden behind header */}
        {/* Hero Section with cyberpunk styling */}
        <section className="relative py-12 bg-gray-900">
          <ParticlesBackground />
          <InfinityOrbit />
                    
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 neon-text"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8">
            {/* Self-managed website card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 from-gray-900 via-purple-900 to-blue-900 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400/50 transition-all"
            >
                <h3 className="text-xl font-semibold text-white text-center mb-4 neon-text">
                {t('self_managed.title')}
              </h3>
                <p className="text-gray-300 text-center mb-6">{t('self_managed.description')}</p>
              <div className="text-center">
                <a
                  href="mailto:info@ginfinai.be?subject=Website in eigen beheer"
                  className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
                >
                  {t('contact_button')}
                </a>
              </div>
            </motion.div>

            {/* Managed website card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400/50 transition-all"
            >
                <h3 className="text-xl font-semibold text-white text-center mb-4 neon-text">{t('managed.title')}</h3>
                <p className="text-gray-300 text-center mb-6">{t('managed.description')}</p>
              <div className="text-center">
                <a
                  href="mailto:info@ginfinai.be?subject=Website in ons beheer"
                  className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
                >
                  {t('contact_button')}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Additional CTA Section */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-semibold text-white mb-4 neon-text"
            >
              {t('questions_title')}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto"
            >
              {t('questions_text')}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="mailto:info@ginfinai.be?subject=Vraag over web oplossingen"
              className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
            >
              {t('contact_button')}
            </motion.a>
          </div>
        </section>
      </div>

      {/* Global styles for consistent button styling */}
      <style jsx global>{`
        .neon-text {
          text-shadow: 0 0 6px rgba(168, 85, 247, 0.8);
        }

        .neon-button-cta {
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.7);
          border: 2px solid rgba(168, 85, 247, 0.5);
          font-weight: 600;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .neon-button-cta:hover::before {
          left: 100%;
        }

        @media (min-width: 768px) {
          .neon-text {
            text-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
          }
        }
      `}</style>
    </>
  )
}

export default Web