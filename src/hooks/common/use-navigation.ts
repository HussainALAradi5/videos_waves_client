'use client'

import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/constants/common/navigation.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useUnreadCount } from '@/hooks/chat/conversation/use-unread-count'

/** Nav entries for the current user, with the active one marked and the unread badge. */
export const useNavigation = () => {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const unread = useUnreadCount()
  const items = NAV_ITEMS.filter((item) => isAuthenticated || !item.requiresAuth).map((item) => {
    const href = item.href(user?.userName ?? null)
    const isActive = href === PAGE_ROUTES.HOME ? pathname === href : pathname.startsWith(href)
    return { ...item, href: () => href, resolvedHref: href, isActive, badge: item.key === 'messages' ? unread : 0 }
  })
  return { items, user, isAuthenticated }
}
