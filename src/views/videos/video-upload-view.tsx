'use client'

import { HStack, Stack } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { MAX_VIDEO_UPLOAD_MB, BYTES_PER_MEGABYTE } from '@/constants/common/limits.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import { VIDEO_UPLOAD } from '@/constants/videos/video/video-upload.constants'
import { useMultiVideoUpload } from '@/hooks/videos/video/use-multi-video-upload'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { Animated } from '@/components/common/motion/animated'
import { MultiFileDropzone } from '@/components/common/uploads/multi-file-dropzone'
import { UploadDraftCard } from '@/components/videos/upload/upload-draft-card'

export function VideoUploadView() {
  const { queue, draftOf, setDraft, isReady, publishAll } = useMultiVideoUpload()
  return (
    <RequireAuth>
      <Stack gap="6" maxW="3xl" mx="auto">
        <PageHeader title={VIDEO_MESSAGES.UPLOAD_TITLE} description={VIDEO_MESSAGES.UPLOAD_DESCRIPTION} />
        {!queue.isFull && (
          <MultiFileDropzone
            onFiles={queue.addFiles}
            accept={VIDEO_UPLOAD.ACCEPT}
            maxSizeBytes={MAX_VIDEO_UPLOAD_MB * BYTES_PER_MEGABYTE}
            maxFiles={VIDEO_UPLOAD.MAX_FILES - queue.items.length}
            hint={VIDEO_MESSAGES.UPLOAD_HINT(MAX_VIDEO_UPLOAD_MB)}
            isDisabled={queue.isUploading}
          />
        )}
        <Stack gap="4">
          <AnimatePresence initial={false}>
            {queue.items.map((item) => (
              <Animated key={item.key} isLayout>
                <UploadDraftCard item={item} draft={draftOf(item.key, item.file)} onChange={(changes) => setDraft(item.key, item.file, changes)} onRemove={() => queue.remove(item.key)} />
              </Animated>
            ))}
          </AnimatePresence>
        </Stack>
        {queue.items.length > 0 && (
          <HStack justify="flex-end">
            <GenericButton tone="gradient" size="lg" onClick={publishAll} disabled={!isReady}>
              {VIDEO_MESSAGES.PUBLISH_ALL(queue.items.length)}
            </GenericButton>
          </HStack>
        )}
      </Stack>
    </RequireAuth>
  )
}
