'use client'

import { HStack, Text } from '@chakra-ui/react'
import { LuEyeOff } from 'react-icons/lu'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'
import type { CommentMetaProps } from '@/interfaces/components/videos/comment/comment-meta-props.interface'
import { GenericButton } from '@/components/common/buttons/generic-button'

/** Reply, Edited, and the pending-approval note under a comment. */
export function CommentMeta({ comment, canApprove, onApprove, onReply }: CommentMetaProps) {
  return (
    <HStack gap="3" fontSize="xs" color="fg.muted" wrap="wrap">
      {onReply && (
        <Text as="button" fontWeight="semibold" _hover={{ color: 'fg' }} onClick={onReply}>
          {COMMENT_MESSAGES.REPLY}
        </Text>
      )}
      {comment.isEdited && <Text>{COMMENT_MESSAGES.EDITED}</Text>}
      {comment.isPendingApproval && (
        <HStack gap="1">
          <LuEyeOff />
          <Text>{COMMENT_MESSAGES.PENDING}</Text>
        </HStack>
      )}
      {canApprove && (
        <GenericButton size="2xs" tone="primary" onClick={onApprove}>
          {COMMENT_MESSAGES.APPROVE}
        </GenericButton>
      )}
    </HStack>
  )
}
