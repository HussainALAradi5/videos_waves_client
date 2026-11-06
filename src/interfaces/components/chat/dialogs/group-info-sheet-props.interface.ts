import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'

export interface GroupInfoSheetProps {
  conversation: Conversation
  isOpen: boolean
  onClose: () => void
}
