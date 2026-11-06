import { LuBell, LuHouse, LuMessageCircle, LuSearch, LuSettings, LuSquarePlus, LuUser } from 'react-icons/lu'
import type { NavItem } from '@/interfaces/common/navigation/nav-item.interface'
import { PAGE_ROUTES } from './routes.constants'

export const NAV_KEYS = {
  HOME: 'home',
  SEARCH: 'search',
  UPLOAD: 'upload',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  PROFILE: 'profile',
  SETTINGS: 'settings'
} as const

export const NAV_ITEMS: NavItem[] = [
  { key: NAV_KEYS.HOME, label: 'Home', icon: LuHouse, href: () => PAGE_ROUTES.HOME, requiresAuth: false, isPrimary: true },
  { key: NAV_KEYS.SEARCH, label: 'Search', icon: LuSearch, href: () => PAGE_ROUTES.SEARCH, requiresAuth: false, isPrimary: true },
  { key: NAV_KEYS.UPLOAD, label: 'Create', icon: LuSquarePlus, href: () => PAGE_ROUTES.UPLOAD, requiresAuth: true, isPrimary: true },
  { key: NAV_KEYS.MESSAGES, label: 'Messages', icon: LuMessageCircle, href: () => PAGE_ROUTES.MESSAGES, requiresAuth: true, isPrimary: true },
  // Sidebar only: phones reach it from the bell in the header.
  { key: NAV_KEYS.NOTIFICATIONS, label: 'Notifications', icon: LuBell, href: () => PAGE_ROUTES.NOTIFICATIONS, requiresAuth: true, isPrimary: false },
  {
    key: NAV_KEYS.PROFILE,
    label: 'Profile',
    icon: LuUser,
    href: (userName) => (userName ? PAGE_ROUTES.profile(userName) : PAGE_ROUTES.LOGIN),
    requiresAuth: true,
    isPrimary: true
  },
  { key: NAV_KEYS.SETTINGS, label: 'Settings', icon: LuSettings, href: () => PAGE_ROUTES.SETTINGS, requiresAuth: true, isPrimary: false }
]

/** One shared-layout id per menu, so each menu's active pill animates on its own. */
export const NAV_INDICATORS = {
  SIDEBAR: 'sidebar-active-pill',
  BOTTOM_BAR: 'bottom-bar-active-pill'
} as const

export const SHELL = {
  SIDEBAR_WIDTH: { md: '20', xl: '64' },
  BOTTOM_BAR_HEIGHT: '16',
  TOP_BAR_HEIGHT: '14'
} as const
