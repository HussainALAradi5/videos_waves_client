'use client'

import { CHAT_PAGE_SIZES } from '@/constants/chat/chat.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { InboxFolder } from '@/enums/chat/conversation/inbox-folder.enum'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import { conversationService } from '@/services/chat/conversation/conversation.service'
import { usePagedList } from '@/hooks/common/use-paged-list'

export const useConversations = (folder: InboxFolder, search: string) =>
  usePagedList<Conversation>({
    queryKey: QUERY_KEYS.conversationList(folder, search),
    fetchPage: (page, signal) =>
      conversationService.list({ folder, search: search || undefined, page, pageSize: CHAT_PAGE_SIZES.INBOX }, signal)
  })
