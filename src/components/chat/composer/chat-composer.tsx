'use client'

import { Box, HStack, Stack, Textarea } from '@chakra-ui/react'
import { LuSend } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_ATTACHMENT_ACCEPT, CHAT_LIMITS } from '@/constants/chat/chat.constants'
import { BYTES_PER_MEGABYTE } from '@/constants/common/limits.constants'
import type { ChatComposerProps } from '@/interfaces/components/chat/composer/chat-composer-props.interface'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { FilePreviewGrid } from '@/components/common/uploads/file-preview-grid'
import { MultiFileDropzone } from '@/components/common/uploads/multi-file-dropzone'
import { ComposerReplyBar } from './composer-reply-bar'
import { SharedVideoChip } from './shared-video-chip'
import { VoiceRecordButton } from './voice-record-button'

/** Text (Enter sends, Shift+Enter breaks the line), several attachments, voice notes, and replies. */
export function ChatComposer({ sharedVideoId, composer }: ChatComposerProps) {
  const { attachments } = composer
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void composer.send()
    }
  }
  return (
    <Stack gap="2" px={{ base: '3', md: '5' }} py="3" borderTopWidth="1px" borderColor="app.border">
      {composer.replyTo && <ComposerReplyBar message={composer.replyTo} onCancel={() => composer.setReplyTo(null)} />}
      {sharedVideoId && <SharedVideoChip />}
      {attachments.items.length > 0 && <FilePreviewGrid items={attachments.items} onRemove={attachments.remove} onRetry={attachments.retry} />}
      <HStack gap="1" align="flex-end" p="1.5" rounded="3xl" bg="app.surface" borderWidth="1px" borderColor="app.border">
        <MultiFileDropzone
          onFiles={attachments.addFiles}
          accept={CHAT_ATTACHMENT_ACCEPT}
          maxSizeBytes={CHAT_LIMITS.ATTACHMENT_MAX_MB * BYTES_PER_MEGABYTE}
          maxFiles={CHAT_LIMITS.MAX_ATTACHMENTS - attachments.items.length}
          isDisabled={attachments.isFull}
          isCompact
        />
        <Box flex="1">
          <Textarea
            value={composer.text}
            onChange={(event) => composer.changeText(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={CHAT_MESSAGES.TYPE}
            aria-label={CHAT_MESSAGES.TYPE}
            maxLength={CHAT_LIMITS.BODY_MAX}
            variant="flushed"
            border="none"
            autoresize
            maxH="40"
            rows={1}
            px="2"
          />
        </Box>
        {composer.canSend ? (
          <GenericIconButton label={CHAT_MESSAGES.SEND} tone="gradient" onClick={composer.send} isLoading={attachments.isUploading}>
            <LuSend />
          </GenericIconButton>
        ) : (
          <VoiceRecordButton onRecorded={composer.sendVoiceNote} />
        )}
      </HStack>
    </Stack>
  )
}
