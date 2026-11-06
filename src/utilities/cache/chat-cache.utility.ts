import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { CursorPage } from '@/interfaces/common/pagination/cursor-page.interface'
import type { PresenceEvent } from '@/interfaces/chat/realtime/presence-event.interface'
import type { ReactionEvent } from '@/interfaces/chat/realtime/reaction-event.interface'
import type { ReadEvent } from '@/interfaces/chat/realtime/read-event.interface'
import { mapInfiniteItems, prependInfiniteItem } from './infinite-cache.utility'

type Thread = InfiniteData<CursorPage<Message>>

/** Live updates write straight into the query cache, so lists and threads re-render without refetching. */
export const chatCache = {
  upsertMessage: (client: QueryClient, message: Message) => {
    client.setQueryData<Thread>(QUERY_KEYS.messages(message.conversationId), (data) =>
      prependInfiniteItem(data, message, (item) => item.id)
    )
    void client.invalidateQueries({ queryKey: QUERY_KEYS.conversations })
    void client.invalidateQueries({ queryKey: QUERY_KEYS.unread })
  },
  replaceMessage: (client: QueryClient, message: Message) => {
    client.setQueryData<Thread>(QUERY_KEYS.messages(message.conversationId), (data) =>
      mapInfiniteItems(data, (item: Message) => (item.id === message.id ? message : item))
    )
  },
  applyReaction: (client: QueryClient, event: ReactionEvent, myUserId: string | null) => {
    client.setQueryData<Thread>(QUERY_KEYS.messages(event.conversationId), (data) =>
      mapInfiniteItems(data, (item: Message) =>
        item.id === event.messageId
          ? { ...item, reactions: event.reactions, myReaction: event.userId === myUserId ? event.emoji : item.myReaction }
          : item
      )
    )
  },
  applyRead: (client: QueryClient, event: ReadEvent) => {
    client.setQueryData<Conversation>(QUERY_KEYS.conversation(event.conversationId), (conversation) =>
      conversation && {
        ...conversation,
        members: conversation.members.map((member) => (member.user.id === event.userId ? { ...member, lastReadAt: event.lastReadAt } : member))
      }
    )
  },
  applyPresence: (client: QueryClient, event: PresenceEvent) => {
    client.setQueriesData<Conversation>({ queryKey: ['chat', 'conversation'] }, (conversation) =>
      conversation && {
        ...conversation,
        members: conversation.members.map((member) =>
          member.user.id === event.userId && member.isOnline !== null ? { ...member, isOnline: event.isOnline } : member
        )
      }
    )
  },
  refreshConversation: (client: QueryClient, conversationId: string) => {
    void client.invalidateQueries({ queryKey: QUERY_KEYS.conversation(conversationId) })
    void client.invalidateQueries({ queryKey: QUERY_KEYS.conversations })
    void client.invalidateQueries({ queryKey: QUERY_KEYS.unread })
  }
}
