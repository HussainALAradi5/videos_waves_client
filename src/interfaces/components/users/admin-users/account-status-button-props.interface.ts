import type { Role } from '@/enums/users/roles/role.enum'

export interface AccountStatusButtonProps {
  userName: string
  role: Role
  isActive: boolean
}
