/**
 * Knooppunt-iconen per dienst (viewBox 56, getoond op 28px, lijndikte 3).
 * Open knooppunten krijgen de achtergrondkleur van de rij als vulling, zodat ze open ogen.
 */
type Props = {
  id: string
  /** Tailwind-vulklassen voor open knooppunten (achtergrond van de rij) */
  open: string
  className?: string
}

export default function ServiceIcon({ id, open, className }: Props) {
  const o = open
  let body: React.ReactNode = null
  switch (id) {
    case 'w0':
      body = (
        <>
          <rect x="7" y="11" width="42" height="32" rx="6" />
          <path d="M7 19h42" />
          <path d="M16 29h14M16 35h8" />
          <circle cx="40" cy="32" r="4" className={o} />
        </>
      )
      break
    case 'w1':
      body = (
        <>
          <path d="M14 22a16 16 0 0 1 28-4" />
          <path d="M42 34a16 16 0 0 1-28 4" />
          <circle cx="42" cy="18" r="4" className={o} />
          <circle cx="14" cy="38" r="4" className={o} />
        </>
      )
      break
    case 'w2':
      body = (
        <>
          <path d="M28 7l17 6v13c0 11-7 19-17 23C18 45 11 37 11 26V13z" />
          <path d="M20 28h16" />
          <circle cx="28" cy="28" r="4" className={o} />
        </>
      )
      break
    case 'a0':
      body = (
        <>
          <circle cx="24" cy="24" r="13" />
          <path d="M34 34l10 10" />
          <circle cx="46" cy="46" r="3.5" className={o} />
          <path d="M19 22l9 5" strokeWidth="2" />
          <circle cx="19" cy="22" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="28" cy="27" r="2.5" fill="currentColor" stroke="none" />
        </>
      )
      break
    case 'a1':
      body = (
        <>
          <path d="M14 7h20l9 9v33H14z" />
          <path d="M34 7v9h9" />
          <path d="M20 26h12M20 33h12M20 40h7" />
          <circle cx="36" cy="26" r="3" className={o} />
          <circle cx="36" cy="33" r="3" className={o} />
        </>
      )
      break
    case 'a2':
      body = (
        <>
          <path d="M28 28L13 15M28 28l15-13M28 28v17" />
          <circle cx="13" cy="15" r="4" className={o} />
          <circle cx="43" cy="15" r="4" className={o} />
          <circle cx="28" cy="45" r="4" className={o} />
          <circle cx="28" cy="28" r="6" className={o} />
          <circle cx="28" cy="28" r="2.5" fill="currentColor" stroke="none" />
        </>
      )
      break
    default:
      return null
  }
  return (
    <svg
      viewBox="0 0 56 56"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {body}
    </svg>
  )
}
