'use client'

import { useEffect } from 'react'
import { CHAT_PAGE_SIZES } from '@/constants/chat/chat.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { Message } from '@/interfaces/chat/message/message.interface'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { messageService } from '@/services/chat/message/message.service'
import { useCursorList } from '@/hooks/common/use-cursor-list'

/** The thread (cursor pages, newest first) and marking it read whenever a newer message is on screen. */
export const useMessages = (conversationId: string, canMarkRead: boolean) => {
  const thread = useCursorList<Message>({
    queryKey: QUERY_KEYS.messages(conversationId),
    fetchPage: (before, signal) => messageService.list(conversationId, { before, pageSize: CHAT_PAGE_SIZES.MESSAGES }, signal)
  })
  const newestId = thread.items[0]?.id
  useEffect(() => {
    if (newestId && canMarkRead) void conversationService.markRead(conversationId).catch(() => undefined)
  }, [conversationId, newestId, canMarkRead])
  return thread
}
