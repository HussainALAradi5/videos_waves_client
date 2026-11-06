import type { ReactionCount } from '@/interfaces/chat/message/reaction-count.interface'

export interface ReactionEvent {
  conversationId: string
  messageId: string
  userId: string
  emoji: string | null
  reactions: ReactionCount[]
}
