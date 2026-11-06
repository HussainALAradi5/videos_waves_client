import type { useChatOptions } from '@/hooks/chat/conversation/use-chat-options'

export interface ChatBackgroundDialogProps {
  options: ReturnType<typeof useChatOptions>
}
