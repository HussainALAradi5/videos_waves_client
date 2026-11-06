import type { Gender } from '@/enums/users/user/gender.enum'
import type { Role } from '@/enums/users/roles/role.enum'

export interface ImportUserRow {
  userName: string
  email: string
  gender: Gender
  role: Role
}

export interface ImportUsersResult {
  created: { userName: string; email: string; role: Role; temporaryPassword: string }[]
  skipped: { userName: string; email: string; reason: string }[]
}
