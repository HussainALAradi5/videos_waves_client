'use client'

import { Stack, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { ConversationType } from '@/enums/chat/conversation/conversation-type.enum'
import type { MessageListProps } from '@/interfaces/components/chat/thread/message-list-props.interface'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useMessages } from '@/hooks/chat/message/use-messages'
import { useStickToBottom } from '@/hooks/chat/message/use-stick-to-bottom'
import { useTypingUsers } from '@/hooks/chat/realtime/use-typing-users'
import { groupMessages } from '@/utilities/chat/message-grouping.utility'
import { countSeenBy } from '@/utilities/chat/seen.utility'
import { LoadMore } from '@/components/common/lists/load-more'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { MessageGroupView } from './message-group-view'
import { TypingIndicator } from './typing-indicator'

/** The scrolling thread: older pages on top, grouped bubbles, typing dots, and Seen under your last message. */
export function MessageList({ conversation, onReply }: MessageListProps) {
  const { user } = useAuth()
  const thread = useMessages(conversation.id, conversation.me.status === 'accepted')
  const typing = useTypingUsers(conversation.id)
  const { ref, onScroll } = useStickToBottom(thread.items[0]?.id)
  const groups = groupMessages(thread.items, user?.id ?? null)
  const newest = thread.items[0]
  const seenBy = newest && newest.sender.id === user?.id ? countSeenBy(newest, conversation.members) : 0
  const isGroup = conversation.type === ConversationType.GROUP

  return (
    <Stack ref={ref} onScroll={onScroll} flex="1" minH="0" overflowY="auto" px={{ base: '3', md: '5' }} py="4" gap="3">
      <LoadMore hasNextPage={thread.hasOlder} isFetchingNextPage={thread.isFetchingOlder} onLoadMore={thread.fetchOlder} label={CHAT_MESSAGES.LOAD_OLDER} />
      {thread.isLoading && <SkeletonList rows={4} />}
      {groups.map((group) => (
        <MessageGroupView key={group.key} group={group} showSender={isGroup} onReply={onReply} />
      ))}
      {seenBy > 0 && (
        <Text alignSelf="flex-end" fontSize="2xs" color="fg.muted" px="2">
          {isGroup ? CHAT_MESSAGES.SEEN_BY(seenBy) : CHAT_MESSAGES.SEEN}
        </Text>
      )}
      <TypingIndicator isVisible={typing.length > 0} />
    </Stack>
  )
}
