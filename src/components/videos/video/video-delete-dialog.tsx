'use client'

import { AspectRatio, Box, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { VideoDeleteDialogProps } from '@/interfaces/components/videos/video/video-delete-dialog-props.interface'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

/** Shows which video is about to go, so nobody deletes the wrong one. */
export function VideoDeleteDialog({ video, isOpen, onClose, onConfirm }: VideoDeleteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={MESSAGES.VIDEOS.DELETE_TITLE}
      description={MESSAGES.VIDEOS.DELETE_DESCRIPTION}
      confirmLabel={MESSAGES.COMMON.DELETE}
    >
      <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO} mb="3">
        <Box rounded="xl" overflow="hidden" bg="black">
          <video src={video.videoUrl} poster={video.thumbnailUrl ?? undefined} muted preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </AspectRatio>
      <Text fontWeight="semibold" mb="1">
        {video.title}
      </Text>
    </ConfirmDialog>
  )
}
