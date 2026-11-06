import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'

export interface InboxRowProps {
  conversation: Conversation
  isActive: boolean
  href: string
}
