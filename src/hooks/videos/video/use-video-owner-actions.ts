'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { VideoFormValues } from '@/validations/videos/video/video-form.validation'
import { videoService } from '@/services/videos/video/video.service'
import { patchVideoInCache } from '@/utilities/cache/video-cache.utility'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Edit and delete for a video's owner (or an admin); the API re-checks ownership. */
export const useVideoOwnerActions = (videoId: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const update = useMutation({
    mutationFn: (values: VideoFormValues) => videoService.update(videoId, values),
    onSuccess: (video) => {
      patchVideoInCache(queryClient, videoId, () => video)
      notifySuccess(MESSAGES.VIDEOS.UPDATED)
      setIsEditOpen(false)
    },
    onError: notifyError
  })

  const remove = useMutation({
    mutationFn: () => videoService.remove(videoId),
    onSuccess: async () => {
      setIsDeleteOpen(false)
      notifySuccess(MESSAGES.VIDEOS.DELETED)
      queryClient.removeQueries({ queryKey: QUERY_KEYS.video(videoId) })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
      router.replace(PAGE_ROUTES.HOME)
    },
    onError: notifyError
  })

  return {
    isEditOpen,
    openEdit: () => setIsEditOpen(true),
    closeEdit: () => setIsEditOpen(false),
    isDeleteOpen,
    openDelete: () => setIsDeleteOpen(true),
    closeDelete: () => setIsDeleteOpen(false),
    update,
    remove
  }
}
