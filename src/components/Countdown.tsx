import { AnimatePresence, motion } from 'framer-motion'
import { wedding } from '../config'
import { useCountdown } from '../hooks/useCountdown'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Countdown() {
  const { t, lang } = useLanguage()
  const { days, hours, minutes, seconds, phase } = useCountdown(wedding.startsAt, wedding.endsAt)

  const units = [
    { value: days, label: t.countdown.days },
    { value: hours, label: t.countdown.hours },
    { value: minutes, label: t.countdown.minutes },
    { value: seconds, label: t.countdown.seconds },
  ]

  return (
    <section id="countdown" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.countdown.title}</p>
          {phase === 'before' && <h2 className="heading mt-3">{t.countdown.subtitle}</h2>}
        </Reveal>

        {phase === 'before' ? (
          <Reveal delay={0.15} className="mt-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {units.map((unit) => (
                <UnitCard key={unit.label} value={unit.value} label={unit.label} isArabic={lang === 'ar'} />
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="mt-8">
            <div className="card text-center">
              <p className="heading">{phase === 'during' ? t.countdown.live : t.countdown.done}</p>
              <p className="mt-3 text-sm text-ink/70 sm:text-base">
                {phase === 'during' ? t.countdown.liveNote : t.countdown.doneNote}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function UnitCard({ value, label, isArabic }: { value: number; label: string; isArabic: boolean }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="card flex flex-col items-center justify-center gap-1 px-3 py-5 sm:py-7">
      <div className="relative h-12 w-full overflow-hidden sm:h-16" aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: '65%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-65%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-display text-4xl font-medium lining-nums tabular-nums text-gold-600 sm:text-5xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="sr-only">{`${value} ${label}`}</span>
      <span className={`text-xs tracking-[0.2em] text-ink/60 sm:text-sm ${isArabic ? 'font-arabic' : ''}`}>
        {label}
      </span>
    </div>
  )
}
