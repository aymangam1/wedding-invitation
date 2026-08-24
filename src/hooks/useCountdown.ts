import { useEffect, useState } from 'react'

export type CountdownPhase = 'before' | 'during' | 'after'

export type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  phase: CountdownPhase
}

function compute(startsAt: number, endsAt: number): Countdown {
  const remaining = startsAt - Date.now()

  if (remaining <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      phase: Date.now() < endsAt ? 'during' : 'after',
    }
  }

  const totalSeconds = Math.floor(remaining / 1000)

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    phase: 'before',
  }
}

export function useCountdown(startsAtIso: string, endsAtIso: string): Countdown {
  const startsAt = new Date(startsAtIso).getTime()
  const endsAt = new Date(endsAtIso).getTime()

  const [value, setValue] = useState<Countdown>(() => compute(startsAt, endsAt))

  useEffect(() => {
    setValue(compute(startsAt, endsAt))
    const id = window.setInterval(() => setValue(compute(startsAt, endsAt)), 1000)
    return () => window.clearInterval(id)
  }, [startsAt, endsAt])

  return value
}
