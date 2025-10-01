'use client'

import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ParticlesBackground from '../components/ParticlesBackground'
import FuturisticNodes from '../components/FuturisticNodes'

const services = [
  { title: 'Webdesign', text: 'Modern, responsive websites that represent your brand.', icon: '/icons/webdesign.svg', link: '/web', button: 'Meer info' },
  { title: 'Web update', text: 'Update and modernize your current site.', icon: '/icons/update.svg', link: '/web', button: 'Meer info' },
  { title: 'AI applicaties', text: 'Build AI-driven features that add real value.', icon: '/icons/ai.svg', link: 'mailto:info@ginfinai.be', button: 'Contacteer mij' },
]

interface Node {
  angle: number
  radius: number
  speed: number
  color: string
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    const centerX = width / 2
    const centerY = height / 2
    const orbitRadius = 100
    const nodeCount = 60
    const nodes: Node[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        angle: (i / nodeCount) * Math.PI * 2,
        radius: Math.random() * 3 + 2,
        speed: 0.01 + Math.random() * 0.02,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Draw nodes along infinity symbol
      nodes.forEach((node) => {
        node.angle += node.speed
        const x = centerX + orbitRadius * Math.sin(node.angle)
        const y = centerY + (orbitRadius / 2) * Math.sin(2 * node.angle)

        ctx.beginPath()
        ctx.arc(x, y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    draw()

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Head>
        <title>GinfinAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="GinfinAI: modern webdesign and AI applications to elevate your business." />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200 pt-20">
        <ParticlesBackground />

        {/* Canvas for Infinity Orbit + Futuristic Nodes */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        {/* Floating blobs */}
        <div className="absolute w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob top-[-150px] left-[-150px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-[200px] right-[-100px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-lg">
            Web & AI to infinity and beyond!
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700">
            We design modern websites and AI applications that help your business shine.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#doen" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition">
              Ontdek meer
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:info@ginfinai.be" className="px-6 py-3 rounded-xl border border-purple-600 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition">
              Contacteer ons
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="doen" className="py-20 bg-gray-50">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Wat kan ik voor u doen?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-8 bg-gradient-to-r from-purple-300 to-blue-300 rounded-3xl shadow-lg transform hover:-translate-y-3 hover:scale-105 transition-all flex flex-col items-center text-center"
            >
              <img src={service.icon} alt={service.title} className="mb-4 w-16 h-16" />
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-4 text-gray-800">{service.text}</p>
              <div className="mt-6">
                <a href={service.link} className="inline-block bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                  {service.button}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="wiebenik" className="py-20 bg-white text-gray-900 relative overflow-hidden">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl text-center font-bold mb-10">
          Wie ben ik?
        </motion.h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-40 h-40">
            {/* Infinity orbit / futuristic animation */}
            <FuturisticNodes className="z-0" />

            {/* Profile image */}
            <img
                src="/images/me.jpg"
                alt="Gerben Ceuppens"
                className="relative rounded-full w-40 h-40 shadow-2xl border-4 border-purple-400 z-10"
            />
          </div>


          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:w-2/3 text-gray-700 leading-relaxed prose prose-lg">
            <p>Ik ben <span className="font-semibold">Gerben Ceuppens</span>, 23 jaar, getogen te Ternat en masterstudent Burgerlijk Ingenieur Computerwetenschappen aan de Universiteit Gent.</p>
            <p>Tijdens mijn studies specialiseer ik me in <span className="text-purple-600 font-medium">Artificiële Intelligentie</span>. Ook al studeer ik nog, dit hield me niet tegen om mijn kennis al in de praktijk te brengen.</p>
            <p>Dit leidde tot <span className="font-semibold">GinfinAI</span>, waarmee ik mijn expertise kan delen en ondernemers kan helpen.</p>
            <p>Momenteel werk ik als AI Engineer bij <span className="font-semibold">AI Square</span>, waar ik ook mijn thesis over GraphRAG uitwerk.</p>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  )
}