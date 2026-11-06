import type { Message } from '@/interfaces/chat/message/message.interface'

export interface MessageContentProps {
  message: Message
  isMine: boolean
}
