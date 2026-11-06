import type { ReactNode } from 'react'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface UserRowProps {
  user: PublicUser
  subtitle?: string
  action?: ReactNode
  onNavigate?: () => void
}
