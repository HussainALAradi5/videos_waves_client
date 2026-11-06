import type { MemberRole } from '@/enums/chat/conversation/member-role.enum'
import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'

export interface MemberRowProps {
  member: ChatMember
  canManage: boolean
  onRemove: () => unknown
  onSetRole: (role: MemberRole) => unknown
}
