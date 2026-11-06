'use client'

import { HStack, Text } from '@chakra-ui/react'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { FollowRequestBannerProps } from '@/interfaces/components/users/profile/follow-request-banner-props.interface'
import { useFollowRequests } from '@/hooks/users/social/use-follow-requests'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { Animated } from '@/components/common/motion/animated'

/** On the profile of someone who asked to follow you: Accept or Decline right there. */
export function FollowRequestBanner({ profile }: FollowRequestBannerProps) {
  const requests = useFollowRequests(false)
  if (!profile.requestedYou) return null
  return (
    <Animated variant="fadeUp">
      <HStack justify="space-between" gap="3" p="3" mb="6" rounded="xl" bg="brand.subtle" flexWrap="wrap">
        <Text fontSize="sm" fontWeight="medium">
          {SOCIAL_MESSAGES.WANTS_TO_FOLLOW(profile.userName)}
        </Text>
        <HStack gap="2">
          <GenericButton size="xs" tone="gradient" onClick={() => requests.accept(profile.userName)}>
            {NOTIFICATION_MESSAGES.ACCEPT}
          </GenericButton>
          <GenericButton size="xs" tone="secondary" onClick={() => requests.decline(profile.userName)}>
            {NOTIFICATION_MESSAGES.DECLINE}
          </GenericButton>
        </HStack>
      </HStack>
    </Animated>
  )
}
