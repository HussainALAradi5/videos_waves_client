'use client'

import { Box, Button, HStack, IconButton, Stack, Text, Textarea } from '@chakra-ui/react'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { useCommentItem } from '@/hooks/videos/comment/use-comment-item'
import type { CommentItemProps } from '@/interfaces/components/videos/comment/comment-item-props.interface'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

export function CommentItem({ comment }: CommentItemProps) {
  const item = useCommentItem(comment)

  return (
    <HStack align="flex-start" gap="3" p="4" bg="bg.subtle" borderRadius="lg">
      <UserAvatar user={comment.author} />
      <Stack gap="1" flex="1" minW="0">
        <HStack justify="space-between">
          <HStack gap="2">
            <Text fontWeight="semibold" fontSize="sm">
              {comment.author.userName}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {formatRelativeDate(comment.createdAt)}
            </Text>
          </HStack>
          <HStack gap="1">
            {item.canEdit && !item.isEditing && (
              <IconButton aria-label={MESSAGES.COMMON.EDIT} size="xs" variant="ghost" onClick={item.startEdit}>
                <LuPencil />
              </IconButton>
            )}
            {item.canDelete && (
              <IconButton aria-label={MESSAGES.COMMON.DELETE} size="xs" variant="ghost" colorPalette={PALETTES.DANGER} onClick={item.openDelete}>
                <LuTrash2 />
              </IconButton>
            )}
          </HStack>
        </HStack>
        {item.isEditing ? (
          <Box>
            <Textarea value={item.draft} onChange={(event) => item.setDraft(event.target.value)} autoresize bg="bg" />
            <HStack justify="flex-end" mt="2">
              <Button size="xs" variant="outline" onClick={item.cancelEdit}>
                {MESSAGES.COMMON.CANCEL}
              </Button>
              <Button size="xs" colorPalette={PALETTES.BRAND} onClick={item.saveEdit} loading={item.isSaving}>
                {MESSAGES.COMMON.SAVE}
              </Button>
            </HStack>
          </Box>
        ) : (
          <Text whiteSpace="pre-wrap" wordBreak="break-word">
            {comment.content}
          </Text>
        )}
      </Stack>
      <ConfirmDialog
        isOpen={item.isDeleteOpen}
        onClose={item.closeDelete}
        title={MESSAGES.COMMENTS.DELETE_TITLE}
        description={MESSAGES.COMMENTS.DELETE_DESCRIPTION}
        confirmLabel={MESSAGES.COMMON.DELETE}
        onConfirm={item.confirmDelete}
        isLoading={item.isDeleting}
      />
    </HStack>
  )
}
