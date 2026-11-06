'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { commentService } from '@/services/videos/comment/comment.service'
import { flattenPages, getNextPageParam } from '@/utilities/pagination/next-page.utility'

const FIRST_PAGE = 1

export const useComments = (videoId: string) => {
  const query = useInfiniteQuery({
    queryKey: QUERY_KEYS.comments(videoId),
    queryFn: ({ pageParam, signal }) =>
      commentService.list(videoId, { page: pageParam, pageSize: PAGE_SIZES.COMMENTS }, signal),
    initialPageParam: FIRST_PAGE,
    getNextPageParam
  })

  return {
    comments: flattenPages(query.data?.pages),
    totalItems: query.data?.pages[0]?.meta.totalItems ?? 0,
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: () => void query.fetchNextPage()
  }
}
