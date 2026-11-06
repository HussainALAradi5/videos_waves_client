import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Video {
  id: string
  code: string
  title: string
  description: string
  videoUrl: string
  mimeType: string
  owner: PublicUser
  likesCount: number
  commentsCount: number
  viewsCount: number
  isLiked: boolean
  createdAt: string
  updatedAt: string
}
