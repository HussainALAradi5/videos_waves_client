import { DEFAULT_AVATARS } from '@/constants/users/user/avatar.constants'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

/** The uploaded picture, or the standard one for the person gender (neutral when unknown). */
export const resolveAvatarUrl = (user: Pick<PublicUser, 'avatarUrl' | 'gender'>): string =>
  user.avatarUrl ?? (user.gender ? DEFAULT_AVATARS[user.gender] : DEFAULT_AVATARS.NEUTRAL)
