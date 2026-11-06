'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { Video } from '@/interfaces/videos/video/video.interface'
import { videoService } from '@/services/videos/video/video.service'
import { patchVideoInCache } from '@/utilities/cache/video-cache.utility'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { notifyError } from '@/utilities/toast/notify.utility'
import { useAuth } from '../../users/auth/use-auth'

/** Optimistic like toggle: the UI updates at once and rolls back if the API rejects it. */
export const useVideoLike = (video: Pick<Video, 'id' | 'isLiked' | 'likesCount'>, returnTo: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const mutation = useMutation({
    mutationFn: (shouldLike: boolean) => (shouldLike ? videoService.like(video.id) : videoService.unlike(video.id)),
    onMutate: (shouldLike) => {
      const previous = { isLiked: video.isLiked, likesCount: video.likesCount }
      patchVideoInCache(queryClient, video.id, (current) => ({
        isLiked: shouldLike,
        likesCount: Math.max(0, current.likesCount + (shouldLike ? 1 : -1))
      }))
      return previous
    },
    onSuccess: (state) => patchVideoInCache(queryClient, video.id, () => state),
    onError: (error, _shouldLike, previous) => {
      if (previous) patchVideoInCache(queryClient, video.id, () => previous)
      notifyError(error)
    }
  })

  const toggleLike = () => {
    if (!isAuthenticated) {
      router.push(buildLoginPath(returnTo))
      return
    }
    mutation.mutate(!video.isLiked)
  }

  return { toggleLike, isPending: mutation.isPending }
}
