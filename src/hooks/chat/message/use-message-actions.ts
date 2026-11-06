'use client'

import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import type { CursorPage } from '@/interfaces/common/pagination/cursor-page.interface'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { DeleteScope } from '@/enums/chat/message/delete-scope.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import { messageService } from '@/services/chat/message/message.service'
import { chatCache } from '@/utilities/cache/chat-cache.utility'
import { removeInfiniteItems } from '@/utilities/cache/infinite-cache.utility'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** React, edit, unsend, delete for me, and copy; the cache updates at once (sockets confirm for others). */
export const useMessageActions = (message: Message) => {
  const queryClient = useQueryClient()
  const { conversationId, id } = message
  const guard = (run: () => Promise<unknown>) => run().catch(notifyError)

  return {
    react: (emoji: string) =>
      guard(async () => {
        const updated = message.myReaction === emoji ? await messageService.unreact(conversationId, id) : await messageService.react(conversationId, id, emoji)
        chatCache.replaceMessage(queryClient, updated)
      }),
    edit: (body: string) => guard(async () => chatCache.replaceMessage(queryClient, await messageService.edit(conversationId, id, body))),
    unsend: () => guard(() => messageService.remove(conversationId, id, DeleteScope.EVERYONE)),
    deleteForMe: () =>
      guard(async () => {
        await messageService.remove(conversationId, id, DeleteScope.ME)
        queryClient.setQueryData<InfiniteData<CursorPage<Message>>>(QUERY_KEYS.messages(conversationId), (data) =>
          removeInfiniteItems(data, (item: Message) => item.id === id)
        )
      }),
    copy: () => {
      if (!message.body) return
      void navigator.clipboard.writeText(message.body)
      notifySuccess(CHAT_MESSAGES.COPIED)
    }
  }
}
