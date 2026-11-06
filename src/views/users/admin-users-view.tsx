'use client'

import { useState } from 'react'
import { ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import { Role } from '@/enums/users/roles/role.enum'
import { useAdminUsers } from '@/hooks/users/admin-users/use-admin-users'
import { useUserTransfer } from '@/hooks/users/admin-users/use-user-transfer'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { QueryState } from '@/components/common/feedback/query-state'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { PaginationControls } from '@/components/common/pagination/pagination-controls'
import { AdminUsersTable } from '@/components/users/admin-users/admin-users-table'
import { AdminUsersToolbar } from '@/components/users/admin-users/admin-users-toolbar'
import { ImportUsersDialog } from '@/components/users/admin-users/import-users-dialog'

function AdminUsersContent() {
  const list = useAdminUsers()
  const transfer = useUserTransfer(list.filters)
  const [isImportOpen, setIsImportOpen] = useState(false)
  return (
    <>
      <PageHeader title={ADMIN_USERS_MESSAGES.TITLE} description={ADMIN_USERS_MESSAGES.DESCRIPTION} />
      <AdminUsersToolbar
        search={list.search}
        role={list.role}
        status={list.status}
        onSearchChange={list.setSearch}
        onRoleChange={list.setRole}
        onStatusChange={list.setStatus}
        onExport={transfer.exportCsv}
        onImport={() => setIsImportOpen(true)}
      />
      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        onRetry={() => void list.refetch()}
        isEmpty={list.users.length === 0}
        empty={<EmptyState title={ADMIN_USERS_MESSAGES.EMPTY} />}
      >
        <AdminUsersTable users={list.users} />
        {list.meta && <PaginationControls meta={list.meta} onPageChange={list.setPage} />}
      </QueryState>
      <ImportUsersDialog isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} transfer={transfer} />
    </>
  )
}

/** Admin only: guests are sent to sign in and other users to the feed. */
export function AdminUsersView() {
  return (
    <RequireAuth role={Role.ADMIN}>
      <AdminUsersContent />
    </RequireAuth>
  )
}
