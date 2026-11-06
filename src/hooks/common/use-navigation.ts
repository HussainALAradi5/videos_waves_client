'use client'

import { usePathname } from 'next/navigation'
import { NAV_ITEMS, NAV_KEYS } from '@/constants/common/navigation.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useUnreadCount } from '@/hooks/chat/conversation/use-unread-count'
import { useNotificationCount } from '@/hooks/notifications/use-notification-count'

/** Nav entries for the current user, with the active one marked and the unread badges (messages, notifications). */
export const useNavigation = () => {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const unread = useUnreadCount()
  const notifications = useNotificationCount()
  const badges: Record<string, number> = { [NAV_KEYS.MESSAGES]: unread, [NAV_KEYS.NOTIFICATIONS]: notifications }
  const items = NAV_ITEMS.filter((item) => isAuthenticated || !item.requiresAuth).map((item) => {
    const href = item.href(user?.userName ?? null)
    const isActive = href === PAGE_ROUTES.HOME ? pathname === href : pathname.startsWith(href)
    return { ...item, href: () => href, resolvedHref: href, isActive, badge: badges[item.key] ?? 0 }
  })
  return { items, user, isAuthenticated }
}
