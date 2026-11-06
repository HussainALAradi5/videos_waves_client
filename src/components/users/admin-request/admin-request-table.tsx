import { HStack, Text } from '@chakra-ui/react'
import { ADMIN_REQUEST_STATUS_OPTIONS } from '@/constants/users/admin-request/admin-request-status.constants'
import { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import type { AdminRequest } from '@/interfaces/users/admin-request/admin-request.interface'
import type { TableColumn } from '@/interfaces/common/tables/table-column.interface'
import type { AdminRequestTableProps } from '@/interfaces/components/users/admin-request/admin-request-table-props.interface'
import { formatDate } from '@/utilities/format/date-format.utility'
import { DataTable } from '@/components/common/tables/data-table'
import { StatusBadge } from '@/components/common/badges/status-badge'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { AdminRequestDecision } from './admin-request-decision'

const COLUMNS: TableColumn<AdminRequest>[] = [
  {
    key: 'requester',
    header: 'Requester',
    render: (request) => (
      <HStack gap="2">
        <UserAvatar user={request.requester} size="xs" />
        <Text>{request.requester.userName}</Text>
      </HStack>
    )
  },
  { key: 'reason', header: 'Reason', hideBelow: 'md', render: (request) => <Text lineClamp={2}>{request.reason}</Text> },
  { key: 'created', header: 'Sent', hideBelow: 'sm', render: (request) => formatDate(request.createdAt) },
  {
    key: 'status',
    header: 'Status',
    render: (request) => <StatusBadge value={request.status} options={ADMIN_REQUEST_STATUS_OPTIONS} />
  },
  {
    key: 'actions',
    header: '',
    align: 'end',
    render: (request) => (request.status === AdminRequestStatus.PENDING ? <AdminRequestDecision request={request} /> : null)
  }
]

const getRequestKey = (request: AdminRequest) => request.id

export function AdminRequestTable({ requests }: AdminRequestTableProps) {
  return <DataTable columns={COLUMNS} rows={requests} getKey={getRequestKey} />
}
