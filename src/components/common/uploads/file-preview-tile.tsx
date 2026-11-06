'use client'

import { AbsoluteCenter, Box, Icon, Image, Text } from '@chakra-ui/react'
import { LuFileText, LuMic, LuRotateCw, LuX } from 'react-icons/lu'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import { UploadStatus } from '@/enums/media/media/upload-status.enum'
import type { FilePreviewTileProps } from '@/interfaces/components/common/uploads/file-preview-tile-props.interface'
import { formatFileSize } from '@/utilities/format/file-size.utility'
import { GenericIconButton } from '../buttons/generic-icon-button'
import { ProgressRing } from '../feedback/progress-ring'

const isType = (file: File, prefix: string) => file.type.startsWith(prefix)

/** One queued file: a thumbnail, its upload progress ring, and remove or retry. */
export function FilePreviewTile({ item, onRemove, onRetry }: FilePreviewTileProps) {
  const { file, previewUrl, status, progress } = item
  return (
    <Box position="relative" boxSize="24" rounded="xl" overflow="hidden" bg="bg.muted" borderWidth="1px" borderColor="app.border">
      {isType(file, 'image/') && <Image src={previewUrl} alt={file.name} objectFit="cover" boxSize="full" />}
      {isType(file, 'video/') && <video src={previewUrl} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      {!isType(file, 'image/') && !isType(file, 'video/') && (
        <AbsoluteCenter>
          <Icon size="xl" color="fg.muted">
            {isType(file, 'audio/') ? <LuMic /> : <LuFileText />}
          </Icon>
        </AbsoluteCenter>
      )}
      {status === UploadStatus.UPLOADING && (
        <AbsoluteCenter bg="blackAlpha.600" rounded="full">
          <ProgressRing value={progress} size="sm" />
        </AbsoluteCenter>
      )}
      {status === UploadStatus.FAILED && (
        <AbsoluteCenter>
          <GenericIconButton label={MEDIA_MESSAGES.RETRY} tone="danger" size="xs" onClick={() => onRetry(item)}>
            <LuRotateCw />
          </GenericIconButton>
        </AbsoluteCenter>
      )}
      <Box position="absolute" top="1" right="1">
        <GenericIconButton label={MEDIA_MESSAGES.REMOVE} tone="secondary" size="2xs" onClick={() => onRemove(item.key)}>
          <LuX />
        </GenericIconButton>
      </Box>
      <Text position="absolute" bottom="0" insetX="0" px="1.5" py="0.5" fontSize="2xs" color="white" bg="blackAlpha.600" truncate>
        {formatFileSize(file.size)}
      </Text>
    </Box>
  )
}
