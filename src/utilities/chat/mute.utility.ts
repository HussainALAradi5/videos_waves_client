import { CHAT_OPTIONS_MESSAGES } from '@/constants/chat/chat-options.constants'
import { MuteDuration } from '@/enums/chat/conversation/mute-duration.enum'
import type { MyMembership } from '@/interfaces/chat/conversation/my-membership.interface'

// "Until I unmute" is stored as a date far in the future.
const FOREVER_YEAR = 9000

const untilFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })

export const isMutedForever = (me: MyMembership): boolean =>
  me.isMuted && me.mutedUntil !== null && new Date(me.mutedUntil).getFullYear() >= FOREVER_YEAR

/** The mute dropdown's value: off, until unmuted, or none (a timed mute shows its end as the placeholder). */
export const muteSelection = (me: MyMembership): string => (!me.isMuted ? MuteDuration.OFF : isMutedForever(me) ? MuteDuration.ALWAYS : '')

export const muteStatusLabel = (me: MyMembership): string | null => {
  if (!me.isMuted || !me.mutedUntil) return null
  return isMutedForever(me) ? CHAT_OPTIONS_MESSAGES.MUTED_ALWAYS : CHAT_OPTIONS_MESSAGES.MUTED_UNTIL(untilFormatter.format(new Date(me.mutedUntil)))
}
