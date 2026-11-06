import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Video extends BaseEntity {
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string | null
  mimeType: string
  durationSeconds: number | null
  owner: PublicUser
  likesCount: number
  commentsCount: number
  viewsCount: number
  isLiked: boolean
  updatedAt: string
}
