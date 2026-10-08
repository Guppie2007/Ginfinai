import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Contactformulier -> e-mail via Resend (https://resend.com, gratis tot 3.000 mails/maand).
 *
 * Nodige omgevingsvariabelen (Vercel > Project > Settings > Environment Variables):
 *   RESEND_API_KEY  API-sleutel van Resend
 *   CONTACT_TO      ontvanger, standaard info@ginfinai.be
 *   CONTACT_FROM    afzender op een geverifieerd domein, bv. "GinfinAI <formulier@ginfinai.be>"
 *
 * Zonder RESEND_API_KEY antwoordt de route met 503; het formulier toont dan een
 * foutmelding met een knop die het bericht in het e-mailprogramma opent.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const b = (req.body || {}) as Record<string, unknown>

  // Honeypot ingevuld: doen alsof het gelukt is, niets versturen
  if (str(b.website, 200)) return res.status(200).json({ ok: true })

  const name = str(b.name, 120)
  const email = str(b.email, 200)
  const message = str(b.message, 5000)
  const company = str(b.company, 120)
  const phone = str(b.phone, 40)
  const subject = str(b.subject, 80)
  const budget = str(b.budget, 40)

  if (!name || !EMAIL.test(email) || !message) {
    return res.status(400).json({ error: 'invalid' })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(503).json({ error: 'not_configured' })

  const text = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    company && `Bedrijf: ${company}`,
    phone && `Telefoon: ${phone}`,
    subject && `Onderwerp: ${subject}`,
    budget && `Budget: ${budget}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'GinfinAI <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || 'info@ginfinai.be'],
        reply_to: email,
        subject: `Websiteformulier: ${subject || 'nieuw bericht'} · ${name}`,
        text,
      }),
    })
    if (!r.ok) return res.status(502).json({ error: 'send_failed' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'send_failed' })
  }
}
