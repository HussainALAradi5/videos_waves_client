'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { useAuth } from '@/hooks/users/auth/use-auth'

/** The Messages badge: unread messages across accepted, unmuted chats. */
export const useUnreadCount = (): number => {
  const { isAuthenticated } = useAuth()
  const query = useQuery({ queryKey: QUERY_KEYS.unread, queryFn: conversationService.unreadCount, enabled: isAuthenticated })
  return isAuthenticated ? (query.data?.unreadCount ?? 0) : 0
}
