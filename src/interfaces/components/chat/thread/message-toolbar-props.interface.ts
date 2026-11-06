import type { Message } from '@/interfaces/chat/message/message.interface'
import type { useMessageActions } from '@/hooks/chat/message/use-message-actions'

export interface MessageToolbarProps {
  message: Message
  isMine: boolean
  /** Someone else already read it, so it can no longer be unsent. */
  isSeen: boolean
  actions: ReturnType<typeof useMessageActions>
  isPickerOpen: boolean
  onPickerOpenChange: (isOpen: boolean) => void
  onReply: () => void
  onEdit: () => void
}
