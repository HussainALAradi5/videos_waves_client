'use client'

import NextLink from 'next/link'
import { Box, Float, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuBell } from 'react-icons/lu'
import { NOTIFICATION_LOOKS } from '@/constants/notifications/notification.constants'
import type { NotificationRowProps } from '@/interfaces/components/notifications/notification-row-props.interface'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { Animated } from '@/components/common/motion/animated'

/** One notification: who, a coloured kind badge, the text, when, and a dot until it is read. */
export function NotificationRow({ notification, onOpen }: NotificationRowProps) {
  const look = NOTIFICATION_LOOKS[notification.kind]
  return (
    <Animated variant="fadeUp">
      <HStack
        asChild
        gap="3"
        px="3"
        py="3"
        rounded="xl"
        bg={notification.isRead ? 'transparent' : 'brand.subtle'}
        _hover={{ bg: 'app.surfaceHover' }}
        transition="background 0.2s"
      >
        <NextLink href={notification.link} onClick={() => onOpen(notification)}>
          <Box position="relative" flexShrink={0}>
            {notification.actor ? (
              <UserAvatar user={notification.actor} size="md" />
            ) : (
              <Box boxSize="10" rounded="full" bgImage="{gradients.brand}" display="grid" placeItems="center" color="white">
                <LuBell />
              </Box>
            )}
            <Float placement="bottom-end" offsetX="1" offsetY="1">
              <Box boxSize="5" rounded="full" bg={look.color} color="white" display="grid" placeItems="center" borderWidth="2px" borderColor="app.surface">
                <Icon boxSize="2.5">
                  <look.icon />
                </Icon>
              </Box>
            </Float>
          </Box>
          <Stack gap="0.5" flex="1" minW="0">
            <Text fontSize="sm" fontWeight={notification.isRead ? 'normal' : 'semibold'} lineClamp={2}>
              {notification.message}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {formatRelativeDate(notification.createdAt)}
            </Text>
          </Stack>
          {!notification.isRead && <Box boxSize="2" rounded="full" bg="brand.solid" flexShrink={0} />}
        </NextLink>
      </HStack>
    </Animated>
  )
}
