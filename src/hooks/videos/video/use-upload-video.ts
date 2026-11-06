'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { VideoFormValues } from '@/validations/videos/video/video-form.validation'
import { videoService } from '@/services/videos/video/video.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

export const useUploadVideo = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | undefined>()
  const [progress, setProgress] = useState(0)

  const mutation = useMutation({
    mutationFn: ({ selected, values }: { selected: File; values: VideoFormValues }) =>
      videoService.upload(selected, values, setProgress),
    onSuccess: async (video) => {
      notifySuccess(MESSAGES.VIDEOS.UPLOAD_SUCCESS)
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
      router.push(PAGE_ROUTES.video(video.id))
    },
    onError: (error) => {
      setProgress(0)
      notifyError(error)
    }
  })

  const selectFile = (selected: File | null) => {
    setFile(selected)
    setFileError(undefined)
  }

  const upload = async (values: VideoFormValues) => {
    if (!file) {
      setFileError(MESSAGES.VIDEOS.FILE_REQUIRED)
      return
    }
    await mutation.mutateAsync({ selected: file, values })
  }

  return { file, selectFile, fileError, progress, upload, isUploading: mutation.isPending }
}
