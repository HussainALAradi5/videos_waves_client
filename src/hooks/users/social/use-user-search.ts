'use client'

import { useState } from 'react'
import { PAGE_SIZES, SEARCH_DEBOUNCE_MS } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { UserSummary } from '@/interfaces/users/profile/user-summary.interface'
import { socialService } from '@/services/users/social/social.service'
import { useDebouncedValue } from '@/hooks/common/use-debounced-value'
import { usePagedList } from '@/hooks/common/use-paged-list'

/** Debounced people search by any part of a username, email, or phone number (an empty box finds no one). */
export const useUserSearch = () => {
  const [search, setSearch] = useState('')
  const debounced = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)
  const results = usePagedList<UserSummary>({
    queryKey: QUERY_KEYS.userSearch(debounced),
    fetchPage: (page, signal) => socialService.search({ search: debounced, page, pageSize: PAGE_SIZES.PEOPLE }, signal),
    isEnabled: debounced !== ''
  })
  return { search, setSearch, results, hasQuery: debounced !== '' }
}
