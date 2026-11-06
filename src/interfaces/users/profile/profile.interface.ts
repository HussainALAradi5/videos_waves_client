import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Profile extends PublicUser {
  bio: string
  followersCount: number
  followingCount: number
  videosCount: number
  createdAt: string
  isMe: boolean
  isFollowing: boolean
  followsYou: boolean
  isBlocked: boolean
  isRestricted: boolean
}
