import type { AppNotification } from '@/interfaces/notifications/notification.interface'

export interface NotificationRowProps {
  notification: AppNotification
  onOpen: (notification: AppNotification) => void
}
