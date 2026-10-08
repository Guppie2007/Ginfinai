import { RefObject, useEffect, useState } from 'react'

/**
 * Doorlopende lijn links van de inhoud (logomotief): één knooppunt per sectielabel
 * met attribuut data-rail, vult bij het scrollen. Zichtbaar vanaf 1000 px breed.
 */
type Rail = { ys: number[]; fill: number }

export default function ProgressRail({ wrap }: { wrap: RefObject<HTMLDivElement | null> }) {
  const [rail, setRail] = useState<Rail>({ ys: [], fill: 0 })

  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const w = wrap.current
      if (!w) return
      const wr = w.getBoundingClientRect()
      const ys = Array.from(w.querySelectorAll<HTMLElement>('[data-rail]')).map((el) => {
        const b = el.getBoundingClientRect()
        return Math.round(b.top - wr.top + b.height / 2)
      })
      if (ys.length < 2) return
      const pos = window.innerHeight * 0.55 - wr.top
      const fill = Math.max(0, Math.min(ys[ys.length - 1] - ys[0], pos - ys[0]))
      setRail((prev) => (Math.abs(prev.fill - fill) > 1 || prev.ys.join() !== ys.join() ? { ys, fill } : prev))
    }
    const onChange = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange)
    // Opnieuw meten zodra lettertypes en afbeeldingen geladen zijn
    const ro = 'ResizeObserver' in window ? new ResizeObserver(onChange) : null
    if (ro && wrap.current) ro.observe(wrap.current)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
      ro?.disconnect()
    }
  }, [wrap])

  if (rail.ys.length < 2) return null
  const top = rail.ys[0]
  const len = rail.ys[rail.ys.length - 1] - top

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 top-0 z-[2] hidden w-[22px] rail:block"
      style={{ left: 'max(24px, calc((100% - 1280px) / 2 - 44px))' }}
    >
      <div className="absolute left-2 w-1.5 rounded-[3px] bg-brand/[0.22]" style={{ top, height: len }} />
      <div className="absolute left-2 w-1.5 rounded-[3px] bg-brand" style={{ top, height: rail.fill }} />
      {rail.ys.map((y, i) => {
        const on = rail.fill >= y - top - 1
        const last = i === rail.ys.length - 1
        return (
          <span
            key={i}
            className="absolute left-0 box-border h-[22px] w-[22px] rounded-full border-[6px] transition-[transform,border-color,background-color] duration-200 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]"
            style={{
              top: y,
              transform: `translateY(-50%) scale(${on ? 1 : 0.8})`,
              borderColor: on ? (last ? '#3F31B8' : '#5B4BD6') : '#B9B1E0',
              background: on && last ? '#C9C0FF' : '#FFFFFF',
            }}
          />
        )
      })}
    </div>
  )
}
