'use client'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ParticlesBackground from '../components/ParticlesBackground'
import InfinityOrbit from '../components/InfinityOrbit'
import FuturisticNodes from '../components/FuturisticNodes'
import Parallax from 'react-parallax-tilt'
import { TypeAnimation } from 'react-type-animation'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'nl', ['common', 'home', 'header', 'footer'])),
    },
  }
}

export default function Home() {
  const { t } = useTranslation(['common', 'home'])

  const services = [
    {
      title: String(t('home:services.webdesign.title', 'Webdesign')),
      text: String(t('home:services.webdesign.description', '')),
      icon: '/icons/webdesign.svg',
      link: '/web',
      button: String(t('home:services.webdesign.button', 'Learn More')),
    },
    {
      title: String(t('home:services.update.title', 'Update')),
      text: String(t('home:services.update.description', '')),
      icon: '/icons/update.svg',
      link: '/web',
      button: String(t('home:services.update.button', 'Learn More')),
    },
    {
      title: String(t('home:services.ai.title', 'AI')),
      text: String(t('home:services.ai.description', '')),
      icon: '/icons/ai.svg',
      link: 'mailto:info@ginfinai.be',
      button: String(t('home:services.ai.button', 'Contact')),
    },
  ]

  return (
    <>
      <Head>
        <title>{String(t('meta.title', 'GinfinAI'))}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={String(t('meta.description', ''))} />
        <meta name="keywords" content={String(t('meta.keywords', ''))} />
        <meta name="author" content="Gerben Ceuppens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-24">
        <ParticlesBackground />
        <InfinityOrbit />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob top-[-150px] left-[-150px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-2xl opacity-40 animate-blob animation-delay-2000 top-[200px] right-[-100px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg font-inter neon-text">
            <TypeAnimation
              sequence={[
                String(t('home:hero.animation1', 'Welcome')),
                1000,
                String(t('home:hero.animation2', 'To GinfinAI')),
                1000,
                String(t('home:hero.animation3', 'Your AI Partner')),
                1000,
              ]}
              speed={70}
              repeat={Infinity}
            />
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 font-inter">
            {String(t('home:hero.description', 'We create amazing AI-powered experiences.'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#doen"
              className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
            >
              {String(t('home:hero.cta1', 'Get Started'))} →
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:info@ginfinai.be"
              className="px-8 py-3 border-2 border-purple-500 text-purple-300 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 neon-button-secondary"
            >
              {String(t('home:hero.cta2', 'Contact'))} →
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="doen" className="py-24 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-12 font-inter neon-text"
        >
          {String(t('home:services.title', 'Our Services'))}
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {services.map((service, idx) => (
            <Parallax key={idx} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400/50 transition-all"
              >
                <div className="p-1 border-2 border-purple-500 rounded-lg mb-4 w-fit mx-auto">
                  <img src={service.icon} alt={service.title} className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-4 neon-text">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center mb-6">{service.text}</p>
                <div className="text-center">
                  <a
                    href={service.link}
                    className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
                  >
                    {service.button} →
                  </a>
                </div>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="wiebenik" className="py-24 bg-gray-900 text-gray-100 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl text-center font-bold mb-10 text-white font-inter neon-text"
        >
          {String(t('home:about.title', 'About Me'))}
        </motion.h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-60 h-60 group">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 p-[2px] group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-1000 animate-gradient-rotate">
              <div className="rounded-lg bg-gray-900 w-full h-full relative z-20 p-1">
                <FuturisticNodes className="absolute inset-0 z-10 opacity-70" />
                <img
                  src="/images/me_2025.jpg"
                  alt="Gerben Ceuppens"
                  className="relative rounded-md w-full h-full object-cover shadow-2xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-500 z-20 transform group-hover:scale-105 group-hover:rotate-1"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-2/3 text-gray-300 leading-relaxed prose prose-lg space-y-4 font-inter"
          >
            <p dangerouslySetInnerHTML={{ __html: String(t('home:about.description1', '')) }}></p>
            <p dangerouslySetInnerHTML={{ __html: String(t('home:about.description2', '')) }}></p>
            <p dangerouslySetInnerHTML={{ __html: String(t('home:about.description3', '')) }}></p>
            <p dangerouslySetInnerHTML={{ __html: String(t('home:about.description4', '')) }}></p>

            <div className="mt-6 text-center">
              <a
                href="mailto:info@ginfinai.be"
                className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 neon-button-cta"
              >
                {String(t('home:about.cta', 'Contact Me'))} →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}