import type { IconType } from 'react-icons'

export interface NavLinkProps {
  href: string
  label: string
  icon: IconType
  isActive: boolean
  badge: number
  /** Shared layout id for the active pill, one per menu, so it glides between items. */
  indicatorId: string
  /** Sidebar shows labels on wide screens; the bottom bar shows icons only. */
  isCompact?: boolean
}
