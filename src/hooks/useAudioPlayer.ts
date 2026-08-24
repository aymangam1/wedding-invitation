import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'wedding:music-muted'

function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Background music that respects browser autoplay rules: playback is armed on
 * the visitor's first interaction (tap, click, key, scroll) unless they have
 * previously chosen to mute.
 */
export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState<boolean>(readStoredMuted)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.55
    audioRef.current = audio

    const onError = () => setFailed(true)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('error', onError)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
    } catch {
      // Storage is optional — the current session still behaves correctly.
    }
  }, [muted])

  // Arm playback on the first gesture, which is when autoplay policies allow it.
  useEffect(() => {
    if (muted) return

    let done = false
    const start = () => {
      if (done) return
      const audio = audioRef.current
      if (!audio) return
      audio.play().then(
        () => {
          done = true
          detach()
        },
        () => {
          // Still blocked; keep listening for another gesture.
        },
      )
    }

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'scroll']
    const detach = () => events.forEach((event) => window.removeEventListener(event, start))
    events.forEach((event) => window.addEventListener(event, start, { passive: true }))

    start()
    return detach
  }, [muted])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    setMuted((prev) => {
      const next = !prev
      if (!audio) return next
      if (next) {
        audio.pause()
      } else {
        void audio.play().catch(() => undefined)
      }
      return next
    })
  }, [])

  return { muted, playing, failed, toggle }
}
