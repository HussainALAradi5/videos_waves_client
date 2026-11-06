'use client'

import { HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { LuSquarePen, LuUsers } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { InboxFolder } from '@/enums/chat/conversation/inbox-folder.enum'
import { SHARE_VIDEO_QUERY_PARAM } from '@/hooks/common/use-share-link'
import type { InboxPanelProps } from '@/interfaces/components/chat/inbox/inbox-panel-props.interface'
import { useInbox } from '@/hooks/chat/conversation/use-inbox'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { SearchInput } from '@/components/common/inputs/search-input'
import { AnimatedTabs } from '@/components/common/tabs/animated-tabs'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { LoadMore } from '@/components/common/lists/load-more'
import { NewMessageDialog } from '../dialogs/new-message-dialog'
import { CreateGroupDialog } from '../dialogs/create-group-dialog'
import { InboxRow } from './inbox-row'
import { StatusPicker } from './status-picker'

export function InboxPanel({ activeConversationId, sharedVideoId }: InboxPanelProps) {
  const inbox = useInbox()
  const tabs = [
    { value: InboxFolder.INBOX, label: CHAT_MESSAGES.ALL },
    { value: InboxFolder.UNREAD, label: CHAT_MESSAGES.UNREAD },
    { value: InboxFolder.READ, label: CHAT_MESSAGES.READ },
    { value: InboxFolder.GROUPS, label: CHAT_MESSAGES.GROUPS },
    { value: InboxFolder.REQUESTS, label: CHAT_MESSAGES.REQUESTS, badge: inbox.requestCount }
  ]
  const linkFor = (id: string) => `${PAGE_ROUTES.conversation(id)}${sharedVideoId ? `?${SHARE_VIDEO_QUERY_PARAM}=${sharedVideoId}` : ''}`

  return (
    <Stack gap="4" height="full" minH="0">
      <HStack justify="space-between">
        <Heading size="lg">{CHAT_MESSAGES.TITLE}</Heading>
        <HStack gap="1">
          <StatusPicker />
          <GenericIconButton label={CHAT_MESSAGES.NEW_GROUP} onClick={() => inbox.setDialog('group')}>
            <LuUsers />
          </GenericIconButton>
          <GenericIconButton label={CHAT_MESSAGES.NEW_MESSAGE} onClick={() => inbox.setDialog('message')}>
            <LuSquarePen />
          </GenericIconButton>
        </HStack>
      </HStack>
      {sharedVideoId && (
        <Text fontSize="sm" p="3" rounded="xl" bg="brand.subtle" color="brand.fg">
          {CHAT_MESSAGES.CHOOSE_CHAT}
        </Text>
      )}
      {/* Fixed-height controls; only the chat list below grows and scrolls. */}
      <Stack gap="3" flexShrink={0}>
        <HStack>
          <SearchInput value={inbox.search} onChange={inbox.setSearch} placeholder={CHAT_MESSAGES.SEARCH} />
        </HStack>
        <AnimatedTabs tabs={tabs} value={inbox.folder} onChange={(value) => inbox.setFolder(value as InboxFolder)} size="sm" isFitted />
      </Stack>
      <Stack gap="0.5" overflowY="auto" flex="1" minH="0" mx="-2" px="2">
        {inbox.conversations.isLoading && <SkeletonList rows={6} />}
        {!inbox.conversations.isLoading && inbox.conversations.items.length === 0 && (
          <EmptyState
            title={inbox.folder === InboxFolder.REQUESTS ? CHAT_MESSAGES.EMPTY_REQUESTS : inbox.folder === InboxFolder.INBOX ? CHAT_MESSAGES.EMPTY_INBOX : CHAT_MESSAGES.EMPTY_FILTER}
            description={inbox.folder === InboxFolder.INBOX ? CHAT_MESSAGES.EMPTY_INBOX_HINT : undefined}
          />
        )}
        {inbox.conversations.items.map((conversation) => (
          <InboxRow key={conversation.id} conversation={conversation} isActive={conversation.id === activeConversationId} href={linkFor(conversation.id)} />
        ))}
        <LoadMore hasNextPage={inbox.conversations.hasNextPage} isFetchingNextPage={inbox.conversations.isFetchingNextPage} onLoadMore={inbox.conversations.fetchNextPage} />
      </Stack>
      <NewMessageDialog isOpen={inbox.dialog === 'message'} onClose={() => inbox.setDialog(null)} />
      <CreateGroupDialog isOpen={inbox.dialog === 'group'} onClose={() => inbox.setDialog(null)} />
    </Stack>
  )
}
