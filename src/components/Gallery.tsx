import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="heading mt-3">{t.gallery.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">{t.gallery.note}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {wedding.gallery.map((src, index) => (
            <Reveal key={src} delay={index * 0.08}>
              <Photo src={src} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Photo({ src, index }: { src: string; index: number }) {
  const [broken, setBroken] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl border border-gold-200/70 bg-gradient-to-br from-blush-50 via-ivory to-gold-200/40 shadow-card ${
        index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
      }`}
    >
      {broken ? (
        <div className="flex h-full w-full items-center justify-center text-gold-400">
          <PhotoIcon />
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
        />
      )}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ivory/50" />
    </motion.div>
  )
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="9" cy="10.5" r="1.6" />
      <path d="m4.5 17.5 4.8-4.3 3.4 3 2.6-2.2 4.2 3.5" />
    </svg>
  )
}
