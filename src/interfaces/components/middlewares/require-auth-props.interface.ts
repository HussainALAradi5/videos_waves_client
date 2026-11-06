import type { ReactNode } from 'react'
import type { Role } from '@/enums/users/roles/role.enum'

export interface RequireAuthProps {
  children: ReactNode
  role?: Role
}
