import { motion } from 'framer-motion'
import { wedding } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { Petals } from './Petals'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const { t, lang } = useLanguage()

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cream bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.heroImage})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/70 via-cream/55 to-cream/90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,253,249,0.12),rgba(253,249,243,0.6))]" />

      <Petals />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section-shell relative z-10 flex flex-col items-center py-24 text-center"
      >
        <motion.p variants={item} className="font-arabic text-sm text-gold-500 sm:text-base">
          {t.hero.invite}
        </motion.p>

        <motion.div variants={item} className="mt-8 divider-ornament">
          <MonogramRing />
        </motion.div>

        <motion.p variants={item} className="mt-8 eyebrow">
          {t.hero.weAreGettingMarried}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-script text-5xl leading-[1.15] text-ink sm:text-7xl lg:text-8xl"
        >
          {wedding.groom.en}
          <span className="mx-3 inline-block text-gold-400 sm:mx-5">&amp;</span>
          {wedding.bride.en}
        </motion.h1>

        <motion.div variants={item} className="mt-10 divider-ornament">
          <HeartIcon className="h-5 w-5 animate-heartbeat text-blush-400" />
        </motion.div>

        <motion.p
          variants={item}
          className={`mt-8 text-lg text-ink/80 sm:text-2xl ${lang === 'ar' ? 'font-arabicDisplay' : 'font-display tracking-wide'}`}
        >
          {t.hero.date}
        </motion.p>

        <motion.p variants={item} className="mt-2 text-sm text-gold-600 sm:text-base">
          {wedding.venue.name[lang]}
        </motion.p>

        <motion.a
          variants={item}
          href="#details"
          className="group mt-14 inline-flex flex-col items-center gap-2 text-xs tracking-[0.28em] text-gold-500 transition hover:text-gold-600"
        >
          {t.hero.scroll}
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300 transition group-hover:bg-gold-200/40">
            <ChevronDown />
          </span>
        </motion.a>
      </motion.div>
    </section>
  )
}

function MonogramRing() {
  return (
    <span className="relative flex h-16 w-16 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-gold-300" />
      <span className="absolute inset-0 animate-pulseRing rounded-full border border-gold-300" />
      <span className="font-script text-2xl text-gold-500">A&M</span>
    </span>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 21s-7.5-4.6-9.4-9A5.4 5.4 0 0 1 12 6.6 5.4 5.4 0 0 1 21.4 12c-1.9 4.4-9.4 9-9.4 9Z" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 animate-float" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
