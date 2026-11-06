import type { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'

export interface UpdateConversationRequestDto {
  title?: string
  mute?: MuteDuration
}
