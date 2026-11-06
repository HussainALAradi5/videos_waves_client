import { LuHouse, LuMessageCircle, LuSearch, LuSettings, LuSquarePlus, LuUser } from 'react-icons/lu'
import type { NavItem } from '@/interfaces/common/navigation/nav-item.interface'
import { PAGE_ROUTES } from './routes.constants'

export const NAV_KEYS = { HOME: 'home', SEARCH: 'search', UPLOAD: 'upload', MESSAGES: 'messages', PROFILE: 'profile', SETTINGS: 'settings' } as const

export const NAV_ITEMS: NavItem[] = [
  { key: NAV_KEYS.HOME, label: 'Home', icon: LuHouse, href: () => PAGE_ROUTES.HOME, requiresAuth: false, isPrimary: true },
  { key: NAV_KEYS.SEARCH, label: 'Search', icon: LuSearch, href: () => PAGE_ROUTES.SEARCH, requiresAuth: false, isPrimary: true },
  { key: NAV_KEYS.UPLOAD, label: 'Create', icon: LuSquarePlus, href: () => PAGE_ROUTES.UPLOAD, requiresAuth: true, isPrimary: true },
  { key: NAV_KEYS.MESSAGES, label: 'Messages', icon: LuMessageCircle, href: () => PAGE_ROUTES.MESSAGES, requiresAuth: true, isPrimary: true },
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

export const SHELL = {
  SIDEBAR_WIDTH: { md: '20', xl: '64' },
  BOTTOM_BAR_HEIGHT: '16',
  TOP_BAR_HEIGHT: '14'
} as const
