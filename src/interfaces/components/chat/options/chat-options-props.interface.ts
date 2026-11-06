import type { ReactNode } from 'react'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'

export interface ChatOptionsProps {
  conversation: Conversation
  /** Right-clicking this (the inbox row) opens the same menu. */
  contextArea?: ReactNode
}
