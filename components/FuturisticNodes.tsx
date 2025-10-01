'use client'

import { FC, useEffect, useRef } from 'react'

interface FuturisticNodesProps {
  className?: string
}

const FuturisticNodes: FC<FuturisticNodesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    let nodes: any[] = []
    const nodeCount = 60

    const getRandom = (min: number, max: number) => Math.random() * (max - min) + min

    const createNode = (i: number) => {
      const angle = (360 / nodeCount) * i
      const rad = (angle * Math.PI) / 180
      const a = canvas.width / 2 - 20
      const percent = i / nodeCount
      return {
        x: canvas.width / 2 + (a * Math.cos(rad)) / (1 + Math.sin(rad) ** 2),
        y: canvas.height / 2 + (a * Math.sin(rad) * Math.cos(rad)) / (1 + Math.sin(rad) ** 2),
        index: i,
        alpha: 1,
        color: { r: percent * 255, g: percent * 255, b: 255 },
      }
    }

    const initialize = () => {
      nodes = []
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createNode(i))
      }
    }

    const updateNodes = () => {
      nodes.forEach((b) => {
        b.index += 1
        const angle = (360 / nodeCount) * b.index
        const rad = (angle * Math.PI) / 180
        const a = canvas.width / 2 - 20
        b.x = canvas.width / 2 + (a * Math.cos(rad)) / (1 + Math.sin(rad) ** 2)
        b.y = canvas.height / 2 + (a * Math.sin(rad) * Math.cos(rad)) / (1 + Math.sin(rad) ** 2)
      })
    }

    const renderNodes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((b) => {
        ctx.fillStyle = `rgba(${b.color.r},${b.color.g},${b.color.b},${b.alpha})`
        ctx.beginPath()
        ctx.arc(b.x, b.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      renderNodes()
      updateNodes()
      requestAnimationFrame(animate)
    }

    initialize()
    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className || ''}`} />
}

export default FuturisticNodes
