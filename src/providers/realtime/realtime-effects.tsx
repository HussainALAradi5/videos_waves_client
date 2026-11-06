'use client'

import { useChatSocket } from '@/hooks/chat/realtime/use-chat-socket'

/** Renders nothing; keeps the live chat connection and its cache updates running. */
export function RealtimeEffects() {
  useChatSocket()
  return null
}
