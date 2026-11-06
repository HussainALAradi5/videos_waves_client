'use client'

import { HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'
import type { CommentComposerProps } from '@/interfaces/components/videos/comment/comment-composer-props.interface'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'

export function CommentComposer({ content, onChange, replyTo, onCancelReply, onSubmit, canSubmit }: CommentComposerProps) {
  return (
    <Stack gap="2" p="3" rounded="2xl" bg="app.surface" borderWidth="1px" borderColor="app.border">
      {replyTo && (
        <HStack justify="space-between" fontSize="xs" color="fg.muted">
          <Text>{COMMENT_MESSAGES.REPLYING_TO(replyTo.author.userName)}</Text>
          <GenericIconButton label={MESSAGES.COMMON.CANCEL} size="2xs" onClick={onCancelReply}>
            <LuX />
          </GenericIconButton>
        </HStack>
      )}
      <Textarea
        value={content}
        onChange={(event) => onChange(event.target.value)}
        placeholder={MESSAGES.COMMENTS.PLACEHOLDER}
        aria-label={MESSAGES.COMMENTS.PLACEHOLDER}
        maxLength={TEXT_LIMITS.COMMENT_MAX}
        variant="flushed"
        autoresize
      />
      <HStack justify="flex-end">
        <GenericButton tone="gradient" size="sm" onClick={onSubmit} disabled={!canSubmit}>
          {MESSAGES.COMMENTS.SUBMIT}
        </GenericButton>
      </HStack>
    </Stack>
  )
}
