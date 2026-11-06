'use client'

import { useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '@/constants/common/limits.constants'
import { InboxFolder } from '@/enums/chat/conversation/inbox-folder.enum'
import { useDebouncedValue } from '@/hooks/common/use-debounced-value'
import { useConversations } from './use-conversations'

/** Inbox folder, search, and the matching page of chats; plus a request count for the tab badge. */
export const useInbox = () => {
  const [folder, setFolder] = useState<InboxFolder>(InboxFolder.INBOX)
  const [search, setSearch] = useState('')
  const debounced = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)
  const conversations = useConversations(folder, debounced)
  const requests = useConversations(InboxFolder.REQUESTS, '')
  const [dialog, setDialog] = useState<'message' | 'group' | null>(null)
  return { folder, setFolder, search, setSearch, conversations, requestCount: requests.totalItems, dialog, setDialog }
}
