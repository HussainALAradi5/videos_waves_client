'use client'

import { useMemo, useState } from 'react'
import { PAGE_SIZES, SEARCH_DEBOUNCE_MS } from '@/constants/common/limits.constants'
import { SortDirection } from '@/enums/common/sort-direction.enum'
import { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'
import { useDebouncedValue } from '@/hooks/common/use-debounced-value'

/** Search and sort state for the feed; search is debounced so typing does not flood the API. */
export const useFeedFilters = () => {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<VideoSortField>(VideoSortField.CREATED_AT)
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)

  const query = useMemo(
    () => ({
      pageSize: PAGE_SIZES.FEED,
      sortBy,
      sortDirection: sortBy === VideoSortField.TITLE ? SortDirection.ASC : SortDirection.DESC,
      search: debouncedSearch || undefined
    }),
    [sortBy, debouncedSearch]
  )

  return { search, setSearch, sortBy, setSortBy, query }
}
