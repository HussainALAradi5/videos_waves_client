'use client'

import { useRef } from 'react'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { VIDEO_PREVIEW } from '@/constants/videos/video/video-preview.constants'

/** Plays a muted preview while the card is hovered (when autoplay is on) and rewinds to the preview frame on leave. */
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
    element.currentTime = VIDEO_PREVIEW.FRAME_SECONDS
  }
  return { videoRef, onPointerEnter, onPointerLeave }
}
