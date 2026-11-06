'use client'

import { Card } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { VideoUploadForm } from '@/components/videos/video/video-upload-form'

export function VideoUploadView() {
  return (
    <RequireAuth>
      <PageHeader title={MESSAGES.VIDEOS.UPLOAD_TITLE} description={MESSAGES.VIDEOS.UPLOAD_DESCRIPTION} />
      <Card.Root maxW="2xl">
        <Card.Body>
          <VideoUploadForm />
        </Card.Body>
      </Card.Root>
    </RequireAuth>
  )
}
