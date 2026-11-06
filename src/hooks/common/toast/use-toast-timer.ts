'use client'

import { useEffect, useRef, useState } from 'react'

/** Counts down to `onExpire` (pass a stable callback); pausing (hover or focus) keeps the time that was left. */
export const useToastTimer = (durationMs: number, onExpire: () => void) => {
  const [isPaused, setIsPaused] = useState(false)
  const remaining = useRef(durationMs)

  useEffect(() => {
    if (isPaused) return
    const startedAt = Date.now()
    const timer = setTimeout(onExpire, remaining.current)
    return () => {
      clearTimeout(timer)
      remaining.current -= Date.now() - startedAt
    }
  }, [isPaused, onExpire])

  return { isPaused, pause: () => setIsPaused(true), resume: () => setIsPaused(false) }
}
