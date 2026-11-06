import type { IconType } from 'react-icons'

export interface NavLinkProps {
  href: string
  label: string
  icon: IconType
  isActive: boolean
  badge: number
  /** Sidebar shows labels on wide screens; the bottom bar shows icons only. */
  isCompact?: boolean
}
