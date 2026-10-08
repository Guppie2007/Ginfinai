import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * Geanimeerd GinfinAI-teken voor de hero.
 * Pixels -> lijn -> knooppunten -> labels (±3,3 s), 4,2 s vasthouden, 0,7 s vervagen, herhalen.
 * Stopt buiten beeld, heeft een pauzeknop en blijft statisch bij prefers-reduced-motion.
 * Linkerlus = web, G-lus = AI: klikbaar als navigatie naar de diensten.
 */

// Lemniscaat van Bernoulli met G-uitloop, als polyline (cx=cy=120, a=96, sy=1.5, G-lus x1.12)
const D =
  'M176.3 64.3 L169.4 66.8 L163.0 70.3 L157.0 74.6 L151.3 79.5 L146.0 84.9 L141.0 90.7 L136.2 96.7 L131.7 102.9 L127.3 109.2 L123.0 115.5 L118.8 121.7 L115.0 127.4 L111.1 133.1 L107.1 138.7 L102.9 144.1 L98.6 149.3 L93.9 154.3 L89.0 158.9 L83.8 162.9 L78.2 166.4 L72.2 169.0 L65.9 170.6 L59.3 170.9 L52.7 169.6 L46.0 166.7 L39.7 161.9 L34.0 155.1 L29.3 146.5 L25.9 136.4 L24.2 125.3 L24.3 113.9 L26.1 102.9 L29.6 92.9 L34.3 84.4 L40.1 77.7 L46.5 73.0 L53.1 70.2 L59.8 69.1 L66.4 69.5 L72.6 71.2 L78.6 73.8 L84.2 77.3 L89.4 81.5 L94.3 86.1 L98.9 91.0 L103.2 96.3 L107.4 101.7 L111.4 107.3 L115.3 113.0 L119.1 118.7 L123.3 124.9 L127.6 131.3 L132.0 137.6 L136.6 143.8 L141.3 149.7 L146.4 155.5 L151.7 160.8 L157.4 165.7 L163.4 170.0 L169.9 173.4 L176.8 175.8 L184.0 177.0 L191.4 176.6 L198.9 174.3 L206.2 170.1 L213.0 163.6 L219.0 155.1 L223.6 144.6 L226.5 132.7 L227.5 120.0 L176.3 120.0'

const PTS: [number, number][] = (D.match(/[\d.]+ [\d.]+/g) || []).map((s) => s.split(' ').map(Number) as [number, number])
const CUM: number[] = PTS.reduce<number[]>((acc, p, i) => {
  if (i === 0) return [0]
  const a = PTS[i - 1]
  acc.push(acc[i - 1] + Math.hypot(p[0] - a[0], p[1] - a[1]))
  return acc
}, [])
const TOTAL = CUM[CUM.length - 1]

// [x, y, dx, dy, start-ms]
const PIX = [[163.2,60.9,-32,63,0],[150.4,69.0,-38,-53,22],[139.2,79.8,-83,-19,44],[129.3,91.9,89,34,66],[120.1,104.8,88,21,88],[111.6,117.6,60,28,110],[103.6,129.2,-105,54,132],[95.0,140.4,54,53,154],[85.5,150.6,-88,-91,176],[74.7,158.9,-78,-41,198],[62.3,164.1,63,-9,220],[48.8,164.2,51,-62,242],[35.3,157.3,42,54,264],[24.1,142.4,-42,109,286],[18.3,121.0,42,91,308],[19.9,97.8,-55,-66,330],[28.2,78.6,-62,-19,352],[40.7,66.9,69,27,374],[54.4,63.1,-38,-81,396],[67.5,65.5,-40,93,418],[79.3,72.1,-78,23,440],[89.5,81.3,30,-105,462],[98.6,92.0,4,100,484],[106.9,103.5,-120,-19,506],[114.9,115.3,-10,-79,528],[123.8,128.5,68,-8,550],[133.2,141.1,-98,56,572],[143.6,152.8,54,77,594],[155.4,162.7,104,26,616],[168.9,169.3,9,-100,638],[183.9,170.8,58,-58,660],[199.2,164.8,-34,-96,682],[212.5,149.9,-81,-44,704],[220.4,127.0,68,-107,726]]

const NODES = [
  { x: 67.4, y: 69.7, r: 7, at: 1750 },
  { x: 24.0, y: 120.0, r: 7, at: 1830 },
  { x: 67.4, y: 170.3, r: 7, at: 1910 },
  { x: 176.3, y: 64.3, r: 9, at: 2000 },
  { x: 176.3, y: 120.0, r: 9, at: 2080 },
  { x: 120.0, y: 120.0, r: 13, at: 2240 },
  { x: 120.0, y: 120.0, r: 6, at: 2420, core: true },
]

const END = 3300
const HOLD = 4200
const FADE = 700
const CYCLE = END + HOLD + FADE

const clamp = (x: number) => Math.max(0, Math.min(1, x))
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
const backOut = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

function pointAt(len: number): [number, number] {
  for (let i = 1; i < PTS.length; i++) {
    if (CUM[i] >= len) {
      const k = (len - CUM[i - 1]) / (CUM[i] - CUM[i - 1])
      return [PTS[i - 1][0] + (PTS[i][0] - PTS[i - 1][0]) * k, PTS[i - 1][1] + (PTS[i][1] - PTS[i - 1][1]) * k]
    }
  }
  return PTS[PTS.length - 1]
}

const fmt = (pts: [number, number][]) => 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L')

function rangePath(a: number, b: number) {
  const ta = TOTAL * a
  const tb = TOTAL * b
  const out: [number, number][] = [pointAt(ta)]
  PTS.forEach((p, i) => {
    if (CUM[i] > ta && CUM[i] < tb) out.push(p)
  })
  out.push(pointAt(tb))
  return fmt(out)
}

function partialPath(f: number) {
  if (f <= 0) return ''
  return rangePath(0, Math.min(1, f))
}

// Fracties waar de lijn het kruispunt (120,120) passeert: begin en einde van de weblus
const CROSS = (() => {
  const out: number[] = []
  PTS.forEach((p, i) => {
    if (Math.hypot(p[0] - 120, p[1] - 120) < 5) out.push(CUM[i] / TOTAL)
  })
  return [out[0], out[out.length - 1]]
})()

type Group = 'web' | 'ai'

export default function LogoMark({ onPick }: { onPick: (g: Group) => void }) {
  const { t } = useTranslation('home')
  const [time, setTime] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const [hover, setHover] = useState<Group | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const timeRef = useRef(0)
  const visible = useRef(true)
  const pausedRef = useRef(false)

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current)
    const start = performance.now() - timeRef.current
    const tick = (now: number) => {
      if (pausedRef.current || !visible.current) return
      timeRef.current = now - start
      setTime(timeRef.current)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduce(true)
      setTime(END)
      return
    }
    play()
    let io: IntersectionObserver | undefined
    if ('IntersectionObserver' in window && cardRef.current) {
      io = new IntersectionObserver((entries) => {
        visible.current = entries[0].isIntersecting
        if (visible.current && !pausedRef.current) play()
        else cancelAnimationFrame(raf.current)
      })
      io.observe(cardRef.current)
    }
    return () => {
      cancelAnimationFrame(raf.current)
      io?.disconnect()
    }
  }, [play])

  const togglePause = () => {
    if (pausedRef.current) {
      pausedRef.current = false
      setPaused(false)
      play()
    } else {
      pausedRef.current = true
      setPaused(true)
      cancelAnimationFrame(raf.current)
    }
  }

  let tc = reduce ? END : time % CYCLE
  let markOpacity = tc > END + HOLD ? 1 - clamp((tc - END - HOLD) / FADE) : 1
  if (hover) {
    tc = END
    markOpacity = 1
  }
  const tt = Math.min(tc, END)

  const fadeOut = 1 - clamp((tt - 1350) / 350)
  const line = partialPath(easeOut(clamp((tt - 1050) / 750)))
  const labelOpacity = clamp((tt - 2700) / 500)

  const hiPath = useMemo(() => {
    if (hover === 'web') return rangePath(CROSS[0], CROSS[1])
    if (hover === 'ai') return rangePath(0, CROSS[0]) + ' ' + rangePath(CROSS[1], 1)
    return ''
  }, [hover])

  const pick = (g: Group) => () => {
    setHover(null)
    onPick(g)
  }
  const hoverProps = (g: Group) => ({
    onMouseEnter: () => setHover(g),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(g),
    onBlur: () => setHover(null),
  })

  return (
    <div ref={cardRef} className="relative box-border w-full max-w-[480px] rounded-[28px] border border-ink-line bg-ink-2 px-6 py-8">
      {!reduce && (
        <button
          type="button"
          onClick={togglePause}
          aria-label={paused ? t('mark.resume') : t('mark.pause')}
          title={paused ? t('mark.resume') : t('mark.pause')}
          className="absolute right-2.5 top-2.5 flex h-11 w-11 items-center justify-center rounded-xl border border-ink-line bg-transparent text-ondark-2 hover:text-white"
        >
          {paused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 5l12 7-12 7z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M8 5v14M16 5v14" />
            </svg>
          )}
        </button>
      )}

      <svg viewBox="12 39 228 176" role="group" aria-label={t('mark.label')} className="block h-auto w-full overflow-visible">
        <g opacity={markOpacity}>
          {PIX.map((p, i) => {
            const k = easeOut(clamp((tt - p[4]) / 600))
            const dx = p[2] * (1 - k)
            const dy = p[3] * (1 - k)
            const rot = 90 * (1 - k)
            const o = k * fadeOut
            if (o <= 0) return null
            return (
              <rect
                key={i}
                x={p[0]}
                y={p[1]}
                width="12"
                height="12"
                rx="2"
                fill="#8B7BFF"
                opacity={o}
                transform={`translate(${dx.toFixed(1)} ${dy.toFixed(1)}) rotate(${rot.toFixed(1)} ${p[0] + 6} ${p[1] + 6})`}
              />
            )
          })}
          {line && <path d={line} fill="none" stroke="#8B7BFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />}
          {hiPath && <path d={hiPath} fill="none" stroke="#C9C0FF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />}
          {NODES.map((n, i) => {
            const s = tt < n.at ? 0 : Math.max(0, backOut(clamp((tt - n.at) / 380)))
            const lit = (hover === 'web' && n.x < 100) || (hover === 'ai' && n.x > 140)
            return (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={(n.r * s).toFixed(2)}
                fill={n.core ? '#C9C0FF' : '#130E28'}
                stroke={lit ? '#C9C0FF' : '#8B7BFF'}
                strokeWidth={n.core ? 0 : 7}
              />
            )
          })}
          <g opacity={labelOpacity} fontFamily="JetBrains Mono, ui-monospace, monospace" textAnchor="middle" aria-hidden="true">
            <text x="70" y="124" fontSize="11" letterSpacing="1.5" fill={hover === 'web' ? '#FFFFFF' : '#C9C0FF'}>
              {t('mark.web')}
            </text>
            <text x="194" y="156" fontSize="11" letterSpacing="1.5" fill={hover === 'ai' ? '#FFFFFF' : '#C9C0FF'}>
              {t('mark.ai')}
            </text>
            <text x="120" y="210" fontSize="8" letterSpacing="1.2" fill={hover ? '#FFFFFF' : '#B7AEDB'}>
              {hover === 'web' ? t('mark.capWeb') : hover === 'ai' ? t('mark.capAi') : t('mark.capDefault')}
            </text>
          </g>
        </g>
        <a href="#diensten" aria-label={t('mark.webLink')} onClick={pick('web')} {...hoverProps('web')} className="cursor-pointer">
          <ellipse cx="68" cy="120" rx="54" ry="58" fill="transparent" />
        </a>
        <a href="#diensten" aria-label={t('mark.aiLink')} onClick={pick('ai')} {...hoverProps('ai')} className="cursor-pointer">
          <ellipse cx="182" cy="122" rx="54" ry="60" fill="transparent" />
        </a>
      </svg>
      <p className="mb-0 mt-3.5 text-center text-[13px] text-ondark-3">
        {t('mark.hintBefore')} <strong className="font-medium text-brand-light">{t('mark.web')}</strong> {t('mark.hintOr')}{' '}
        <strong className="font-medium text-brand-light">{t('mark.ai')}</strong> {t('mark.hintAfter')}
      </p>
    </div>
  )
}
