'use client'

import { FC } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const ParticlesBackground: FC = () => {
  const particlesInit = async (engine: any) => {
    await loadFull(engine)
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            color: { value: '#4f46e5' },
            links: { enable: true, distance: 120, color: '#4f46e5', opacity: 0.3, width: 1 },
            move: { enable: true, speed: 0.5 },
            number: { value: 120, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            size: { value: { min: 2, max: 4 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesBackground