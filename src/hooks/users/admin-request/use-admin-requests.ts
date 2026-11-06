'use client'

import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { AdminRequestQueryDto } from '@/dtos/users/admin-request/admin-request-query.dto'
import type { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import { adminRequestService } from '@/services/users/admin-request/admin-request.service'

const FIRST_PAGE = 1

/** Paged admin requests with a status filter. Admins see all requests; users see their own. */
export const useAdminRequests = (pageSize: number, initialStatus: AdminRequestStatus | '' = '') => {
  const [page, setPage] = useState(FIRST_PAGE)
  const [status, setStatusState] = useState<AdminRequestStatus | ''>(initialStatus)
  const query: AdminRequestQueryDto = { page, pageSize, status: status || undefined }

  const result = useQuery({
    queryKey: QUERY_KEYS.adminRequestPage(query),
    queryFn: ({ signal }) => adminRequestService.list(query, signal),
    placeholderData: keepPreviousData
  })

  const setStatus = (next: AdminRequestStatus | '') => {
    setStatusState(next)
    setPage(FIRST_PAGE)
  }

  return {
    requests: result.data?.items ?? [],
    meta: result.data?.meta,
    isLoading: result.isPending,
    error: result.error,
    refetch: result.refetch,
    status,
    setStatus,
    setPage
  }
}
