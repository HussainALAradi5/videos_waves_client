'use client'

import NextLink from 'next/link'
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuLock } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { CommentsLockedProps } from '@/interfaces/components/videos/comment/comments-locked-props.interface'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { Animated } from '@/components/common/motion/animated'

/** What guests see instead of the thread: a lock, why, and the way in. */
export function CommentsLocked({ returnTo }: CommentsLockedProps) {
  return (
    <Animated variant="fadeUp">
      <Stack gap="4" p="5" rounded="2xl" bg="app.surface" borderWidth="1px" borderColor="app.border" bgImage="{gradients.brandSoft}">
        <HStack gap="3">
          <Icon boxSize="10" p="2.5" rounded="full" bg="brand.muted" color="brand.fg" animation="waveBob 2.4s ease-in-out infinite" _motionReduce={{ animation: 'none' }}>
            <LuLock />
          </Icon>
          <Stack gap="0.5">
            <Text fontWeight="semibold">{MESSAGES.COMMENTS.LOCKED_TITLE}</Text>
            <Text fontSize="sm" color="fg.muted">
              {MESSAGES.COMMENTS.LOCKED_DESCRIPTION}
            </Text>
          </Stack>
        </HStack>
        <HStack gap="2">
          <GenericButton asChild tone="gradient" size="sm">
            <NextLink href={buildLoginPath(returnTo)}>{MESSAGES.NAV.LOGIN}</NextLink>
          </GenericButton>
          <GenericButton asChild tone="secondary" size="sm">
            <NextLink href={PAGE_ROUTES.REGISTER}>{MESSAGES.NAV.SIGN_UP}</NextLink>
          </GenericButton>
        </HStack>
      </Stack>
    </Animated>
  )
}
