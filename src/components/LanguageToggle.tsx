import { useLanguage } from '../i18n/LanguageContext'

export function LanguageToggle() {
  const { t, lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.switchAria}
      className="fixed top-4 z-50 inline-flex items-center gap-2 rounded-full border border-gold-300/80 bg-ivory/85 px-4 py-2 text-xs font-semibold text-gold-600 shadow-soft backdrop-blur transition hover:bg-gold-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ltr:right-4 rtl:left-4"
    >
      <GlobeIcon />
      <span className={lang === 'ar' ? 'font-display' : 'font-arabic'}>{t.switchTo}</span>
    </button>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" />
    </svg>
  )
}
