'use client'

import NextLink from 'next/link'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { CommentItemProps } from '@/interfaces/components/videos/comment/comment-item-props.interface'
import { useCommentItem } from '@/hooks/videos/comment/use-comment-item'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { InlineEditor } from '@/components/common/forms/inline-editor'
import { CommentMeta } from './comment-meta'
import { CommentMenu } from './comment-menu'
import { CommentReplies } from './comment-replies'
import { OwnerBadge } from './owner-badge'

export function CommentItem({ comment, videoOwnerId, onReply, isReply = false }: CommentItemProps) {
  const item = useCommentItem(comment, videoOwnerId)
  const profile = PAGE_ROUTES.profile(comment.author.userName)

  return (
    <HStack align="flex-start" gap="3" opacity={comment.isPendingApproval ? 0.75 : 1}>
      <NextLink href={profile}>
        <UserAvatar user={comment.author} size={isReply ? 'xs' : 'sm'} />
      </NextLink>
      <Stack gap="1" flex="1" minW="0">
        <HStack gap="2" wrap="wrap">
          <Text asChild fontWeight="semibold" fontSize="sm">
            <NextLink href={profile}>{comment.author.userName}</NextLink>
          </Text>
          {comment.isVideoOwner && <OwnerBadge />}
          <Text fontSize="xs" color="fg.muted">
            {formatRelativeDate(comment.createdAt)}
          </Text>
        </HStack>
        {item.isEditing ? (
          <InlineEditor
            initialValue={comment.content}
            maxLength={TEXT_LIMITS.COMMENT_MAX}
            onSave={item.saveEdit}
            onCancel={item.cancelEdit}
            saveLabel={MESSAGES.COMMON.SAVE}
            cancelLabel={MESSAGES.COMMON.CANCEL}
          />
        ) : (
          <Text whiteSpace="pre-wrap" wordBreak="break-word">
            {comment.content}
          </Text>
        )}
        <CommentMeta comment={comment} canApprove={item.canApprove} onApprove={item.approve} onReply={isReply ? undefined : () => onReply(comment)} />
        {!isReply && comment.repliesCount > 0 && (
          <CommentReplies comment={comment} videoOwnerId={videoOwnerId} isOpen={item.areRepliesOpen} onToggle={item.toggleReplies} onReply={onReply} />
        )}
      </Stack>
      <CommentMenu canEdit={item.canEdit} canDelete={item.canDelete} onEdit={item.startEdit} onDelete={item.remove} />
    </HStack>
  )
}
