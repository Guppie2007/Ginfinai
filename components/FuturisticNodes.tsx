'use client'
import { FC, useEffect, useRef } from 'react'

interface FuturisticNodesProps {
  className?: string
}

interface Node {
  x: number
  y: number
  index: number
  alpha: number
  color: { r: number; g: number; b: number }
}

const FuturisticNodes: FC<FuturisticNodesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size and handle resize
    const resize = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Node parameters
    const nodeCount = 40 // Reduced for better performance
    const nodes: Node[] = []
    const maxDistance = 150 // Maximum distance to draw connecting lines

    // Initialize nodes
    const initialize = () => {
      nodes.length = 0 // Clear existing nodes
      for (let i = 0; i < nodeCount; i++) {
        const percent = i / nodeCount
        nodes.push({
          x: 0,
          y: 0,
          index: i,
          alpha: 0.7,
          color: {
            r: 100 + percent * 155, // Purple to blue hue
            g: 50 + percent * 100,
            b: 200 + percent * 55,
          },
        })
      }
      updateNodePositions()
    }

    // Update node positions in a lemniscate (infinity) pattern
    const updateNodePositions = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const a = Math.min(width, height) / 3 // Scale with canvas size

      nodes.forEach((node, i) => {
        const angle = (360 / nodeCount) * (i + node.index)
        const rad = (angle * Math.PI) / 180
        node.x = centerX + (a * Math.cos(rad)) / (1 + Math.sin(rad) ** 2)
        node.y = centerY + (a * Math.sin(rad) * Math.cos(rad)) / (1 + Math.sin(rad) ** 2)
      })
    }

    // Render nodes and connecting lines
    const render = () => {
      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      // Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${node.alpha})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2) // Smaller nodes
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.7)`
      })
    }

    // Animation loop
    const animate = () => {
      updateNodePositions()
      render()
      requestAnimationFrame(animate)

      // Increment node indices for movement
      nodes.forEach(node => {
        node.index += 0.5 // Slower movement for subtlety
      })
    }

    initialize()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className || ''}`} />
}

export default FuturisticNodes