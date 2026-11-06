import { LuHeart, LuMessageSquare, LuReply, LuShieldCheck, LuShieldX, LuUserCheck, LuUserPlus, LuUsers } from 'react-icons/lu'
import { NotificationKind } from '@/enums/notifications/notification-kind.enum'
import type { NotificationLook } from '@/interfaces/notifications/notification-look.interface'

/** The small badge on each notification's avatar. */
export const NOTIFICATION_LOOKS: Record<NotificationKind, NotificationLook> = {
  [NotificationKind.FOLLOW]: { icon: LuUserPlus, color: 'brand.solid' },
  [NotificationKind.FOLLOW_REQUEST]: { icon: LuUserPlus, color: 'orange.400' },
  [NotificationKind.FOLLOW_ACCEPTED]: { icon: LuUserCheck, color: 'green.500' },
  [NotificationKind.LIKE]: { icon: LuHeart, color: 'coral.500' },
  [NotificationKind.COMMENT]: { icon: LuMessageSquare, color: 'brand.solid' },
  [NotificationKind.REPLY]: { icon: LuReply, color: 'steel.500' },
  [NotificationKind.GROUP_ADDED]: { icon: LuUsers, color: 'teal.500' },
  [NotificationKind.ADMIN_ACCEPTED]: { icon: LuShieldCheck, color: 'green.500' },
  [NotificationKind.ADMIN_REJECTED]: { icon: LuShieldX, color: 'red.500' }
}

export const NOTIFICATION_PAGE_SIZE = 20

export const NOTIFICATION_MESSAGES = {
  TITLE: 'Notifications',
  DESCRIPTION: 'Follows, likes, comments, and group invites, newest first.',
  ALL: 'All',
  UNREAD: 'Unread',
  MARK_ALL_READ: 'Mark all read',
  ALL_READ: 'All caught up',
  EMPTY: 'Nothing new',
  EMPTY_HINT: 'When people follow you or react to your videos, it shows up here.',
  EMPTY_UNREAD: 'You have read everything.',
  OPEN: 'Open',
  BELL: 'Notifications',
  REQUESTS_TITLE: 'Follow requests',
  REQUESTS_HINT: 'People who want to see your private account.',
  ACCEPT: 'Accept',
  DECLINE: 'Decline',
  ACCEPTED: (name: string) => `${name} now follows you`,
  DECLINED: 'Request removed'
} as const
