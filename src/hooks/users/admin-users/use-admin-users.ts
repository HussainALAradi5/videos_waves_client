'use client'

import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { PAGE_SIZES, SEARCH_DEBOUNCE_MS } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { AdminUsersQueryDto } from '@/dtos/users/admin-users/admin-users-query.dto'
import type { AccountStatus } from '@/enums/users/user/account-status.enum'
import type { Role } from '@/enums/users/roles/role.enum'
import { useDebouncedValue } from '@/hooks/common/use-debounced-value'
import { adminUsersService } from '@/services/users/admin-users/admin-users.service'

const FIRST_PAGE = 1

/** The admin users table: server paging plus debounced search and role and status filters. */
export const useAdminUsers = () => {
  const [page, setPage] = useState(FIRST_PAGE)
  const [search, setSearchState] = useState('')
  const [role, setRoleState] = useState('')
  const [status, setStatusState] = useState('')
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)
  const filters = {
    search: debouncedSearch || undefined,
    role: (role || undefined) as Role | undefined,
    status: (status || undefined) as AccountStatus | undefined
  }
  const query: AdminUsersQueryDto = { page, pageSize: PAGE_SIZES.ADMIN_USERS, ...filters }
  const result = useQuery({
    queryKey: QUERY_KEYS.adminUsers(query),
    queryFn: ({ signal }) => adminUsersService.list(query, signal),
    placeholderData: keepPreviousData
  })
  // Any filter change starts again from the first page.
  const resetting = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    setPage(FIRST_PAGE)
  }
  return {
    users: result.data?.items ?? [],
    meta: result.data?.meta,
    isLoading: result.isPending,
    error: result.error,
    refetch: result.refetch,
    filters,
    search,
    role,
    status,
    setSearch: resetting(setSearchState),
    setRole: resetting(setRoleState),
    setStatus: resetting(setStatusState),
    setPage
  }
}
