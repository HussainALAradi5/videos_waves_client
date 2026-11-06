'use client'

import { useRef } from 'react'
import { useSettings } from '@/hooks/users/settings/use-settings'

/** Plays a muted preview while the card is hovered (when autoplay is on) and rewinds on leave. */
export const useHoverPreview = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { autoplayVideos } = useSettings()

  const onPointerEnter = () => {
    if (autoplayVideos) void videoRef.current?.play().catch(() => undefined)
  }
  const onPointerLeave = () => {
    const element = videoRef.current
    if (!element) return
    element.pause()
    element.currentTime = 0
  }
  return { videoRef, onPointerEnter, onPointerLeave }
}
