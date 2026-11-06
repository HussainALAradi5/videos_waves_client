import type { QueryClient } from '@tanstack/react-query'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { AppNotification } from '@/interfaces/notifications/notification.interface'
import { notifyInfo } from '@/utilities/toast/notify.utility'

type Open = (path: string) => void

const isMuted = (client: QueryClient, conversationId: string): boolean =>
  client.getQueryData<Conversation>(QUERY_KEYS.conversation(conversationId))?.me.isMuted ?? false

/** A pop-up for a message in a chat you do not have open (never your own, system notices, or muted chats). */
export const showMessagePopup = (client: QueryClient, message: Message, myUserId: string, open: Open): void => {
  const path = PAGE_ROUTES.conversation(message.conversationId)
  const isOpenHere = window.location.pathname === path
  if (message.sender.id === myUserId || message.kind === MessageKind.SYSTEM || isOpenHere || isMuted(client, message.conversationId)) return
  notifyInfo(CHAT_MESSAGES.NEW_MESSAGE_FROM(message.sender.userName), {
    description: message.body ?? CHAT_MESSAGES.ATTACHMENT_PREVIEW,
    action: { label: NOTIFICATION_MESSAGES.OPEN, onClick: () => open(path) }
  })
}

/** A new bell entry: refresh the badge and list, and show it as a toast with Open. */
export const showNotificationToast = (client: QueryClient, notification: AppNotification, open: Open): void => {
  void client.invalidateQueries({ queryKey: QUERY_KEYS.notifications })
  void client.invalidateQueries({ queryKey: QUERY_KEYS.followRequests })
  notifyInfo(notification.message, { action: { label: NOTIFICATION_MESSAGES.OPEN, onClick: () => open(notification.link) } })
}
