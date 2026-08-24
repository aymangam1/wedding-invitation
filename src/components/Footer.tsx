import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative overflow-hidden border-t border-gold-200/70 bg-gradient-to-b from-ivory to-blush-50/60 py-16">
      <div className="section-shell text-center">
        <Reveal>
          <p className="font-script text-4xl text-gold-500 sm:text-5xl">{t.footer.names}</p>
          <div className="mt-5 divider-ornament">
            <span className="text-xs tracking-[0.35em] text-gold-500">{t.footer.date}</span>
          </div>
          <p className="mt-6 text-sm text-ink/70">{t.footer.thanks}</p>
        </Reveal>
      </div>
    </footer>
  )
}
