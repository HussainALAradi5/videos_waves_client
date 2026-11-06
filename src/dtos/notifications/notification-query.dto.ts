import type { NotificationFilter } from '@/enums/notifications/notification-filter.enum'

export interface NotificationQueryDto {
  page: number
  pageSize: number
  filter: NotificationFilter
}
