import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { MessagesView } from '@/views/chat/messages-view'

export const metadata: Metadata = { title: 'Messages' }

export default function MessagesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MessagesView conversationId={null} />
    </Suspense>
  )
}
