'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import type { PagedListOptions } from '@/interfaces/hooks/common/paged-list-options.interface'
import type { PagedListResult } from '@/interfaces/hooks/common/paged-list-result.interface'
import { flattenPages, getNextPageParam } from '@/utilities/pagination/next-page.utility'

const FIRST_PAGE = 1

/** Every page-numbered list in the app (comments, people, search): server paging behind one hook. */
export const usePagedList = <T>({ queryKey, fetchPage, isEnabled = true }: PagedListOptions<T>): PagedListResult<T> => {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal }) => fetchPage(pageParam, signal),
    initialPageParam: FIRST_PAGE,
    getNextPageParam,
    enabled: isEnabled
  })
  return {
    items: flattenPages(query.data?.pages),
    totalItems: query.data?.pages[0]?.meta.totalItems ?? 0,
    isLoading: isEnabled && query.isPending,
    error: query.error,
    refetch: () => void query.refetch(),
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: () => void query.fetchNextPage()
  }
}
