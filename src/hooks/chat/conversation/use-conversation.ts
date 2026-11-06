'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { conversationService } from '@/services/chat/conversation/conversation.service'

export const useConversation = (conversationId: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.conversation(conversationId),
    queryFn: ({ signal }) => conversationService.get(conversationId, signal)
  })
  return { conversation: query.data, isLoading: query.isPending, error: query.error }
}
