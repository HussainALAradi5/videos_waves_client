'use client'

import { HStack, Stack } from '@chakra-ui/react'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { useFollowRequests } from '@/hooks/users/social/use-follow-requests'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { LoadMore } from '@/components/common/lists/load-more'
import { SettingsCard } from '@/components/users/settings/settings-card'
import { UserRow } from './user-row'

/** Pending follow requests for a private account; hidden when nobody is waiting. */
export function FollowRequestsCard() {
  const requests = useFollowRequests()
  if (requests.items.length === 0) return null
  return (
    <SettingsCard title={`${NOTIFICATION_MESSAGES.REQUESTS_TITLE} (${requests.totalItems})`} description={NOTIFICATION_MESSAGES.REQUESTS_HINT}>
      <Stack gap="1">
        {requests.items.map((person) => (
          <UserRow
            key={person.id}
            user={person}
            action={
              <HStack gap="2">
                <GenericButton size="xs" tone="gradient" onClick={() => requests.accept(person.userName)}>
                  {NOTIFICATION_MESSAGES.ACCEPT}
                </GenericButton>
                <GenericButton size="xs" tone="secondary" onClick={() => requests.decline(person.userName)}>
                  {NOTIFICATION_MESSAGES.DECLINE}
                </GenericButton>
              </HStack>
            }
          />
        ))}
        <LoadMore hasNextPage={requests.hasNextPage} isFetchingNextPage={requests.isFetchingNextPage} onLoadMore={requests.fetchNextPage} />
      </Stack>
    </SettingsCard>
  )
}
