import type { Message } from '@/interfaces/chat/message/message.interface'

export interface ComposerReplyBarProps {
  message: Message
  onCancel: () => void
}
