'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PAGE_SIZES, SEARCH_DEBOUNCE_MS } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'
import { socialService } from '@/services/users/social/social.service'
import { useDebouncedValue } from '@/hooks/common/use-debounced-value'

/** People found by username, email, or phone for the multi-select picker (yourself excluded), plus the current choice. */
export const usePeoplePicker = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<DropdownOption[]>([])
  const debounced = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)
  const query = useQuery({
    queryKey: QUERY_KEYS.userSearch(`picker:${debounced}`),
    queryFn: ({ signal }) => socialService.search({ search: debounced, page: 1, pageSize: PAGE_SIZES.PEOPLE }, signal),
    enabled: debounced !== ''
  })
  const people = (query.data?.items ?? []).filter((person) => !person.isMe)
  return { people, selected, setSelected, setSearch, isLoading: query.isFetching, reset: () => setSelected([]) }
}
