'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { notificationService } from '@/services/notifications/notification.service'
import { useAuth } from '@/hooks/users/auth/use-auth'

/** The bell badge; live updates invalidate it when a notification arrives. */
export const useNotificationCount = (): number => {
  const { isAuthenticated } = useAuth()
  const query = useQuery({ queryKey: QUERY_KEYS.notificationUnread, queryFn: notificationService.unreadCount, enabled: isAuthenticated })
  return isAuthenticated ? (query.data?.unreadCount ?? 0) : 0
}
