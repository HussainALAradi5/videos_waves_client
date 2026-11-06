import type { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface AdminRequest {
  id: string
  code: string
  reason: string
  status: AdminRequestStatus
  requester: PublicUser
  decidedBy: string | null
  decidedAt: string | null
  decisionNote: string | null
  createdAt: string
}
