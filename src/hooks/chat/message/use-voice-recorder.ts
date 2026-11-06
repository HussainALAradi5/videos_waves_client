'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CHAT_LIMITS, VOICE_MIME_TYPE } from '@/constants/chat/chat.constants'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'

const TICK_MS = 250
const MS_PER_SECOND = 1000

/** Records a voice message with MediaRecorder; stops by itself at the length limit. */
export const useVoiceRecorder = (onRecorded: (file: File) => void) => {
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const isCancelled = useRef(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stop = useCallback(() => recorder.current?.state === 'recording' && recorder.current.stop(), [])

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const media = new MediaRecorder(stream, MediaRecorder.isTypeSupported(VOICE_MIME_TYPE) ? { mimeType: VOICE_MIME_TYPE } : undefined)
      chunks.current = []
      isCancelled.current = false
      media.ondataavailable = (event) => chunks.current.push(event.data)
      media.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
        if (isCancelled.current || chunks.current.length === 0) return
        const type = media.mimeType.split(';')[0] || VOICE_MIME_TYPE
        onRecorded(new File(chunks.current, `voice-${Date.now()}.webm`, { type }))
      }
      recorder.current = media
      media.start()
      setElapsedMs(0)
      setError(null)
      setIsRecording(true)
    } catch {
      setError(CHAT_MESSAGES.MIC_BLOCKED)
    }
  }, [onRecorded])

  useEffect(() => {
    if (!isRecording) return undefined
    const startedAt = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt
      setElapsedMs(elapsed)
      if (elapsed >= CHAT_LIMITS.VOICE_MAX_SECONDS * MS_PER_SECOND) stop()
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [isRecording, stop])

  const cancel = () => {
    isCancelled.current = true
    stop()
  }
  return { isRecording, elapsedSeconds: Math.floor(elapsedMs / MS_PER_SECOND), error, start, stop, cancel }
}
