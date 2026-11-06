import type { Message } from '@/interfaces/chat/message/message.interface'
import type { MessageGroup } from '@/interfaces/chat/message/message-group.interface'

export interface MessageGroupViewProps {
  group: MessageGroup
  showSender: boolean
  onReply: (message: Message) => void
}
