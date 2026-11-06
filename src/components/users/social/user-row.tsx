import NextLink from 'next/link'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { UserRowProps } from '@/interfaces/components/users/social/user-row-props.interface'
import { UserAvatar } from '@/components/common/avatars/user-avatar'

/** Avatar, username, optional subtitle, and an action (follow, unblock) on the right. */
export function UserRow({ user, subtitle, action, onNavigate }: UserRowProps) {
  return (
    <HStack gap="3" py="1.5">
      <HStack asChild gap="3" flex="1" minW="0">
        <NextLink href={PAGE_ROUTES.profile(user.userName)} onClick={onNavigate}>
          <UserAvatar user={user} size="md" />
          <Stack gap="0" minW="0">
            <Text fontWeight="semibold" truncate>
              {user.userName}
            </Text>
            {subtitle && (
              <Text fontSize="sm" color="fg.muted" truncate>
                {subtitle}
              </Text>
            )}
          </Stack>
        </NextLink>
      </HStack>
      {action}
    </HStack>
  )
}
