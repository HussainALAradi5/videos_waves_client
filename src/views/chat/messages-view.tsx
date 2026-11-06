'use client'

import { Box, Grid } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { LuMessageCircle } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { SHARE_VIDEO_QUERY_PARAM } from '@/hooks/common/use-share-link'
import type { MessagesViewProps } from '@/interfaces/components/views/messages-view-props.interface'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { InboxPanel } from '@/components/chat/inbox/inbox-panel'
import { ThreadPanel } from '@/components/chat/thread/thread-panel'

const CHAT_HEIGHT = { base: 'calc(100dvh - 9.5rem)', md: 'calc(100dvh - 4rem)' }

/** Inbox and thread side by side on wide screens; on phones one at a time. */
export function MessagesView({ conversationId }: MessagesViewProps) {
  const sharedVideoId = useSearchParams().get(SHARE_VIDEO_QUERY_PARAM)
  return (
    <RequireAuth>
      <Grid templateColumns={{ base: '1fr', lg: '22rem minmax(0, 1fr)' }} height={CHAT_HEIGHT} rounded="3xl" overflow="hidden" bg="app.glass" backdropFilter="blur(16px)" borderWidth="1px" borderColor="app.border" shadow="card">
        <Box display={{ base: conversationId ? 'none' : 'block', lg: 'block' }} p="4" borderRightWidth={{ lg: '1px' }} borderColor="app.border" minH="0" height="full">
          <InboxPanel activeConversationId={conversationId} sharedVideoId={sharedVideoId} />
        </Box>
        <Box display={{ base: conversationId ? 'block' : 'none', lg: 'block' }} minH="0" height="full">
          {conversationId ? (
            <ThreadPanel key={conversationId} conversationId={conversationId} sharedVideoId={sharedVideoId} />
          ) : (
            <EmptyState title={CHAT_MESSAGES.PICK_CHAT} description={CHAT_MESSAGES.PICK_CHAT_HINT} icon={<LuMessageCircle />} />
          )}
        </Box>
      </Grid>
    </RequireAuth>
  )
}
