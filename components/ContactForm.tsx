import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

type Field = 'name' | 'email' | 'message'
type Values = { name: string; email: string; company: string; phone: string; message: string; website: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Props = {
  subject: number
  onSubject: (i: number) => void
}

export default function ContactForm({ subject, onSubject }: Props) {
  const { t } = useTranslation('home')
  const subjects = t('contact.subjects', { returnObjects: true }) as unknown as string[]
  const budgets = t('contact.budgets', { returnObjects: true }) as unknown as string[]

  const [values, setValues] = useState<Values>({ name: '', email: '', company: '', phone: '', message: '', website: '' })
  const [budget, setBudget] = useState(-1)
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false })
  const [status, setStatus] = useState<Status>('idle')
  const [showSummary, setShowSummary] = useState(false)
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  }

  const validate = (v: Values): Record<Field, string> => ({
    name: v.name.trim() ? '' : t('contact.errors.name'),
    email: EMAIL.test(v.email.trim()) ? '' : t('contact.errors.email'),
    message: v.message.trim() ? '' : t('contact.errors.message'),
  })
  const errors = validate(values)
  // Fout tonen na verlaten van het veld (of na verzenden), en meteen wissen zodra het klopt
  const shown = (f: Field) => (touched[f] ? errors[f] : '')

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const blur = (f: Field) => () => setTouched((tt) => ({ ...tt, [f]: true }))

  const mailto = () => {
    const body = [
      values.message,
      '',
      `${t('contact.fields.name')}: ${values.name}`,
      values.company && `${t('contact.fields.company')}: ${values.company}`,
      values.phone && `${t('contact.fields.phone')}: ${values.phone}`,
      budget >= 0 && `${t('contact.fields.budget')}: ${budgets[budget]}`,
    ]
      .filter((x) => x !== false && x !== '')
      .join('\n')
    return `mailto:info@ginfinai.be?subject=${encodeURIComponent(subjects[subject] || 'GinfinAI')}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const bad = (Object.keys(errors) as Field[]).filter((f) => errors[f])
    if (bad.length) {
      setShowSummary(true)
      refs[bad[0]].current?.focus()
      return
    }
    setShowSummary(false)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          subject: subjects[subject] || '',
          budget: budget >= 0 ? budgets[budget] : '',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues({ name: '', email: '', company: '', phone: '', message: '', website: '' })
    setBudget(-1)
    setTouched({ name: false, email: false, message: false })
    setStatus('idle')
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-3.5 py-6">
        <img src="/brand/bern-avatar.png" alt="" width={56} height={56} className="h-14 w-14" />
        <h3 className="m-0 text-2xl font-semibold">{t('contact.sentTitle')}</h3>
        <p className="m-0 text-base text-muted">{t('contact.sentText')}</p>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] cursor-pointer rounded-full border border-brand bg-transparent px-[18px] text-[15px] text-brand hover:bg-white"
        >
          {t('contact.again')}
        </button>
      </div>
    )
  }

  const label = 'text-sm font-medium'
  const req = (
    <span className="font-normal text-muted">
      {' '}
      ({t('contact.fields.required')})
    </span>
  )
  const err = (f: Field) =>
    shown(f) ? (
      <p id={`fout-${f}`} className="m-0 text-sm text-error">
        {shown(f)}
      </p>
    ) : null
  const errCount = (Object.keys(errors) as Field[]).filter((f) => errors[f]).length

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-[22px]">
      {showSummary && errCount > 0 && (
        <p role="alert" className="m-0 rounded-xl border border-error bg-white px-4 py-3 text-sm text-error">
          {t('contact.errors.summary', { count: errCount })}
        </p>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="naam" className={label}>
            {t('contact.fields.name')}
            {req}
          </label>
          <input
            ref={refs.name}
            id="naam"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={!!shown('name')}
            aria-describedby={shown('name') ? 'fout-name' : undefined}
            className="field"
          />
          {err('name')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={label}>
            {t('contact.fields.email')}
            {req}
          </label>
          <input
            ref={refs.email}
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t('contact.fields.emailHint')}
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={!!shown('email')}
            aria-describedby={shown('email') ? 'fout-email' : undefined}
            className="field"
          />
          {err('email')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bedrijf" className={label}>
            {t('contact.fields.company')}
          </label>
          <input id="bedrijf" name="company" autoComplete="organization" value={values.company} onChange={set('company')} className="field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tel" className={label}>
            {t('contact.fields.phone')}
          </label>
          <input id="tel" name="phone" type="tel" autoComplete="tel" placeholder="+32" value={values.phone} onChange={set('phone')} className="field" />
        </div>
      </div>

      {/* Honeypot tegen spam: onzichtbaar voor bezoekers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="pb-2.5 text-sm font-medium">{t('contact.fields.subject')}</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s, i) => (
            <button key={s} type="button" onClick={() => onSubject(i)} aria-pressed={subject === i} className="chip cursor-pointer">
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="pb-2.5 text-sm font-medium">
          {t('contact.fields.budget')}
          <span className="font-normal text-muted"> ({t('contact.fields.optional')})</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b, i) => (
            <button key={b} type="button" onClick={() => setBudget(budget === i ? -1 : i)} aria-pressed={budget === i} className="chip cursor-pointer">
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bericht" className={label}>
          {t('contact.fields.message')}
          {req}
        </label>
        <textarea
          ref={refs.message}
          id="bericht"
          name="message"
          rows={5}
          placeholder={t('contact.fields.messageHint')}
          value={values.message}
          onChange={set('message')}
          onBlur={blur('message')}
          aria-invalid={!!shown('message')}
          aria-describedby={shown('message') ? 'fout-message' : undefined}
          className="field resize-y py-3"
        />
        {err('message')}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-2 rounded-xl border border-error bg-white px-4 py-3 text-sm">
          <p className="m-0 text-error">{t('contact.errors.send')}</p>
          <a href={mailto()} className="font-medium">
            {t('contact.errors.mailFallback')}
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 max-w-[320px] text-[13px] leading-normal text-muted">
          {t('contact.privacy')}{' '}
          <Link href="/privacy">{t('contact.privacyLink')}</Link>
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="min-h-[52px] cursor-pointer rounded-full border-0 bg-brand px-7 text-base font-medium text-white hover:bg-brand-deep disabled:cursor-wait disabled:opacity-80"
        >
          {status === 'sending' ? t('contact.sending') : t('contact.submit')}
        </button>
      </div>
    </form>
  )
}
