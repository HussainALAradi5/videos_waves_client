'use client'

import { useRef, useState } from 'react'
import { HEART_BURST_MS } from '@/constants/common/motion.constants'

const DOUBLE_TAP_MS = 300

/** Detects a double tap on touch screens and a double click with a mouse, and replays the burst. */
export const useDoubleTap = (onDoubleTap: () => void) => {
  const lastTap = useRef(0)
  const [burstKey, setBurstKey] = useState(0)

  const trigger = () => {
    setBurstKey((key) => key + 1)
    onDoubleTap()
    setTimeout(() => setBurstKey(0), HEART_BURST_MS)
  }
  const onPointerUp = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') return
    const now = Date.now()
    if (now - lastTap.current < DOUBLE_TAP_MS) trigger()
    lastTap.current = now
  }
  return { burstKey, onDoubleClick: trigger, onPointerUp }
}
