'use client'

import { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { LuCheckCheck } from 'react-icons/lu'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { NotificationFilter } from '@/enums/notifications/notification-filter.enum'
import { useNotificationActions } from '@/hooks/notifications/use-notification-actions'
import { useNotificationCount } from '@/hooks/notifications/use-notification-count'
import { useNotifications } from '@/hooks/notifications/use-notifications'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { PageHeader } from '@/components/common/layout/page-header'
import { LoadMore } from '@/components/common/lists/load-more'
import { AnimatedTabs } from '@/components/common/tabs/animated-tabs'
import { NotificationRow } from '@/components/notifications/notification-row'
import { FollowRequestsCard } from '@/components/users/social/follow-requests-card'

const TABS = [
  { value: NotificationFilter.ALL, label: NOTIFICATION_MESSAGES.ALL },
  { value: NotificationFilter.UNREAD, label: NOTIFICATION_MESSAGES.UNREAD }
]

export function NotificationsView() {
  const [filter, setFilter] = useState(NotificationFilter.ALL)
  const list = useNotifications(filter)
  const unread = useNotificationCount()
  const actions = useNotificationActions()

  return (
    <RequireAuth>
      <Stack gap="6" maxW="2xl" mx="auto">
        <PageHeader
          title={NOTIFICATION_MESSAGES.TITLE}
          description={NOTIFICATION_MESSAGES.DESCRIPTION}
          actions={
            <GenericButton size="sm" tone="secondary" leftIcon={<LuCheckCheck />} onClick={actions.markAllRead} disabled={unread === 0} isLoading={actions.isMarkingAll}>
              {NOTIFICATION_MESSAGES.MARK_ALL_READ}
            </GenericButton>
          }
        />
        <FollowRequestsCard />
        <AnimatedTabs tabs={TABS.map((tab) => (tab.value === NotificationFilter.UNREAD ? { ...tab, badge: unread } : tab))} value={filter} onChange={(value) => setFilter(value as NotificationFilter)} isFitted />
        <Stack gap="1">
          {list.isLoading && <SkeletonList rows={6} />}
          {!list.isLoading && list.items.length === 0 && (
            <EmptyState
              title={NOTIFICATION_MESSAGES.EMPTY}
              description={filter === NotificationFilter.UNREAD ? NOTIFICATION_MESSAGES.EMPTY_UNREAD : NOTIFICATION_MESSAGES.EMPTY_HINT}
            />
          )}
          {list.items.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} onOpen={(item) => !item.isRead && actions.markRead(item.id)} />
          ))}
          <LoadMore hasNextPage={list.hasNextPage} isFetchingNextPage={list.isFetchingNextPage} onLoadMore={list.fetchNextPage} />
        </Stack>
      </Stack>
    </RequireAuth>
  )
}
