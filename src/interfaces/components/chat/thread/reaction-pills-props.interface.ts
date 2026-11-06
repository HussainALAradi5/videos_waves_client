import type { ReactionCount } from '@/interfaces/chat/message/reaction-count.interface'

export interface ReactionPillsProps {
  reactions: ReactionCount[]
  myReaction: string | null
  onReact: (emoji: string) => void
  isMine: boolean
}
