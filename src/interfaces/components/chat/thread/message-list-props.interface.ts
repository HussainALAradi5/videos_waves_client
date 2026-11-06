import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'

export interface MessageListProps {
  conversation: Conversation
  onReply: (message: Message) => void
}
