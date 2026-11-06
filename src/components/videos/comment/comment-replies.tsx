'use client'

import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'
import type { CommentRepliesProps } from '@/interfaces/components/videos/comment/comment-replies-props.interface'
import { useReplies } from '@/hooks/videos/comment/use-comments'
import { Animated } from '@/components/common/motion/animated'
import { LoadMore } from '@/components/common/lists/load-more'
import { CommentItem } from './comment-item'

/** "View N replies" that expands the thread in place. */
export function CommentReplies({ comment, videoOwnerId, isOpen, onToggle, onReply }: CommentRepliesProps) {
  const replies = useReplies(comment.videoId, comment.id, isOpen)
  return (
    <Stack gap="3" mt="1">
      <HStack as="button" gap="2" onClick={onToggle} color="fg.muted" fontSize="xs" fontWeight="semibold">
        <Box width="6" height="1px" bg="border.emphasized" />
        <Text>{isOpen ? COMMENT_MESSAGES.HIDE_REPLIES : COMMENT_MESSAGES.VIEW_REPLIES(comment.repliesCount)}</Text>
      </HStack>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Animated variant="collapse" overflow="hidden">
            <Stack gap="4">
              {replies.items.map((reply) => (
                <CommentItem key={reply.id} comment={reply} videoOwnerId={videoOwnerId} onReply={onReply} isReply />
              ))}
              <LoadMore hasNextPage={replies.hasNextPage} isFetchingNextPage={replies.isFetchingNextPage} onLoadMore={replies.fetchNextPage} />
            </Stack>
          </Animated>
        )}
      </AnimatePresence>
    </Stack>
  )
}
