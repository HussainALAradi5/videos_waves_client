import type { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'

export interface DecideAdminRequestDto {
  status: AdminRequestStatus.ACCEPTED | AdminRequestStatus.REJECTED
  note?: string
}
