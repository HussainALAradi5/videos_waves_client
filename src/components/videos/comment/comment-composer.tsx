'use client'

import { Button, HStack, Stack, Textarea } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { useCommentComposer } from '@/hooks/videos/comment/use-comment-composer'
import type { CommentSectionProps } from '@/interfaces/components/videos/comment/comment-section-props.interface'

export function CommentComposer({ videoId }: CommentSectionProps) {
  const { content, setContent, submit, canSubmit, isPosting } = useCommentComposer(videoId)

  return (
    <Stack gap="2">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={MESSAGES.COMMENTS.PLACEHOLDER}
        aria-label={MESSAGES.COMMENTS.PLACEHOLDER}
        maxLength={TEXT_LIMITS.COMMENT_MAX}
        autoresize
      />
      <HStack justify="flex-end">
        <Button colorPalette={PALETTES.BRAND} onClick={submit} disabled={!canSubmit} loading={isPosting}>
          {MESSAGES.COMMENTS.SUBMIT}
        </Button>
      </HStack>
    </Stack>
  )
}
