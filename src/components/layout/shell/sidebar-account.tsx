'use client'

import NextLink from 'next/link'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { LuLogIn } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { SIDEBAR_CARD_WAVES } from '@/constants/common/wave.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { WaveLayer } from '@/components/common/waves/wave-layer'
import { ColorModeButton } from '@/components/ui/color-mode-button'
import { ShellAccount } from './shell-account'

/**
 * The sidebar's foot. Wide screens: a "join" card with its own little sea for guests, or the member's
 * name with their actions; the icon rail on tablets keeps only icon buttons.
 */
export function SidebarAccount() {
  const { user } = useAuth()

  return (
    <>
      <Stack hideFrom="xl" gap="2" align="center">
        <ColorModeButton />
        {user ? (
          <ShellAccount isIconsOnly />
        ) : (
          <GenericIconButton label={MESSAGES.NAV.LOGIN} asChild>
            <NextLink href={PAGE_ROUTES.LOGIN}>
              <LuLogIn />
            </NextLink>
          </GenericIconButton>
        )}
      </Stack>

      <Stack hideBelow="xl" gap="3">
        {user ? (
          <HStack gap="3" p="3" rounded="2xl" bg="app.surface" borderWidth="1px" borderColor="app.border">
            <NextLink href={PAGE_ROUTES.profile(user.userName)}>
              <UserAvatar user={user} size="sm" hasRing />
            </NextLink>
            <Text asChild flex="1" minW="0" fontWeight="semibold" truncate>
              <NextLink href={PAGE_ROUTES.profile(user.userName)}>{user.userName}</NextLink>
            </Text>
          </HStack>
        ) : (
          <Box position="relative" overflow="hidden" p="4" pb="10" rounded="2xl" borderWidth="1px" borderColor="app.border" bgImage="{gradients.brandSoft}">
            {SIDEBAR_CARD_WAVES.map((layer) => (
              <WaveLayer key={`${layer.color}-${layer.height}`} {...layer} />
            ))}
            <Stack position="relative" gap="3">
              <Stack gap="1">
                <Text fontWeight="bold">{MESSAGES.NAV.JOIN_TITLE}</Text>
                <Text fontSize="sm" color="fg.muted">
                  {MESSAGES.NAV.JOIN_DESCRIPTION}
                </Text>
              </Stack>
              <GenericButton asChild tone="gradient" size="sm" width="full">
                <NextLink href={PAGE_ROUTES.LOGIN}>{MESSAGES.NAV.LOGIN}</NextLink>
              </GenericButton>
              <GenericButton asChild tone="outline" size="sm" width="full" bg="app.surface">
                <NextLink href={PAGE_ROUTES.REGISTER}>{MESSAGES.NAV.SIGN_UP}</NextLink>
              </GenericButton>
            </Stack>
          </Box>
        )}
        <HStack justify="space-between" px="2">
          {user ? (
            <ShellAccount isInline isIconsOnly />
          ) : (
            <Text fontSize="sm" color="fg.muted">
              {MESSAGES.NAV.THEME}
            </Text>
          )}
          <ColorModeButton />
        </HStack>
      </Stack>
    </>
  )
}
