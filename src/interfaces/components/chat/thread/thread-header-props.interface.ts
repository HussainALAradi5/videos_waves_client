import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'

export interface ThreadHeaderProps {
  conversation: Conversation
  onOpenInfo: () => void
}
