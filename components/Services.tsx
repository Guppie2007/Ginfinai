import { useTranslation } from 'next-i18next'
import { asArray } from './asArray'

export type Service = {
  id: string
  subject: number
  title: string
  price: string
  panelPrice: string
  lead: string
  desc: string
  points: string[]
}

type Props = {
  selected: string
  open: string | null
  onSelect: (id: string) => void
  onAsk: (subject: number) => void
}

export default function Services({ selected, open, onSelect, onAsk }: Props) {
  const { t } = useTranslation('home')
  const web = asArray<Service>(t('services.web', { returnObjects: true }))
  const ai = asArray<Service>(t('services.ai', { returnObjects: true }))
  const all = [...web, ...ai]
  const sel = all.find((s) => s.id === selected) || all[0]
  if (!sel) return null
  const groupOf = (id: string) => (id.startsWith('a') ? t('services.aiTitle') : t('services.webTitle'))

  const askButton = (s: Service, big?: boolean) =>
    big ? (
      <a
        href="#contact"
        onClick={() => onAsk(s.subject)}
        className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white pl-[22px] pr-2 text-base font-medium text-ink no-underline hover:bg-lavender hover:text-ink"
      >
        {t('services.cta')}
        <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
          →
        </span>
      </a>
    ) : (
      <a
        href="#contact"
        onClick={() => onAsk(s.subject)}
        className="flex min-h-[48px] items-center justify-center rounded-full bg-white text-[15px] font-medium text-ink no-underline hover:text-ink"
      >
        {t('services.cta')}
      </a>
    )

  const column = (title: string, intro: string, items: Service[], offset: number, accent?: boolean) => (
    <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-1.5">
      <div className="flex items-end justify-between gap-4 px-4 pb-3.5">
        <h3 className={'m-0 text-[26px] font-semibold ' + (accent ? 'text-brand' : '')}>{title}</h3>
        <span className="max-w-[260px] text-right text-sm leading-snug text-muted">{intro}</span>
      </div>
      {items.map((s, i) => {
        const on = selected === s.id
        const isOpen = open === s.id
        return (
          <div key={s.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              aria-expanded={isOpen}
              className={
                'flex min-h-[76px] w-full cursor-pointer items-center gap-5 border-0 border-b px-4 text-left transition-colors ' +
                (on ? 'rounded-[14px] border-transparent bg-selected' : 'border-line bg-transparent hover:bg-lavender')
              }
            >
              <span className={'w-7 text-sm tabular-nums ' + (on ? 'text-brand' : 'text-subtle')}>
                {String(offset + i + 1).padStart(2, '0')}
              </span>
              <span className="flex-grow text-[clamp(18px,1.8vw,22px)] font-medium tracking-[-0.01em]">{s.title}</span>
              <span className="whitespace-nowrap text-sm text-muted">{s.price}</span>
            </button>
            {/* Op gsm opent het paneel onder de aangetikte rij */}
            {isOpen && (
              <div className="nav:hidden">
                <div className="mb-3 mt-2 flex flex-col gap-3.5 rounded-[20px] bg-brand p-6 text-white">
                  <p className="m-0 text-base leading-normal text-brand-panel">{s.desc}</p>
                  <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
                    {s.points.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3.5 border-t border-brand-rule pt-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-xl font-semibold">{s.panelPrice}</span>
                      <span className="text-[13px] text-brand-panel">{t('services.lead', { lead: s.lead })}</span>
                    </div>
                    {askButton(s)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        {column(t('services.webTitle'), t('services.webIntro'), web, 0)}
        {column(t('services.aiTitle'), t('services.aiIntro'), ai, web.length, true)}
      </div>

      <div
        aria-live="polite"
        className="hidden flex-wrap gap-x-14 gap-y-8 rounded-[28px] bg-brand px-12 py-11 text-white nav:flex"
      >
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
          <div className="eyebrow text-brand-panel">
            {t('services.selected')} · {groupOf(sel.id)}
          </div>
          <h3 className="m-0 text-4xl font-semibold tracking-[-0.02em]">{sel.title}</h3>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-brand-panel">{sel.desc}</p>
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
            {sel.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-brand-light" aria-hidden="true">
                  —
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-brand-rule pt-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-brand-panel">{t('services.lead', { lead: sel.lead })}</span>
              <span className="text-[28px] font-semibold">{sel.panelPrice}</span>
            </div>
            {askButton(sel, true)}
          </div>
        </div>
      </div>
    </>
  )
}
