import type { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'
import type { ChatMember } from './chat-member.interface'
import type { LastMessage } from './last-message.interface'
import type { MyMembership } from './my-membership.interface'

export interface Conversation extends BaseEntity {
  type: ConversationType
  title: string | null
  /** Everyone except you. */
  members: ChatMember[]
  membersCount: number
  me: MyMembership
  lastMessage: LastMessage | null
  lastMessageAt: string | null
}
