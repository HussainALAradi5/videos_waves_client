import type { Message } from '@/interfaces/chat/message/message.interface'
import type { useMessageActions } from '@/hooks/chat/message/use-message-actions'

export interface MessageToolbarProps {
  message: Message
  isMine: boolean
  actions: ReturnType<typeof useMessageActions>
  onReply: () => void
  onEdit: () => void
}
