import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { isSupabaseEnabled } from '../lib/supabase'
import { MESSAGE_MAX, NAME_MAX, addWish, fetchWishes, subscribeToWishes } from '../lib/wishes'
import type { Wish } from '../lib/wishes'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

/** Error text is resolved at render time so it follows the selected language. */
type ErrorKey = 'name' | 'message' | 'tooLong' | 'generic'

/**
 * Guests see a friendly message; the database reason is logged and returned so
 * it can be shown in small print, which is the only way to diagnose a
 * misconfigured key or table without opening developer tools.
 */
function reportFailure(action: string, cause: unknown): string | null {
  const fields =
    cause && typeof cause === 'object'
      ? Object.fromEntries(
          (['message', 'code', 'details', 'hint'] as const)
            .map((key) => [key, (cause as Record<string, unknown>)[key]])
            .filter(([, value]) => value !== undefined),
        )
      : { message: String(cause) }

  console.error(`[guestbook] failed to ${action}:`, fields)

  const code = typeof fields.code === 'string' ? `${fields.code}: ` : ''
  const message = typeof fields.message === 'string' ? fields.message : null

  return message ? `${code}${message}` : null
}

export function Guestbook() {
  const { t, lang } = useLanguage()

  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null)
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const successTimer = useRef<number | null>(null)

  const mergeWish = useCallback((incoming: Wish) => {
    setWishes((prev) => (prev.some((wish) => wish.id === incoming.id) ? prev : [incoming, ...prev]))
  }, [])

  const dropWish = useCallback((id: string) => {
    setWishes((prev) => prev.filter((wish) => wish.id !== id))
  }, [])

  useEffect(() => {
    let active = true

    fetchWishes()
      .then((data) => {
        if (active) setWishes(data)
      })
      .catch((cause: unknown) => {
        const detail = reportFailure('load wishes', cause)
        if (active) {
          setErrorKey('generic')
          setErrorDetail(detail)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const unsubscribe = subscribeToWishes({ onInsert: mergeWish, onDelete: dropWish })

    return () => {
      active = false
      unsubscribe()
    }
  }, [mergeWish, dropWish])

  useEffect(
    () => () => {
      if (successTimer.current) window.clearTimeout(successTimer.current)
    },
    [],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    setErrorDetail(null)

    if (trimmedName.length < 2) {
      setErrorKey('name')
      return
    }
    if (trimmedMessage.length < 1) {
      setErrorKey('message')
      return
    }
    if (trimmedMessage.length > MESSAGE_MAX) {
      setErrorKey('tooLong')
      return
    }

    setErrorKey(null)
    setSubmitting(true)

    try {
      const created = await addWish({ name: trimmedName, message: trimmedMessage })
      mergeWish(created)
      setMessage('')
      setSuccess(true)
      if (successTimer.current) window.clearTimeout(successTimer.current)
      successTimer.current = window.setTimeout(() => setSuccess(false), 5000)
    } catch (cause: unknown) {
      setErrorDetail(reportFailure('post wish', cause))
      setErrorKey('generic')
    } finally {
      setSubmitting(false)
    }
  }

  const errorText = errorKey ? t.guestbook.errors[errorKey] : null

  return (
    <section id="guestbook" className="relative py-20 sm:py-24">
      <div className="section-shell">
        <Reveal className="text-center">
          <p className="eyebrow">{t.guestbook.eyebrow}</p>
          <h2 className="heading mt-3">{t.guestbook.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            {t.guestbook.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <form onSubmit={handleSubmit} className="card space-y-4" noValidate>
            <div>
              <label htmlFor="wish-name" className="mb-1.5 block text-xs font-semibold text-ink/70">
                {t.guestbook.nameLabel}
              </label>
              <input
                id="wish-name"
                className="field"
                value={name}
                maxLength={NAME_MAX}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.guestbook.namePlaceholder}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="wish-message" className="mb-1.5 block text-xs font-semibold text-ink/70">
                {t.guestbook.messageLabel}
              </label>
              <textarea
                id="wish-message"
                className="field min-h-28 resize-y"
                value={message}
                maxLength={MESSAGE_MAX}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t.guestbook.messagePlaceholder}
                required
              />
              <p className="mt-1 text-end text-[11px] tabular-nums text-ink/40" dir="ltr">
                {message.length} / {MESSAGE_MAX}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
                {submitting ? <Spinner /> : <SendIcon />}
                {submitting ? t.guestbook.submitting : t.guestbook.submit}
              </button>

              <AnimatePresence mode="wait">
                {errorText && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="sm:text-end"
                  >
                    <p className="text-sm font-semibold text-blush-500">{errorText}</p>
                    {errorDetail && (
                      <p className="mt-1 max-w-xs break-words text-[11px] text-ink/40" dir="ltr">
                        {errorDetail}
                      </p>
                    )}
                  </motion.div>
                )}
                {!errorText && success && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="text-sm font-semibold text-sage-500"
                  >
                    {t.guestbook.success}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {!isSupabaseEnabled && (
              <p className="rounded-2xl bg-gold-200/30 px-4 py-3 text-xs leading-relaxed text-gold-600">
                {t.guestbook.localNotice}
              </p>
            )}
          </form>
        </Reveal>

        <div className="mt-10">
          {loading ? (
            <p className="text-center text-sm text-ink/50">{t.guestbook.loading}</p>
          ) : wishes.length === 0 ? (
            <p className="text-center text-sm text-ink/50">{t.guestbook.empty}</p>
          ) : (
            <>
              <p className="mb-5 text-center text-xs tracking-[0.2em] text-gold-500">
                {t.guestbook.counter(wishes.length)}
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => (
                    <motion.li
                      key={wish.id}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <WishCard wish={wish} isArabic={lang === 'ar'} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function WishCard({ wish, isArabic }: { wish: Wish; isArabic: boolean }) {
  const { t } = useLanguage()
  const initial = useMemo(() => wish.name.trim().charAt(0).toUpperCase() || '♥', [wish.name])

  return (
    <article className="card h-full p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-100 font-semibold text-blush-500">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{wish.name}</p>
          <p className="text-[11px] text-ink/45">{relativeTime(wish.created_at, t)}</p>
        </div>
      </div>
      <p
        className={`mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-ink/80 ${isArabic ? 'font-arabic' : ''}`}
      >
        {wish.message}
      </p>
    </article>
  )
}

function relativeTime(iso: string, t: ReturnType<typeof useLanguage>['t']): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) return t.guestbook.justNow
  if (minutes < 60) return t.guestbook.minutesAgo(minutes)

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return t.guestbook.hoursAgo(hours)

  return t.guestbook.daysAgo(Math.floor(hours / 24))
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 12 16-7-6 16-2.5-6.5L4 12Z" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  )
}
