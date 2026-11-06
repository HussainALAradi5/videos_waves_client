import type { IconType } from 'react-icons'

export interface NavItem {
  key: string
  label: string
  icon: IconType
  /** Resolved per user (the profile link needs the username). */
  href: (userName: string | null) => string
  requiresAuth: boolean
  /** Shown in the mobile bottom bar as well as the sidebar. */
  isPrimary: boolean
}
