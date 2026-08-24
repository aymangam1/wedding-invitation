import { mapsEmbedUrl, wedding } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Venue() {
  const { t, lang } = useLanguage()

  return (
    <section id="venue" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.venue.eyebrow}</p>
          <h2 className="heading mt-3">{wedding.venue.name[lang]}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            {wedding.venue.address[lang]}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-gold-200/70 bg-ivory shadow-card">
            {/* The overlay makes the whole map a single tap target on mobile. */}
            <div className="relative bg-gradient-to-br from-blush-50 via-ivory to-gold-200/40">
              <iframe
                title={t.venue.mapTitle}
                src={mapsEmbedUrl()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-10 h-72 w-full border-0 sm:h-96"
                allowFullScreen
              />
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.venue.openMaps}
                className="group absolute inset-0 z-20 flex items-end justify-center bg-transparent p-4 transition hover:bg-ink/10"
              >
                <span className="translate-y-2 rounded-full bg-ivory/95 px-4 py-2 text-xs font-semibold text-gold-600 opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100">
                  {t.venue.mapHint}
                </span>
              </a>
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-gold-200/70 p-5 sm:flex-row sm:justify-between sm:p-6">
              <div className="flex items-center gap-3 text-center sm:text-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-200/50 text-gold-600">
                  <PinIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{wedding.venue.name[lang]}</p>
                  <p className="text-xs text-ink/60">{t.venue.mapHint}</p>
                </div>
              </div>

              <a href={wedding.venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
                <PinIcon />
                {t.venue.openMaps}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 18.5 10.8C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  )
}
