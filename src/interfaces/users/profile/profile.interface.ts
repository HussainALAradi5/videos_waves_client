import type { Role } from '@/enums/users/roles/role.enum'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Profile extends PublicUser {
  bio: string
  followersCount: number
  followingCount: number
  videosCount: number
  createdAt: string
  isMe: boolean
  role: Role
  /** False when an admin deactivated the account; only admins can open such a profile. */
  isActive: boolean
  isFollowing: boolean
  followsYou: boolean
  isBlocked: boolean
  isRestricted: boolean
}
