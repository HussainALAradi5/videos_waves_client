'use client'

import { Heading, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useComments } from '@/hooks/videos/comment/use-comments'
import { useCommentComposer } from '@/hooks/videos/comment/use-comment-composer'
import type { CommentSectionProps } from '@/interfaces/components/videos/comment/comment-section-props.interface'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { Animated } from '@/components/common/motion/animated'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { ErrorState } from '@/components/common/feedback/error-state'
import { LoadMore } from '@/components/common/lists/load-more'
import { AppLink } from '@/components/common/navigation/app-link'
import { CommentComposer } from './comment-composer'
import { CommentItem } from './comment-item'

export function CommentSection({ videoId, videoOwnerId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth()
  const comments = useComments(videoId)
  const composer = useCommentComposer(videoId)

  return (
    <Stack as="section" gap="5" aria-labelledby="comments-heading">
      <Heading id="comments-heading" as="h2" size="md">
        {MESSAGES.COMMENTS.TITLE} · {comments.totalItems}
      </Heading>
      {isAuthenticated ? (
        <CommentComposer
          content={composer.content}
          onChange={composer.setContent}
          replyTo={composer.replyTo}
          onCancelReply={() => composer.setReplyTo(null)}
          onSubmit={composer.submit}
          canSubmit={composer.canSubmit}
        />
      ) : (
        <AppLink href={buildLoginPath(PAGE_ROUTES.video(videoId))} color="brand.fg">
          {MESSAGES.COMMENTS.SIGN_IN_TO_COMMENT}
        </AppLink>
      )}
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
