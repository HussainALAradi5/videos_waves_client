import { ReadState } from '@/enums/chat/message/read-state.enum'
import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'
import type { Message } from '@/interfaces/chat/message/message.interface'

/** How many of the other members have read up to `message` (hidden read times never count). */
export const countSeenBy = (message: Message, members: ChatMember[]): number =>
  members.filter((member) => member.lastReadAt !== null && member.lastReadAt >= message.createdAt).length

/** ✓ sent, ✓✓ grey seen by some (groups), ✓✓ blue read by everyone. Hidden read times count as unread. */
export const readStateOf = (message: Message, members: ChatMember[]): ReadState => {
  const seen = countSeenBy(message, members)
  if (seen === 0 || members.length === 0) return ReadState.SENT
  return seen >= members.length ? ReadState.READ : ReadState.SEEN_BY_SOME
}
