import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'

export interface MessageBubbleProps {
  message: Message
  isMine: boolean
  /** Rounds the corners so a run of bubbles from one sender reads as one block. */
  position: 'single' | 'first' | 'middle' | 'last'
  /** The other members: their read times give the ticks and decide whether Unsend is still allowed. */
  members: ChatMember[]
  onReply: (message: Message) => void
}
