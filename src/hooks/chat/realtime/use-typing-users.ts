'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'

/** Ids of people typing in this chat right now (written by the socket, never fetched). */
export const useTypingUsers = (conversationId: string): string[] =>
  useQuery<string[]>({ queryKey: QUERY_KEYS.typing(conversationId), queryFn: () => [], enabled: false, initialData: [] }).data
