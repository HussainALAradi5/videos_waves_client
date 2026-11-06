'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'
import { videoService } from '@/services/videos/video/video.service'
import { flattenPages, getNextPageParam } from '@/utilities/pagination/next-page.utility'

const FIRST_PAGE = 1

/** Infinite, server-paged video list; filters and sorting are applied by the API. */
export const useVideoFeed = (query: Omit<VideoQueryDto, 'page'>) => {
  const feed = useInfiniteQuery({
    queryKey: QUERY_KEYS.videoFeed(query),
    queryFn: ({ pageParam, signal }) => videoService.list({ ...query, page: pageParam }, signal),
    initialPageParam: FIRST_PAGE,
    getNextPageParam
  })

  return {
    videos: flattenPages(feed.data?.pages),
    isLoading: feed.isPending,
    error: feed.error,
    refetch: feed.refetch,
    hasNextPage: feed.hasNextPage,
    isFetchingNextPage: feed.isFetchingNextPage,
    fetchNextPage: () => void feed.fetchNextPage()
  }
}
