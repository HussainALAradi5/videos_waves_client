import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface ChatMember {
  user: PublicUser
  role: MemberRole
  /** null when unknown or hidden from you. */
  lastReadAt: string | null
  /** null when hidden from you. */
  isOnline: boolean | null
}
