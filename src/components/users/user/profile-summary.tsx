import { Card, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { ROLE_OPTIONS } from '@/constants/users/roles/role.constants'
import type { ProfileSectionProps } from '@/interfaces/components/users/user/profile-section-props.interface'
import { formatDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { StatusBadge } from '@/components/common/badges/status-badge'
import { ProfileActions } from './profile-actions'

export function ProfileSummary({ user }: ProfileSectionProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Stack direction={{ base: 'column', md: 'row' }} gap="6" align={{ md: 'center' }} justify="space-between">
          <HStack gap="4">
            <UserAvatar user={user} size="2xl" />
            <Stack gap="1">
              <HStack gap="2">
                <Heading size="xl">{user.userName}</Heading>
                <StatusBadge value={user.role} options={ROLE_OPTIONS} />
              </HStack>
              <Text color="fg.muted">{user.email}</Text>
              <Text fontSize="sm" color="fg.subtle">
                {MESSAGES.PROFILE.MEMBER_SINCE(formatDate(user.createdAt))}
              </Text>
            </Stack>
          </HStack>
          <ProfileActions user={user} />
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
