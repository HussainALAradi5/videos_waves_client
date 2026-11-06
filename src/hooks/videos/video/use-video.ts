'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { videoService } from '@/services/videos/video/video.service'

export const useVideo = (videoId: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.video(videoId),
    queryFn: ({ signal }) => videoService.getById(videoId, signal)
  })
  return { video: query.data, isLoading: query.isPending, error: query.error, refetch: query.refetch }
}
