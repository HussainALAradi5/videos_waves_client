import type { ChatBackground } from '@/enums/chat/conversation/chat-background.enum'
import type { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'

export interface UpdateConversationRequestDto {
  title?: string
  mute?: MuteDuration
  background?: ChatBackground
}
