import { useCallback, useEffect, useRef, useState } from 'react'

/** Only real interactions count as user activation; scrolling does not. */
const ARMING_EVENTS: (keyof WindowEventMap)[] = ['pointerdown', 'touchend', 'keydown']

/**
 * Background music that greets every visit: playback starts as early as the
 * browser permits, which is the visitor's first interaction anywhere on the
 * page. Muting is deliberately not remembered, so each visit opens with music.
 */
export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  /** Arming ends at the first successful start, after which a pause is a real choice. */
  const hasPlayed = useRef(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.55
    audioRef.current = audio

    const onError = () => setFailed(true)
    // "playing" fires once audio truly flows, unlike "play" which only means it was requested.
    const onPlaying = () => {
      hasPlayed.current = true
      setPlaying(true)
    }
    const onPause = () => setPlaying(false)

    audio.addEventListener('error', onError)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src])

  // Retries on every gesture until playback sticks, then tears itself down for good:
  // resuming after that would fight the visitor pausing from their lock screen.
  useEffect(() => {
    if (playing || failed || hasPlayed.current) return

    const attempt = () => {
      void audioRef.current?.play().catch(() => undefined)
    }

    ARMING_EVENTS.forEach((event) => window.addEventListener(event, attempt, { passive: true }))
    attempt()

    return () => {
      ARMING_EVENTS.forEach((event) => window.removeEventListener(event, attempt))
    }
  }, [playing, failed])

  /** Keyed off what is audible, so a first tap can never pause silence. */
  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      return
    }

    void audio.play().catch(() => undefined)
  }, [playing])

  return { playing, failed, toggle }
}
