'use client'

import { useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { videoService } from '@/services/videos/video/video.service'
import { patchVideoInCache } from '@/utilities/cache/video-cache.utility'

/** Counts one view per page visit, on the first play. */
export const useRecordView = (videoId: string) => {
  const queryClient = useQueryClient()
  const hasRecorded = useRef(false)

  return useCallback(() => {
    if (hasRecorded.current) return
    hasRecorded.current = true
    videoService
      .recordView(videoId)
      .then(() => patchVideoInCache(queryClient, videoId, (video) => ({ viewsCount: video.viewsCount + 1 })))
      .catch(() => {
        hasRecorded.current = false
      })
  }, [queryClient, videoId])
}
