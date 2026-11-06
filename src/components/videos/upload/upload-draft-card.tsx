'use client'

import { AspectRatio, Box, Field, Flex, Input, Stack, Text, Textarea } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import { UploadStatus } from '@/enums/media/media/upload-status.enum'
import type { UploadDraftCardProps } from '@/interfaces/components/videos/upload/upload-draft-card-props.interface'
import { formatFileSize } from '@/utilities/format/file-size.utility'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { GenericProgressBar } from '@/components/common/feedback/generic-progress-bar'

/** One video in the upload queue: preview, title and description, and its own progress. */
export function UploadDraftCard({ item, draft, onChange, onRemove }: UploadDraftCardProps) {
  const isLocked = item.status === UploadStatus.UPLOADING || item.status === UploadStatus.DONE
  return (
    <Flex gap="4" p="4" rounded="2xl" bg="app.surface" borderWidth="1px" borderColor="app.border" direction={{ base: 'column', sm: 'row' }}>
      <Box width={{ base: 'full', sm: '48' }} flexShrink={0}>
        <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO}>
          <Box rounded="xl" overflow="hidden" bg="black">
            <video src={item.previewUrl} muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </AspectRatio>
        <Text fontSize="xs" color="fg.muted" mt="1" truncate>
          {item.file.name} · {formatFileSize(item.file.size)}
        </Text>
      </Box>
      <Stack gap="3" flex="1">
        <Field.Root required>
          <Field.Label>{VIDEO_MESSAGES.TITLE_LABEL}</Field.Label>
          <Input value={draft.title} onChange={(event) => onChange({ title: event.target.value })} maxLength={TEXT_LIMITS.VIDEO_TITLE_MAX} disabled={isLocked} rounded="xl" />
        </Field.Root>
        <Field.Root>
          <Field.Label>{VIDEO_MESSAGES.DESCRIPTION_LABEL}</Field.Label>
          <Textarea value={draft.description} onChange={(event) => onChange({ description: event.target.value })} maxLength={TEXT_LIMITS.VIDEO_DESCRIPTION_MAX} disabled={isLocked} autoresize rounded="xl" />
        </Field.Root>
        {item.status !== UploadStatus.QUEUED && (
          <GenericProgressBar value={item.progress} showValue label={item.status === UploadStatus.FAILED ? (item.error ?? MEDIA_MESSAGES.FAILED) : MEDIA_MESSAGES.UPLOADING} />
        )}
      </Stack>
      <GenericIconButton label={MEDIA_MESSAGES.REMOVE} size="sm" onClick={onRemove} disabled={item.status === UploadStatus.UPLOADING}>
        <LuX />
      </GenericIconButton>
    </Flex>
  )
}
