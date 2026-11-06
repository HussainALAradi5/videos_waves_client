'use client'

import { useEffect, useRef, useState } from 'react'

const PERCENT = 100

/** Play and pause one audio element, with its progress (0-100). */
export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const onTime = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * PERCENT : 0)
    const onEnd = () => {
      setIsPlaying(false)
      setProgress(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play().then(() => setIsPlaying(true))
    else {
      audio.pause()
      setIsPlaying(false)
    }
  }
  return { audioRef, isPlaying, progress, toggle }
}
