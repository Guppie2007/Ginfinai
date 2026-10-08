import { EMAIL_ADDRESS, PHONE_DISPLAY, WHATSAPP_URL } from './site'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { asArray } from './asArray'

export default function Footer() {
  const { t } = useTranslation('common')
  const services = asArray<string>(t('footer.servicesList', { returnObjects: true }))
  const link = 'text-ondark no-underline hover:text-white'

  return (
    <footer className="bg-ink text-ondark">
      <div className="mx-auto flex max-w-page flex-col gap-10 px-6 pb-8 pt-14">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex max-w-[320px] flex-col gap-3.5">
            <Image
              src="/brand/ginfinai-logo-horizontaal-op-donker.svg"
              alt="GinfinAI"
              width={176}
              height={40}
              className="h-10 w-auto self-start"
            />
            <p className="m-0 text-[15px] leading-relaxed text-ondark-2">{t('footer.tagline')}</p>
          </div>
          <div className="flex flex-wrap gap-12 text-[15px]">
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] text-ondark-3">{t('footer.services')}</span>
              {services.map((s) => (
                <Link key={s} href="/#diensten" className={link}>
                  {s}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] text-ondark-3">{t('footer.contact')}</span>
              <a href={`mailto:${EMAIL_ADDRESS}`} className={link}>
                {EMAIL_ADDRESS}
              </a>
              <a href={WHATSAPP_URL} className={link}>
                {PHONE_DISPLAY}
              </a>
              <span>{t('footer.address')}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink-line pt-5 text-[13px] text-ondark-3">
          <span>{t('footer.legal', { year: new Date().getFullYear() })}</span>
          <Link href="/privacy" className="text-ondark-3 hover:text-white">
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
