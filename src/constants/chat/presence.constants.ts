import { PresenceMode } from '@/enums/users/settings/presence-mode.enum'
import { PresenceState } from '@/enums/chat/realtime/presence-state.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

/** Dot colour and label of each status others see; offline shows no dot. */
export const PRESENCE_LOOK: Record<PresenceState, { label: string; color: string | null }> = {
  [PresenceState.ONLINE]: { label: 'Online', color: 'green.500' },
  [PresenceState.AWAY]: { label: 'Away', color: 'orange.400' },
  [PresenceState.BUSY]: { label: 'Busy', color: 'red.500' },
  [PresenceState.OFFLINE]: { label: 'Offline', color: null }
}

export const PRESENCE_OPTIONS: DropdownOption[] = [
  { value: PresenceMode.ONLINE, label: 'Online', colorPalette: 'green' },
  { value: PresenceMode.AWAY, label: 'Away', colorPalette: 'orange' },
  { value: PresenceMode.BUSY, label: 'Busy', colorPalette: 'red' },
  { value: PresenceMode.INVISIBLE, label: 'Appear offline', colorPalette: 'gray' }
]

export const PRESENCE_MESSAGES = {
  PICKER: 'Your status'
} as const
