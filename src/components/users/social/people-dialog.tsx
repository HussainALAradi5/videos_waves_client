'use client'

import { Stack } from '@chakra-ui/react'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { PeopleDialogProps } from '@/interfaces/components/users/social/people-dialog-props.interface'
import { usePeople } from '@/hooks/users/social/use-people'
import { GenericModal } from '@/components/common/dialogs/generic-modal'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { LoadMore } from '@/components/common/lists/load-more'
import { FollowButton } from './follow-button'
import { UserRow } from './user-row'

/** Followers or following, each with a follow button (none on yourself). */
export function PeopleDialog({ userName, list, onClose }: PeopleDialogProps) {
  const people = usePeople(userName, list)
  return (
    <GenericModal isOpen={list !== null} onClose={onClose} title={list === 'following' ? SOCIAL_MESSAGES.FOLLOWING_LIST : SOCIAL_MESSAGES.FOLLOWERS} size="sm">
      {people.isLoading && <SkeletonList />}
      {!people.isLoading && people.items.length === 0 && <EmptyState title={SOCIAL_MESSAGES.NO_PEOPLE} />}
      <Stack gap="1">
        {people.items.map((person) => (
          <UserRow key={person.id} user={person} onNavigate={onClose} action={person.isMe ? undefined : <FollowButton userName={person.userName} isFollowing={person.isFollowing} size="xs" />} />
        ))}
      </Stack>
      <LoadMore hasNextPage={people.hasNextPage} isFetchingNextPage={people.isFetchingNextPage} onLoadMore={people.fetchNextPage} />
    </GenericModal>
  )
}
