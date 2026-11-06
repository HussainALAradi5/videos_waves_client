import { NOTIFICATION_ENDPOINTS } from '@/config/api/endpoints/notifications.endpoints'
import type { NotificationQueryDto } from '@/dtos/notifications/notification-query.dto'
import type { AppNotification } from '@/interfaces/notifications/notification.interface'
import { getData, getPage, patchData } from '../api/api-request'

export const notificationService = {
  list: (query: NotificationQueryDto, signal?: AbortSignal) => getPage<AppNotification>(NOTIFICATION_ENDPOINTS.ROOT, query, signal),
  unreadCount: () => getData<{ unreadCount: number }>(NOTIFICATION_ENDPOINTS.UNREAD_COUNT),
  markRead: (id: string) => patchData<AppNotification>(NOTIFICATION_ENDPOINTS.read(id)),
  markAllRead: () => patchData<{ updated: number }>(NOTIFICATION_ENDPOINTS.READ_ALL)
}
