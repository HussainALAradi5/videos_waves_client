import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'
import type { MessageGroup } from '@/interfaces/chat/message/message-group.interface'

export interface MessageGroupViewProps {
  group: MessageGroup
  showSender: boolean
  members: ChatMember[]
  /** Group admins; their name above a run of messages gets the Admin badge. */
  adminIds: string[]
  onReply: (message: Message) => void
}
