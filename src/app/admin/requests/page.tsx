import type { Metadata } from 'next'
import { AdminRequestsView } from '@/views/users/admin-requests-view'

export const metadata: Metadata = { title: 'Admin requests' }

export default function AdminRequestsPage() {
  return <AdminRequestsView />
}
