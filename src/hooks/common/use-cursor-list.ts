'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import type { CursorListOptions } from '@/interfaces/hooks/common/cursor-list-options.interface'
import type { CursorPage } from '@/interfaces/common/pagination/cursor-page.interface'

/** "Load older" lists (chat threads): newest page first, each page asks for items before the last one seen. */
export const useCursorList = <T>({ queryKey, fetchPage, isEnabled = true }: CursorListOptions<T>) => {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal }) => fetchPage(pageParam, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last: CursorPage<T>) => last.meta.nextCursor ?? undefined,
    enabled: isEnabled
  })
  return {
    /** Newest first, as the server returns them. */
    items: query.data?.pages.flatMap((page) => page.items) ?? [],
    isLoading: isEnabled && query.isPending,
    error: query.error,
    hasOlder: query.hasNextPage,
    isFetchingOlder: query.isFetchingNextPage,
    fetchOlder: () => void query.fetchNextPage(),
    refetch: () => void query.refetch()
  }
}
