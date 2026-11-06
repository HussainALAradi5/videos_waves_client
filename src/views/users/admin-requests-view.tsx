'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { ADMIN_REQUEST_STATUS_OPTIONS } from '@/constants/users/admin-request/admin-request-status.constants'
import { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import { Role } from '@/enums/users/roles/role.enum'
import { useAdminRequests } from '@/hooks/users/admin-request/use-admin-requests'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'
import { QueryState } from '@/components/common/feedback/query-state'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { PaginationControls } from '@/components/common/pagination/pagination-controls'
import { AdminRequestTable } from '@/components/users/admin-request/admin-request-table'

const ALL_STATUSES = ''

const STATUS_FILTER_OPTIONS = [
  { value: ALL_STATUSES, label: MESSAGES.ADMIN_REQUESTS.ALL_STATUSES },
  ...Object.values(AdminRequestStatus).map((status) => ({
    value: status,
    label: ADMIN_REQUEST_STATUS_OPTIONS[status].label,
    colorPalette: ADMIN_REQUEST_STATUS_OPTIONS[status].colorPalette
  }))
]

function AdminRequestsContent() {
  const { requests, meta, isLoading, error, refetch, status, setStatus, setPage } = useAdminRequests(
    PAGE_SIZES.ADMIN_REQUESTS,
    AdminRequestStatus.PENDING
  )

  return (
    <>
      <PageHeader
        title={MESSAGES.ADMIN_REQUESTS.TITLE}
        description={MESSAGES.ADMIN_REQUESTS.DESCRIPTION}
        actions={
          <SelectDropdown
            options={STATUS_FILTER_OPTIONS}
            value={status}
            onChange={(value) => setStatus(value as AdminRequestStatus | '')}
            width="52"
          />
        }
      />
      <QueryState
        isLoading={isLoading}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={requests.length === 0}
        empty={<EmptyState title={MESSAGES.ADMIN_REQUESTS.EMPTY} />}
      >
        <AdminRequestTable requests={requests} />
        {meta && <PaginationControls meta={meta} onPageChange={setPage} />}
      </QueryState>
    </>
  )
}

export function AdminRequestsView() {
  return (
    <RequireAuth role={Role.ADMIN}>
      <AdminRequestsContent />
    </RequireAuth>
  )
}
