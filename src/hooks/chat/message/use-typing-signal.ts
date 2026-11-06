'use client'

import { useCallback, useEffect, useRef } from 'react'
import { TYPING_THROTTLE_MS } from '@/constants/chat/realtime/typing.constants'
import { ChatEvent } from '@/enums/chat/realtime/chat-event.enum'
import { socketClient } from '@/services/realtime/socket-client.service'

/** Tells the others "typing" at most once per TYPING_THROTTLE_MS, and "stopped" when the text is cleared or sent. */
export const useTypingSignal = (conversationId: string) => {
  const lastSent = useRef(0)
  const emit = useCallback(
    (isTyping: boolean) => socketClient.get()?.emit(ChatEvent.TYPING, { conversationId, isTyping }),
    [conversationId]
  )
  const onTextChange = useCallback(
    (text: string) => {
      if (!text) {
        lastSent.current = 0
        return emit(false)
      }
      if (Date.now() - lastSent.current < TYPING_THROTTLE_MS) return
      lastSent.current = Date.now()
      emit(true)
    },
    [emit]
  )
  useEffect(() => () => void emit(false), [emit])
  return { onTextChange, stop: () => emit(false) }
}
