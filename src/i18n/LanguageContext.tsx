import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { dirFor, translations } from './translations'
import type { Dictionary, Lang } from './translations'

const STORAGE_KEY = 'wedding:lang'

type LanguageValue = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  t: Dictionary
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageValue | null>(null)

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    // Private browsing can block storage; fall through to the default.
  }
  return 'ar'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  useEffect(() => {
    const dir = dirFor(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = dir

    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Ignore storage failures — the language still applies for this visit.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((prev) => (prev === 'ar' ? 'en' : 'ar')), [])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: dirFor(lang),
      t: translations[lang] as Dictionary,
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return context
}
