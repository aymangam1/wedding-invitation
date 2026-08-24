import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

/** The invitation link without any hash, so shares always land on the top. */
function inviteUrl(): string {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`
}

export function ShareInvite() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const copiedTimer = useRef<number | null>(null)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    return () => {
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    }
  }, [])

  function flagCopied() {
    setCopied(true)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setCopied(false), 2500)
  }

  async function copyLink() {
    const url = inviteUrl()

    try {
      await navigator.clipboard.writeText(url)
      flagCopied()
      return
    } catch {
      // Clipboard API needs a secure context; fall back to a hidden field.
    }

    const field = document.createElement('textarea')
    field.value = url
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    document.body.removeChild(field)
    flagCopied()
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: t.footer.names, text: t.share.message, url: inviteUrl() })
    } catch {
      // The visitor dismissed the share sheet; nothing to do.
    }
  }

  const url = typeof window === 'undefined' ? '' : inviteUrl()
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${t.share.message} ${url}`)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  return (
    <section id="share" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.share.eyebrow}</p>
          <h2 className="heading mt-3">{t.share.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">{t.share.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon />
              {t.share.whatsapp}
            </a>

            <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FacebookIcon />
              {t.share.facebook}
            </a>

            {canNativeShare && (
              <button type="button" onClick={nativeShare} className="btn-ghost">
                <ShareIcon />
                {t.share.native}
              </button>
            )}

            <button type="button" onClick={copyLink} className="btn-ghost" aria-live="polite">
              {copied ? <CheckIcon /> : <LinkIcon />}
              {copied ? t.share.copied : t.share.copy}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M12.04 2.5a9.44 9.44 0 0 0-8.1 14.28L2.5 21.5l4.83-1.4a9.44 9.44 0 1 0 4.71-17.6Zm0 1.7a7.74 7.74 0 0 1 0 15.48 7.7 7.7 0 0 1-3.93-1.07l-.28-.17-2.86.83.85-2.79-.18-.29a7.74 7.74 0 0 1 6.4-12ZM8.7 7.4c-.18 0-.47.07-.72.34-.24.27-.93.9-.93 2.2s.95 2.55 1.08 2.73c.13.18 1.85 2.94 4.5 4a5.3 5.3 0 0 0 2.2.5c.5 0 1.32-.2 1.63-1.05.3-.85.3-1.57.21-1.72-.09-.16-.33-.25-.69-.42-.36-.18-1.24-.61-1.43-.68-.2-.07-.34-.11-.48.11-.13.22-.55.72-.67.86-.13.14-.25.16-.46.05a5.9 5.9 0 0 1-1.74-1.07 6.6 6.6 0 0 1-1.2-1.5c-.13-.22-.01-.34.1-.45.1-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.3-.02-.43-.06-.13-.5-1.22-.68-1.66-.15-.36-.31-.37-.44-.38h-.4Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M14.2 21v-7.3h2.5l.4-2.9h-2.9V9c0-.85.24-1.43 1.46-1.43h1.55V4.98A21 21 0 0 0 15 4.85c-2.24 0-3.77 1.37-3.77 3.87v2.08H8.7v2.9h2.53V21h2.97Z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" {...stroke}>
      <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.2 1.2" />
      <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1.2-1.2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" {...stroke}>
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" {...stroke}>
      <path d="M12 3v12M8.5 6.5 12 3l3.5 3.5" />
      <path d="M6 12H4.5v8.5h15V12H18" />
    </svg>
  )
}
