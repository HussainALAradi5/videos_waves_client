'use client'

import { NOTIFICATION_PAGE_SIZE } from '@/constants/notifications/notification.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { NotificationFilter } from '@/enums/notifications/notification-filter.enum'
import type { AppNotification } from '@/interfaces/notifications/notification.interface'
import { notificationService } from '@/services/notifications/notification.service'
import { usePagedList } from '@/hooks/common/use-paged-list'

/** The bell's list, page by page, for all or only unread notifications. */
export const useNotifications = (filter: NotificationFilter) =>
  usePagedList<AppNotification>({
    queryKey: QUERY_KEYS.notificationList(filter),
    fetchPage: (page, signal) => notificationService.list({ page, pageSize: NOTIFICATION_PAGE_SIZE, filter }, signal)
  })
