import type { PresenceState } from '@/enums/chat/realtime/presence-state.enum'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface UserAvatarProps {
  user: Pick<PublicUser, 'userName' | 'avatarUrl' | 'gender'>
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** The brand gradient ring (profiles, stories-style headers). */
  hasRing?: boolean
  /** Shows a green dot; null hides it (status unknown or private). */
  isOnline?: boolean | null
  /** Colours the dot (green online, amber away, red busy); offline or null hides it. */
  presence?: PresenceState | null
}
