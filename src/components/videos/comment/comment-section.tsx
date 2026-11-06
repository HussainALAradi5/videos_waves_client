'use client'

import { Heading, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useComments } from '@/hooks/videos/comment/use-comments'
import { useCommentComposer } from '@/hooks/videos/comment/use-comment-composer'
import type { CommentSectionProps } from '@/interfaces/components/videos/comment/comment-section-props.interface'
import { Animated } from '@/components/common/motion/animated'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { ErrorState } from '@/components/common/feedback/error-state'
import { LoadMore } from '@/components/common/lists/load-more'
import { CommentComposer } from './comment-composer'
import { CommentItem } from './comment-item'
import { CommentsLocked } from './comments-locked'

/** The thread with its composer for members; guests get the count and a locked card. */
export function CommentSection({ videoId, videoOwnerId, commentsCount }: CommentSectionProps) {
  const { isAuthenticated } = useAuth()
  const comments = useComments(videoId, isAuthenticated)
  const composer = useCommentComposer(videoId)
  const heading = (
    <Heading id="comments-heading" as="h2" size="md">
      {MESSAGES.COMMENTS.TITLE} · {commentsCount}
    </Heading>
  )

  if (!isAuthenticated) {
    return (
      <Stack as="section" gap="5" aria-labelledby="comments-heading">
        {heading}
        <CommentsLocked returnTo={PAGE_ROUTES.video(videoId)} />
      </Stack>
    )
  }

  return (
    <Stack as="section" gap="5" aria-labelledby="comments-heading">
      {heading}
      <CommentComposer
        content={composer.content}
        onChange={composer.setContent}
        replyTo={composer.replyTo}
        onCancelReply={() => composer.setReplyTo(null)}
        onSubmit={composer.submit}
        canSubmit={composer.canSubmit}
      />
      {comments.isLoading && <SkeletonList rows={3} />}
      {comments.error && <ErrorState error={comments.error} onRetry={comments.refetch} />}
      {!comments.isLoading && comments.items.length === 0 && <Text color="fg.muted">{MESSAGES.COMMENTS.EMPTY}</Text>}
      <Stack gap="5">
        <AnimatePresence initial={false}>
          {comments.items.map((comment) => (
            <Animated key={comment.id} isLayout>
              <CommentItem comment={comment} videoOwnerId={videoOwnerId} onReply={composer.setReplyTo} />
            </Animated>
          ))}
        </AnimatePresence>
      </Stack>
      <LoadMore hasNextPage={comments.hasNextPage} isFetchingNextPage={comments.isFetchingNextPage} onLoadMore={comments.fetchNextPage} />
    </Stack>
  )
}
