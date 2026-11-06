import type { ChatBackground } from '@/enums/chat/conversation/chat-background.enum'
import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { MemberStatus } from '@/enums/chat/conversation/member-status.enum'

export interface MyMembership {
  role: MemberRole
  status: MemberStatus
  unreadCount: number
  isMuted: boolean
  /** When the mute ends; far in the future means until unmuted. */
  mutedUntil: string | null
  /** Your own wallpaper for this chat; nobody else sees it. */
  background: ChatBackground
}
