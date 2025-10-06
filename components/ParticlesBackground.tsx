'use client'
import { FC } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine'

const ParticlesBackground: FC = () => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine)
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'repulse', // Particles move away from cursor
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#a855f7', // Purple color
            },
            links: {
              color: '#a855f7',
              distance: 150, // Increased distance for more connections
              enable: true,
              opacity: 0.3, // Slightly reduced opacity
              width: 0.8, // Thinner lines
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'out',
              },
              random: true,
              speed: 0.4, // Slower movement for a relaxed feel
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Reduced particle count for performance
            },
            opacity: {
              animation: {
                enable: true,
                speed: 0.6,
                minimumValue: 0.1,
              },
              value: 0.5, // Slightly reduced opacity
            },
            shape: {
              type: 'circle',
            },
            size: {
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
              },
              value: { min: 1, max: 2 }, // Smaller particles
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesBackground