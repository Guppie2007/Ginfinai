import { ReactNode, useEffect, useRef, useState } from 'react'

/**
 * Sectielabel (eyebrow) met data-rail. Bij het binnenkomen, één keer:
 * knooppunt opacity 0→1, daarna een lijn van scaleX(0)→1 (origin links), samen 300 ms ease-out.
 * Zonder JS of bij prefers-reduced-motion: meteen de eindtoestand.
 */
export default function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'armed' | 'shown'>('idle')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const el = ref.current
    if (!el) return
    setState('armed')
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const armed = state === 'armed'
  const animate = state === 'shown'
  return (
    <div ref={ref} data-rail className={'eyebrow flex items-center gap-3 ' + className}>
      <span
        aria-hidden="true"
        className={
          'box-border h-2.5 w-2.5 flex-none rounded-full border-2 border-current ' +
          (animate ? 'transition-opacity duration-150 ease-out ' : '') +
          (armed ? 'opacity-0' : 'opacity-100')
        }
      />
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={
          'h-0.5 w-8 flex-none origin-left bg-current ' +
          (animate ? 'transition-transform delay-150 duration-150 ease-out ' : '') +
          (armed ? 'scale-x-0' : 'scale-x-100')
        }
      />
    </div>
  )
}
