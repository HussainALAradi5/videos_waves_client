import type { Role } from '@/enums/users/roles/role.enum'
import type { Gender } from '@/enums/users/user/gender.enum'
import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'

export interface User extends BaseEntity {
  userName: string
  email: string
  /** Private: only you and admins see it. */
  phone: string | null
  role: Role
  gender: Gender | null
  avatarUrl: string | null
  bio: string
  followersCount: number
  followingCount: number
  videosCount: number
  /** False when an admin deactivated the account. */
  isActive: boolean
}
