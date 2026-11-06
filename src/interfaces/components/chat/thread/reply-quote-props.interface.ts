import type { MessageReply } from '@/interfaces/chat/message/message-reply.interface'

export interface ReplyQuoteProps {
  reply: MessageReply
  isMine: boolean
}
