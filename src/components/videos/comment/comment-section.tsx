'use client'

import { Button, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useComments } from '@/hooks/videos/comment/use-comments'
import type { CommentSectionProps } from '@/interfaces/components/videos/comment/comment-section-props.interface'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { QueryState } from '@/components/common/feedback/query-state'
import { AppLink } from '@/components/common/navigation/app-link'
import { CommentComposer } from './comment-composer'
import { CommentItem } from './comment-item'

export function CommentSection({ videoId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth()
  const comments = useComments(videoId)

  return (
    <Stack as="section" gap="5" mt="10" aria-labelledby="comments-heading">
      <Heading id="comments-heading" as="h2" size="lg">
        {MESSAGES.COMMENTS.TITLE} ({comments.totalItems})
      </Heading>
      {isAuthenticated ? (
        <CommentComposer videoId={videoId} />
      ) : (
        <AppLink href={buildLoginPath(PAGE_ROUTES.video(videoId))} color="cyan.fg">
          {MESSAGES.COMMENTS.SIGN_IN_TO_COMMENT}
        </AppLink>
      )}
      <QueryState
        isLoading={comments.isLoading}
        error={comments.error}
        onRetry={() => void comments.refetch()}
        isEmpty={comments.comments.length === 0}
        empty={<Text color="fg.muted">{MESSAGES.COMMENTS.EMPTY}</Text>}
      >
        <Stack gap="3">
          {comments.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </Stack>
        {comments.hasNextPage && (
          <Center>
            <Button variant="outline" onClick={comments.fetchNextPage} loading={comments.isFetchingNextPage}>
              {MESSAGES.COMMON.LOAD_MORE}
            </Button>
          </Center>
        )}
      </QueryState>
    </Stack>
  )
}
