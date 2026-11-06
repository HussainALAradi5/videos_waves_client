import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { MemberStatus } from '@/enums/chat/conversation/member-status.enum'

export interface MyMembership {
  role: MemberRole
  status: MemberStatus
  unreadCount: number
  isMuted: boolean
  /** When the mute ends; far in the future means until unmuted. */
  mutedUntil: string | null
}
