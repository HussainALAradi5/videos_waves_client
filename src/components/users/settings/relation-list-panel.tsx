'use client'

import { Stack, Text } from '@chakra-ui/react'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import type { RelationListPanelProps } from '@/interfaces/components/users/settings/relation-list-panel-props.interface'
import { useRelationList } from '@/hooks/users/social/use-relation-list'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { LoadMore } from '@/components/common/lists/load-more'
import { UserRow } from '@/components/users/social/user-row'
import { SettingsCard } from './settings-card'

/** Blocked or restricted accounts, each with Unblock or Unrestrict. */
export function RelationListPanel({ kind, title, actionLabel }: RelationListPanelProps) {
  const list = useRelationList(kind)
  return (
    <SettingsCard title={title}>
      <Stack gap="1" py="2">
        {!list.isLoading && list.items.length === 0 && <Text color="fg.muted">{SETTINGS_MESSAGES.NONE}</Text>}
        {list.items.map((person) => (
          <UserRow key={person.id} user={person} action={<GenericButton size="xs" tone="outline" onClick={() => list.undo(person.userName)}>{actionLabel}</GenericButton>} />
        ))}
        <LoadMore hasNextPage={list.hasNextPage} isFetchingNextPage={list.isFetchingNextPage} onLoadMore={list.fetchNextPage} />
      </Stack>
    </SettingsCard>
  )
}
