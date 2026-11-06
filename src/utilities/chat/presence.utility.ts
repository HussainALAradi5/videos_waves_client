import { PRESENCE_LOOK } from '@/constants/chat/presence.constants'
import { PresenceState } from '@/enums/chat/realtime/presence-state.enum'
import type { ChatMember } from '@/interfaces/chat/conversation/chat-member.interface'

/** "Online · In a meeting", "Busy", or just the custom line while offline; null when nothing is shown. */
export const describePresence = (member: ChatMember): string | null => {
  const isShown = member.presence !== null && member.presence !== PresenceState.OFFLINE
  const state = isShown && member.presence ? PRESENCE_LOOK[member.presence].label : null
  return [state, member.statusText].filter(Boolean).join(' · ') || null
}
