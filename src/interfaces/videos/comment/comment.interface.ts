import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Comment extends BaseEntity {
  videoId: string
  parentId: string | null
  content: string
  author: PublicUser
  /** The author owns the video: show the Owner badge. */
  isVideoOwner: boolean
  isEdited: boolean
  /** From a restricted account: only its author and the video owner can see it until approved. */
  isPendingApproval: boolean
  repliesCount: number
  updatedAt: string
}
