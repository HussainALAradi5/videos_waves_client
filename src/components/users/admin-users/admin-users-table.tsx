import NextLink from 'next/link'
import { HStack, Link, Stack, Text } from '@chakra-ui/react'
import { ACCOUNT_STATUS_OPTIONS, ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { ROLE_OPTIONS } from '@/constants/users/roles/role.constants'
import { AccountStatus } from '@/enums/users/user/account-status.enum'
import type { TableColumn } from '@/interfaces/common/tables/table-column.interface'
import type { AdminUsersTableProps } from '@/interfaces/components/users/admin-users/admin-users-table-props.interface'
import type { User } from '@/interfaces/users/user/user.interface'
import { formatCount } from '@/utilities/format/count-format.utility'
import { formatDate } from '@/utilities/format/date-format.utility'
import { DataTable } from '@/components/common/tables/data-table'
import { StatusBadge } from '@/components/common/badges/status-badge'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { AccountStatusButton } from './account-status-button'

const statusOf = (user: User) => (user.isActive ? AccountStatus.ACTIVE : AccountStatus.INACTIVE)

const COLUMNS: TableColumn<User>[] = [
  {
    key: 'user',
    header: ADMIN_USERS_MESSAGES.COLUMN_USER,
    render: (user) => (
      <HStack gap="2" opacity={user.isActive ? 1 : 0.6}>
        <UserAvatar user={user} size="xs" />
        <Stack gap="0">
          <Link asChild fontWeight="medium">
            <NextLink href={PAGE_ROUTES.profile(user.userName)}>{user.userName}</NextLink>
          </Link>
          <Text fontSize="xs" color="fg.muted" hideFrom="md">{user.email}</Text>
        </Stack>
      </HStack>
    )
  },
  { key: 'email', header: ADMIN_USERS_MESSAGES.COLUMN_EMAIL, hideBelow: 'md', render: (user) => user.email },
  { key: 'role', header: ADMIN_USERS_MESSAGES.COLUMN_ROLE, render: (user) => <StatusBadge value={user.role} options={ROLE_OPTIONS} /> },
  {
    key: 'status',
    header: ADMIN_USERS_MESSAGES.COLUMN_STATUS,
    render: (user) => <StatusBadge value={statusOf(user)} options={ACCOUNT_STATUS_OPTIONS} />
  },
  { key: 'videos', header: ADMIN_USERS_MESSAGES.COLUMN_VIDEOS, hideBelow: 'lg', align: 'end', render: (user) => formatCount(user.videosCount) },
  { key: 'joined', header: ADMIN_USERS_MESSAGES.COLUMN_JOINED, hideBelow: 'lg', render: (user) => formatDate(user.createdAt) },
  {
    key: 'actions',
    header: '',
    align: 'end',
    render: (user) => <AccountStatusButton userName={user.userName} role={user.role} isActive={user.isActive} />
  }
]

const getUserKey = (user: User) => user.id

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  return <DataTable columns={COLUMNS} rows={users} getKey={getUserKey} />
}
