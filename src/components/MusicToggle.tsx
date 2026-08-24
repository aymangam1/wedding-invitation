import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { wedding } from '../config'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { useLanguage } from '../i18n/LanguageContext'

export function MusicToggle() {
  const { t } = useLanguage()
  const { playing, failed, toggle } = useAudioPlayer(wedding.music.src)
  /** Once the visitor has used the button, nudging them again would only nag. */
  const [nudged, setNudged] = useState(false)

  const soundOn = playing && !failed
  const label = failed ? t.music.unavailable : soundOn ? t.music.mute : t.music.play

  const start = () => {
    setNudged(true)
    toggle()
  }

  return (
    <div className="fixed bottom-5 z-50 flex items-center gap-2 ltr:right-4 rtl:left-4 sm:gap-3">
      <AnimatePresence>
        {!soundOn && !failed && !nudged && (
          <motion.button
            type="button"
            onClick={start}
            // The real control right beside it already carries the accessible label.
            aria-hidden="true"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-gold-300/70 bg-ivory/95 px-3.5 py-2 text-[11px] text-gold-700 shadow-soft backdrop-blur sm:px-4 sm:text-xs"
          >
            <motion.span
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
              className="block whitespace-nowrap"
            >
              {t.music.hint}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={start}
        disabled={failed}
        aria-label={label}
        title={label}
        aria-pressed={soundOn}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/80 bg-ivory/90 text-gold-600 shadow-soft backdrop-blur transition hover:bg-gold-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14"
      >
        {soundOn && (
          <span aria-hidden="true" className="absolute inset-0 animate-pulseRing rounded-full border border-gold-300" />
        )}
        {soundOn ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </button>
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

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" {...stroke}>
      <path d="M4 10v4h3l4 3.5V6.5L7 10H4Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" {...stroke}>
      <path d="M4 10v4h3l4 3.5V6.5L7 10H4Z" />
      <path d="m15.5 10 4 4M19.5 10l-4 4" />
    </svg>
  )
}
