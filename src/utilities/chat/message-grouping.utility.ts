import { MESSAGE_GROUP_WINDOW_MS } from '@/constants/chat/chat.constants'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { MessageGroup } from '@/interfaces/chat/message/message-group.interface'

const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
const dayKey = (iso: string): string => iso.slice(0, 10)

/**
 * Turns a newest-first page list into oldest-first groups: one group per run of messages from the
 * same sender within MESSAGE_GROUP_WINDOW_MS, a day label where the date changes, and system
 * notices always on their own.
 */
export const groupMessages = (newestFirst: Message[], myUserId: string | null): MessageGroup[] => {
  const groups: MessageGroup[] = []
  let previous: Message | null = null
  for (const message of [...newestFirst].reverse()) {
    const isNewDay = !previous || dayKey(previous.createdAt) !== dayKey(message.createdAt)
    const isSameRun =
      previous !== null &&
      !isNewDay &&
      previous.sender.id === message.sender.id &&
      previous.kind !== MessageKind.SYSTEM &&
      message.kind !== MessageKind.SYSTEM &&
      new Date(message.createdAt).getTime() - new Date(previous.createdAt).getTime() <= MESSAGE_GROUP_WINDOW_MS
    if (isSameRun) groups[groups.length - 1].messages.push(message)
    else
      groups.push({
        key: message.id,
        senderId: message.sender.id,
        isMine: message.sender.id === myUserId,
        dayLabel: isNewDay ? dayFormatter.format(new Date(message.createdAt)) : null,
        messages: [message]
      })
    previous = message
  }
  return groups
}
