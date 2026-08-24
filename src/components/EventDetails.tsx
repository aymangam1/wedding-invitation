import type { ReactNode } from 'react'
import { calendarUrl } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function EventDetails() {
  const { t, lang } = useLanguage()

  return (
    <section id="details" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.details.eyebrow}</p>
          <h2 className="heading mt-3">{t.details.title}</h2>
          <div className="mt-6 divider-ornament">
            <RingsIcon />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal delay={0.05}>
            <InfoCard icon={<CalendarIcon />} label={t.details.dateLabel} value={t.details.dateValue} />
          </Reveal>
          <Reveal delay={0.12}>
            <InfoCard icon={<ClockIcon />} label={t.details.timeLabel} value={t.details.timeValue} />
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-5">
          <div className="card border-blush-200 bg-blush-50/70">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-blush-500 shadow-sm">
                <DressIcon />
              </span>
              <div>
                <p className="eyebrow text-blush-500">{t.details.dressLabel}</p>
                <p className="mt-2 text-lg font-semibold text-ink">{t.details.dressValue}</p>
                <p className="mt-1 text-sm text-ink/70">{t.details.dressNote}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-ivory px-3 py-1.5 text-xs font-semibold text-blush-500">
                  <NoWhiteSwatch />
                  {lang === 'ar' ? 'ممنوع الأبيض' : 'No white, please'}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-10 text-center">
          <a href={calendarUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <CalendarPlusIcon />
            {t.details.addToCalendar}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function InfoCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="card h-full">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-200/50 text-gold-600">
          {icon}
        </span>
        <div>
          <p className="eyebrow">{label}</p>
          <p className="mt-2 text-lg font-semibold leading-relaxed text-ink">{value}</p>
        </div>
      </div>
    </div>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

function CalendarPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

function DressIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" {...stroke}>
      <path d="M9 3h6l-1.2 3.2L18 21H6l4.2-14.8L9 3Z" />
      <path d="M10.2 6.2h3.6" />
    </svg>
  )
}

function NoWhiteSwatch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="m6 18 12-12" />
    </svg>
  )
}

function RingsIcon() {
  return (
    <svg viewBox="0 0 40 24" aria-hidden="true" className="h-6 w-10 text-gold-400" {...stroke}>
      <circle cx="15" cy="14" r="7" />
      <circle cx="25" cy="14" r="7" />
      <path d="M20 3.5 22 6h-4l2-2.5Z" />
    </svg>
  )
}
