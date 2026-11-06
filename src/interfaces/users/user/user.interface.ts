import type { Role } from '@/enums/users/roles/role.enum'
import type { Gender } from '@/enums/users/user/gender.enum'
import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'

export interface User extends BaseEntity {
  userName: string
  email: string
  role: Role
  gender: Gender | null
  avatarUrl: string | null
  bio: string
  followersCount: number
  followingCount: number
  videosCount: number
}
