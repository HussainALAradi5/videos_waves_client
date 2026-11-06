import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { MemberStatus } from '@/enums/chat/conversation/member-status.enum'

export interface MyMembership {
  role: MemberRole
  status: MemberStatus
  unreadCount: number
  isMuted: boolean
}
