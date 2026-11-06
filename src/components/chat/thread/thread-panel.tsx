'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Stack } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { MemberStatus } from '@/enums/chat/conversation/member-status.enum'
import type { ThreadPanelProps } from '@/interfaces/components/chat/thread/thread-panel-props.interface'
import { useConversation } from '@/hooks/chat/conversation/use-conversation'
import { useChatComposer } from '@/hooks/chat/message/use-chat-composer'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { ErrorState } from '@/components/common/feedback/error-state'
import { ChatComposer } from '../composer/chat-composer'
import { GroupInfoSheet } from '../dialogs/group-info-sheet'
import { MessageList } from './message-list'
import { RequestBanner } from './request-banner'
import { ThreadHeader } from './thread-header'

/** One open chat: header, the live thread, and either the composer or the request banner. */
export function ThreadPanel({ conversationId, sharedVideoId }: ThreadPanelProps) {
  const router = useRouter()
  const { conversation, isLoading, error } = useConversation(conversationId)
  const composer = useChatComposer(conversationId, sharedVideoId, () => router.replace(PAGE_ROUTES.conversation(conversationId)))
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  if (isLoading) return <LoadingState />
  if (error || !conversation) return <ErrorState error={error} />
  return (
    <Stack gap="0" height="full" minH="0">
      <ThreadHeader conversation={conversation} onOpenInfo={() => setIsInfoOpen(true)} />
      <MessageList conversation={conversation} onReply={composer.setReplyTo} />
      {conversation.me.status === MemberStatus.REQUEST ? (
        <RequestBanner conversation={conversation} />
      ) : (
        <ChatComposer sharedVideoId={sharedVideoId} composer={composer} />
      )}
      <GroupInfoSheet conversation={conversation} isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </Stack>
  )
}
