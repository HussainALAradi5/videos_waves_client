import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { Conversation } from '@/interfaces/chat/conversation/conversation.interface'

/** Groups show their title; direct chats show the other person. */
export const conversationTitle = (conversation: Conversation): string =>
  conversation.type === ConversationType.GROUP
    ? (conversation.title ?? CHAT_MESSAGES.DIRECT_UNTITLED)
    : (conversation.members[0]?.user.userName ?? CHAT_MESSAGES.DIRECT_UNTITLED)

/** The other person in a direct chat (for the avatar and online dot). */
export const directPartner = (conversation: Conversation) =>
  conversation.type === ConversationType.DIRECT ? (conversation.members[0] ?? null) : null
