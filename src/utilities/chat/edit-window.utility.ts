import { CHAT_LIMITS } from '@/constants/chat/chat.constants'

export const isWithinEditWindow = (createdAt: string, now = Date.now()): boolean =>
  now - new Date(createdAt).getTime() <= CHAT_LIMITS.EDIT_WINDOW_MS
