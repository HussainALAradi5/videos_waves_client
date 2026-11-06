import { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export const MUTE_OPTIONS: DropdownOption[] = [
  { value: MuteDuration.OFF, label: 'Not muted' },
  { value: MuteDuration.EIGHT_HOURS, label: 'For 8 hours' },
  { value: MuteDuration.ONE_WEEK, label: 'For 1 week' },
  { value: MuteDuration.ALWAYS, label: 'Until I unmute' }
]

/** Text of the chat options shared by inbox rows, the chat header, and chat info. */
export const CHAT_OPTIONS_MESSAGES = {
  MENU: 'Chat options',
  MUTE_8H: 'Mute for 8 hours',
  MUTE_1W: 'Mute for 1 week',
  MUTE_ALWAYS: 'Mute until I unmute',
  UNMUTE: 'Unmute',
  MUTED: 'Muted. No sound or unread badge from this chat.',
  UNMUTED: 'Chat unmuted.',
  MUTED_UNTIL: (when: string) => `Muted until ${when}`,
  MUTED_ALWAYS: 'Muted until you unmute',
  DELETE_TITLE: (title: string) => `Delete "${title}" from your chats?`,
  DELETE_BODY: 'It goes from your list only; the others keep it. If someone writes again, the chat comes back with the new message.',
  DELETED: 'Chat deleted from your list.',
  LEAVE_TITLE: (title: string) => `Leave "${title}"?`,
  LEAVE_BODY: 'You stop getting its messages and cannot write in it. You can still read what was sent before you left.',
  LEFT: (title: string) => `You left "${title}".`
} as const
