import type { NotificationKind } from '@/enums/notifications/notification-kind.enum'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface AppNotification {
  id: string
  kind: NotificationKind
  /** Who caused it; null for system ones (admin decisions). */
  actor: PublicUser | null
  /** Ready-to-show text from the server. */
  message: string
  /** In-app path to open. */
  link: string
  isRead: boolean
  createdAt: string
}
