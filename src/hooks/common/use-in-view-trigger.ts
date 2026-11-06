'use client'

import { useEffect, useRef } from 'react'

const ROOT_MARGIN = '400px'

/** Calls `onVisible` when the returned ref's element scrolls near the viewport (infinite scroll). */
export const useInViewTrigger = <TElement extends HTMLElement>(onVisible: () => void, isEnabled: boolean) => {
  const ref = useRef<TElement | null>(null)
  const callbackRef = useRef(onVisible)

  useEffect(() => {
    callbackRef.current = onVisible
  }, [onVisible])

  useEffect(() => {
    const element = ref.current
    if (!element || !isEnabled) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) callbackRef.current()
      },
      { rootMargin: ROOT_MARGIN }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [isEnabled])

  return ref
}
