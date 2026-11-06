import type { PresenceState } from '@/enums/chat/realtime/presence-state.enum'

export interface PresenceEvent {
  userId: string
  isOnline: boolean
  presence: PresenceState
  statusText: string | null
}
