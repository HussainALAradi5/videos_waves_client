import type { Metadata } from 'next'
import { AdminUsersView } from '@/views/users/admin-users-view'

export const metadata: Metadata = { title: 'Users' }

export default function AdminUsersPage() {
  return <AdminUsersView />
}
