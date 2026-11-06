'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ChatEvent } from '@/enums/chat/realtime/chat-event.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { PresenceEvent } from '@/interfaces/chat/realtime/presence-event.interface'
import type { ReactionEvent } from '@/interfaces/chat/realtime/reaction-event.interface'
import type { ReadEvent } from '@/interfaces/chat/realtime/read-event.interface'
import type { TypingEvent } from '@/interfaces/chat/realtime/typing-event.interface'
import { socketClient } from '@/services/realtime/socket-client.service'
import { chatCache } from '@/utilities/cache/chat-cache.utility'
import { applyTyping } from '@/utilities/realtime/typing-store.utility'
import { playIncomingSound } from '@/utilities/realtime/notification-sound.utility'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useSettings } from '@/hooks/users/settings/use-settings'

/** Connects while signed in and turns every socket event into a cache update. */
export const useChatSocket = (): void => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { messageSound } = useSettings()
  const userId = user?.id ?? null

  useEffect(() => {
    if (!userId) return
    const socket = socketClient.connect()
    socket.on(ChatEvent.MESSAGE_NEW, (message: Message) => {
      chatCache.upsertMessage(queryClient, message)
      if (messageSound && message.sender.id !== userId) playIncomingSound()
    })
    socket.on(ChatEvent.MESSAGE_UPDATED, (message: Message) => chatCache.replaceMessage(queryClient, message))
    socket.on(ChatEvent.MESSAGE_REACTION, (event: ReactionEvent) => chatCache.applyReaction(queryClient, event, userId))
    socket.on(ChatEvent.CONVERSATION_READ, (event: ReadEvent) => chatCache.applyRead(queryClient, event))
    socket.on(ChatEvent.CONVERSATION_UPDATED, ({ conversationId }: { conversationId: string }) =>
      chatCache.refreshConversation(queryClient, conversationId)
    )
    socket.on(ChatEvent.TYPING, (event: TypingEvent) => applyTyping(queryClient, event))
    socket.on(ChatEvent.PRESENCE, (event: PresenceEvent) => chatCache.applyPresence(queryClient, event))
    return () => {
      socket.removeAllListeners()
    }
  }, [queryClient, userId, messageSound])

  useEffect(() => {
    if (!userId) socketClient.disconnect()
  }, [userId])
}
