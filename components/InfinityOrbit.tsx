'use client'
import { useEffect, useRef } from 'react'

interface Node {
  angle: number
  radius: number
  speed: number
  color: string
}

const InfinityOrbit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size and handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Canvas dimensions and center
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Infinity orbit parameters
    const orbitRadius = 270
    const nodeCount = 180
    const nodes: Node[] = []

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        angle: (i / nodeCount) * Math.PI * 2,
        radius: Math.random() * 1.5 + 0.8, // Slightly smaller radius for subtlety
        speed: 0.005 + Math.random() * 0.02, // Slower, more varied speeds
        color: `hsl(${Math.random() * 60 + 240}, 80%, ${60 + Math.random() * 20}%)`, // Vary lightness
      })
    }

    // Draw nodes in an infinity orbit
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Connect nearby nodes with faint lines for a "network" effect
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = centerX + orbitRadius * Math.sin(nodes[i].angle) - (centerX + orbitRadius * Math.sin(nodes[j].angle))
          const dy = centerY + (orbitRadius / 2) * Math.sin(2 * nodes[i].angle) - (centerY + (orbitRadius / 2) * Math.sin(2 * nodes[j].angle))
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw a line if nodes are close enough
          if (distance < 50) {
            ctx.beginPath()
            ctx.moveTo(
              centerX + orbitRadius * Math.sin(nodes[i].angle),
              centerY + (orbitRadius / 2) * Math.sin(2 * nodes[i].angle)
            )
            ctx.lineTo(
              centerX + orbitRadius * Math.sin(nodes[j].angle),
              centerY + (orbitRadius / 2) * Math.sin(2 * nodes[j].angle)
            )
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 + (1 - distance / 50) * 0.2})` // Faint purple lines
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.angle += node.speed
        const x = centerX + orbitRadius * Math.sin(node.angle)
        const y = centerY + (orbitRadius / 2) * Math.sin(2 * node.angle)

        // Glow effect
        ctx.shadowBlur = 8 // Reduced from 10 for subtlety
        ctx.shadowColor = node.color

        // Draw node
        ctx.beginPath()
        ctx.arc(x, y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
}

export default InfinityOrbit