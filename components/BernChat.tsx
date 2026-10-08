import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

/**
 * Bern, de chatassistent. Nu: 3 vaste vragen + doorsturen naar contact.
 * Later: echte AI via een Cloudflare Worker (/api/bern), zie claude/ginfinai-website-overdracht.md.
 * De vaste vragen blijven dan de terugvaloptie.
 */

type Msg = { bot: boolean; text: string }
type QA = { q: string; a: string }
export type BernHandle = { open: () => void }

const BernChat = forwardRef<BernHandle>(function BernChat(_props, ref) {
  const { t } = useTranslation('common')
  const qa = t('bern.questions', { returnObjects: true }) as unknown as QA[]
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    open: () => {
      returnTo.current = document.activeElement as HTMLElement
      setOpen(true)
    },
  }))

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  const close = () => {
    setOpen(false)
    // Focus terug naar de knop die de chat opende
    requestAnimationFrame(() => returnTo.current?.focus())
  }

  const ask = (x: QA) => setMsgs((m) => [...m, { bot: false, text: x.q }, { bot: true, text: x.a }])

  if (!open) {
    return (
      <button
        type="button"
        onClick={(e) => {
          returnTo.current = e.currentTarget
          setOpen(true)
        }}
        aria-label={t('bern.open')}
        className="fixed bottom-5 right-5 z-30 h-16 w-16 cursor-pointer rounded-full border-0 bg-transparent p-0 shadow-[0_10px_24px_rgba(19,14,40,0.35)] transition-transform hover:-translate-y-0.5"
      >
        <img src="/brand/bern-avatar.png" alt="" width={64} height={64} className="block h-16 w-16" />
      </button>
    )
  }

  const all: Msg[] = [{ bot: true, text: t('bern.welcome') }, ...msgs]

  return (
    <div
      role="dialog"
      aria-label={t('bern.dialog')}
      onKeyDown={(e) => e.key === 'Escape' && close()}
      className="fixed bottom-5 right-5 z-30 flex max-h-[calc(100vh-100px)] w-[380px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_16px_40px_rgba(19,14,40,0.22)]"
    >
      <div className="flex items-center gap-3 bg-ink py-3 pl-4 pr-3 text-white">
        <img src="/brand/bern-avatar.png" alt="" width={40} height={40} className="h-10 w-10" />
        <div className="flex flex-grow flex-col gap-0.5">
          <span className="font-brand text-[17px] font-bold">{t('bern.name')}</span>
          <span className="text-xs text-ondark-2">{t('bern.role')}</span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={t('bern.close')}
          className="h-11 w-11 cursor-pointer rounded-xl border-0 bg-transparent text-white hover:bg-ink-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mx-auto">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div ref={listRef} aria-live="polite" className="flex flex-grow flex-col gap-2.5 overflow-y-auto bg-[#FAF9FF] p-4">
        {all.map((m, i) =>
          m.bot ? (
            <div key={i} className="flex items-end gap-2">
              <img src="/brand/bern-avatar.png" alt="" width={28} height={28} className="h-7 w-7 flex-shrink-0" />
              <div className="max-w-[280px] rounded-[16px_16px_16px_4px] border border-line bg-white px-3.5 py-2.5 text-sm leading-normal">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="max-w-[280px] self-end rounded-[16px_16px_4px_16px] bg-brand px-3.5 py-2.5 text-sm leading-normal text-white">
              {m.text}
            </div>
          )
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-line p-3">
        <div className="flex flex-wrap gap-1.5">
          {qa.map((x) => (
            <button
              key={x.q}
              type="button"
              onClick={() => ask(x)}
              className="min-h-[40px] cursor-pointer rounded-full border border-field bg-white px-3 text-[13px] text-[#2C2550] hover:border-brand"
            >
              {x.q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] flex-grow items-center justify-center rounded-xl bg-brand px-3 text-sm font-medium text-white no-underline hover:bg-brand-deep hover:text-white"
          >
            {t('bern.forward')}
          </a>
          <a
            href="https://wa.me/32498420178"
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-line px-3 text-sm text-ink no-underline hover:border-brand hover:text-ink"
          >
            {t('bern.whatsapp')}
          </a>
        </div>
      </div>
    </div>
  )
})

export default BernChat
