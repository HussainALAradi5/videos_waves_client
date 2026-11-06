import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'

/** How many of the other members have read up to `message` (hidden read times never count). */
export const countSeenBy = (message: Message, members: ChatMember[]): number =>
  members.filter((member) => member.lastReadAt !== null && member.lastReadAt >= message.createdAt).length
