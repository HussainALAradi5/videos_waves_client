import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

/** A row in a people list, with the viewer relation. */
export interface UserSummary extends PublicUser {
  isFollowing: boolean
  /** You asked to follow this private account. */
  isRequested: boolean
  isMe: boolean
}
