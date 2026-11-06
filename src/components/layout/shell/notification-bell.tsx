'use client'

import NextLink from 'next/link'
import { Badge, Box } from '@chakra-ui/react'
import { LuBell } from 'react-icons/lu'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useNotificationCount } from '@/hooks/notifications/use-notification-count'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'

/** The phone header's bell with the unread badge (the sidebar has its own nav entry). */
export function NotificationBell() {
  const { isAuthenticated } = useAuth()
  const unread = useNotificationCount()
  if (!isAuthenticated) return null
  return (
    <Box position="relative">
      <GenericIconButton label={NOTIFICATION_MESSAGES.BELL} asChild>
        <NextLink href={PAGE_ROUTES.NOTIFICATIONS}>
          <LuBell />
        </NextLink>
      </GenericIconButton>
      {unread > 0 && (
        <Badge position="absolute" top="0" right="0" size="xs" rounded="full" colorPalette="red" variant="solid" pointerEvents="none">
          {unread > 99 ? '99+' : unread}
        </Badge>
      )}
    </Box>
  )
}
