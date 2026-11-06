import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

/** A row in a people list, with the viewer relation. */
export interface UserSummary extends PublicUser {
  isFollowing: boolean
  isMe: boolean
}
