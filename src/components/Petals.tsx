import { useMemo } from 'react'
import type { CSSProperties } from 'react'

type Petal = {
  left: number
  size: number
  drift: number
  duration: number
  delay: number
  hue: string
  rounded: string
}

const HUES = ['#f6d2cf', '#eeb0ab', '#eadfc4', '#dcc999', '#b9c9b4']

/** Soft petals drifting down the hero — decorative only. */
export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: (index * 100) / count + Math.random() * 4,
        size: 7 + Math.random() * 9,
        drift: Math.round((Math.random() - 0.5) * 160),
        duration: 11 + Math.random() * 10,
        delay: -Math.random() * 20,
        hue: HUES[index % HUES.length],
        rounded: index % 3 === 0 ? '50% 0 50% 50%' : '50% 50% 50% 0',
      })),
    [count],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="petal"
          style={
            {
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size,
              background: petal.hue,
              borderRadius: petal.rounded,
              opacity: 0.5,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              '--drift': `${petal.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
