'use client'

import { useEffect, useRef } from 'react'

const NEAR_BOTTOM_PX = 120

/** Keeps the thread scrolled to the newest message, unless the reader scrolled up to read older ones. */
export const useStickToBottom = (newestKey: string | undefined) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isPinned = useRef(true)
  useEffect(() => {
    const element = ref.current
    if (element && isPinned.current) element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [newestKey])
  const onScroll = () => {
    const element = ref.current
    if (element) isPinned.current = element.scrollHeight - element.scrollTop - element.clientHeight < NEAR_BOTTOM_PX
  }
  return { ref, onScroll }
}
