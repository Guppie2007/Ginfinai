'use client'

import { FC, useEffect, useRef } from 'react'

interface InfinityOrbitProps {
  orbitRadius?: number
  nodeCount?: number
}

const InfinityOrbit: FC<InfinityOrbitProps> = ({ orbitRadius = 80, nodeCount = 256 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      angle: (i / nodeCount) * Math.PI * 2,
    }))

    const animate = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)

      nodes.forEach((node) => {
        node.angle += 0.03

        const t = node.angle
        const x = (orbitRadius * Math.cos(t)) / (1 + Math.sin(t) ** 2)
        const y = (orbitRadius * Math.cos(t) * Math.sin(t)) / (1 + Math.sin(t) ** 2)

        const alpha = 0.3 + 0.7 * Math.sin(t)
        ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(centerX + x, centerY + y, 5, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [orbitRadius, nodeCount])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default InfinityOrbit